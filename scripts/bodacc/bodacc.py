#!/usr/bin/env python3
import os
import re
import sys
import json
import time
import html
import logging
from typing import Any, Dict, List, Optional
from datetime import datetime, timezone
from urllib.parse import quote_plus

import requests
import feedparser
from dateutil import parser as dateparser

logging.basicConfig(level=logging.INFO, format="%(message)s")
log = logging.getLogger("bodacc")

BODACC_FEED_URL = os.getenv("BODACC_FEED_URL", "").strip()
ZOHO_FLOW_WEBHOOK = os.getenv("ZOHO_FLOW_WEBHOOK", "").strip()
PAPPERS_API_KEY = os.getenv("PAPPERS_API_KEY", "").strip()
HUNTER_API_KEY = os.getenv("HUNTER_API_KEY", "").strip()
MAX_ITEMS = int(os.getenv("BODACC_MAX_ITEMS", "50"))
TIMEOUT = float(os.getenv("BODACC_TIMEOUT", "15"))
USER_AGENT = os.getenv("BODACC_UA", "SLW-BODACC/1.0 (+https://smarterlogicweb.com)")

# Optional simple filters (comma-separated)
CITY_ALLOWLIST = [c.strip().lower() for c in os.getenv("BODACC_CITY_ALLOW", "").split(",") if c.strip()]
NAF_PREFIX_ALLOW = [n.strip() for n in os.getenv("BODACC_NAF_PREFIX_ALLOW", "").split(",") if n.strip()]

def http_get_json(url: str, params: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None) -> Optional[Dict[str, Any]]:
    h = {"User-Agent": USER_AGENT}
    if headers:
        h.update(headers)
    try:
        r = requests.get(url, params=params, headers=h, timeout=TIMEOUT)
        if r.status_code != 200:
            return None
        return r.json()
    except Exception:
        return None

def http_post_json(url: str, payload: Dict[str, Any], headers: Optional[Dict[str, str]] = None) -> bool:
    h = {"User-Agent": USER_AGENT, "content-type": "application/json"}
    if headers:
        h.update(headers)
    try:
        r = requests.post(url, data=json.dumps(payload), headers=h, timeout=TIMEOUT)
        return 200 <= r.status_code < 300
    except Exception:
        return False

def parse_siren(text: str) -> Optional[str]:
    m = re.search(r"\b(\d{9})\b", text)
    return m.group(1) if m else None

def parse_published(entry: Dict[str, Any]) -> datetime:
    # Try published_parsed, fall back to updated or now
    if "published_parsed" in entry and entry["published_parsed"]:
        return datetime.fromtimestamp(time.mktime(entry["published_parsed"]), tz=timezone.utc)
    if "updated_parsed" in entry and entry["updated_parsed"]:
        return datetime.fromtimestamp(time.mktime(entry["updated_parsed"]), tz=timezone.utc)
    if "published" in entry and entry["published"]:
        try:
            return dateparser.parse(entry["published"]).astimezone(timezone.utc)
        except Exception:
            pass
    return datetime.now(tz=timezone.utc)

def normalize_text(s: str) -> str:
    return html.unescape(s).strip()

def pappers_fetch(siren: Optional[str], company_name: Optional[str]) -> Dict[str, Any]:
    out: Dict[str, Any] = {}
    if not PAPPERS_API_KEY:
        return out

    base = "https://api.pappers.fr"
    # Prefer direct siren lookup
    if siren:
        data = http_get_json(f"{base}/api/v2/entreprise", {"siren": siren, "api_token": PAPPERS_API_KEY})
        if data and isinstance(data, dict) and data.get("siren"):
            out["siren"] = data.get("siren")
            out["siret"] = (data.get("siege") or {}).get("siret")
            out["denomination"] = data.get("denomination")
            out["code_naf"] = (data.get("siege") or {}).get("code_naf")
            out["libelle_code_naf"] = (data.get("siege") or {}).get("libelle_code_naf")
            out["ville"] = (data.get("siege") or {}).get("ville")
            out["adresse"] = (data.get("siege") or {}).get("adresse_ligne_1")
            out["site"] = data.get("site_internet")
            return out

    # Fallback: search by name
    q = (company_name or "").strip()
    if q:
        data = http_get_json(f"{base}/api/v2/recherche", {"q": q, "api_token": PAPPERS_API_KEY})
        if data and isinstance(data, dict):
            results = data.get("resultats", [])
            if results:
                r0 = results[0]
                out["siren"] = r0.get("siren")
                siege = r0.get("siege") or {}
                out["siret"] = siege.get("siret")
                out["denomination"] = r0.get("nom_entreprise") or r0.get("denomination")
                out["code_naf"] = siege.get("code_naf")
                out["libelle_code_naf"] = siege.get("libelle_code_naf")
                out["ville"] = siege.get("ville")
                out["adresse"] = siege.get("adresse_ligne_1")
                out["site"] = r0.get("site_internet")
    return out

def hunter_domain_search(domain: str) -> Dict[str, Any]:
    out: Dict[str, Any] = {}
    if not HUNTER_API_KEY or not domain:
        return out
    data = http_get_json("https://api.hunter.io/v2/domain-search", {"domain": domain, "api_key": HUNTER_API_KEY})
    if data and isinstance(data, dict) and data.get("data"):
        d = data["data"]
        out["emails"] = d.get("emails", [])[:3]
        out["pattern"] = d.get("pattern")
        out["webmail"] = d.get("webmail")
        out["organization"] = d.get("organization")
    return out

def passes_filters(info: Dict[str, Any]) -> bool:
    # City allowlist
    if CITY_ALLOWLIST:
        city = (info.get("ville") or "").lower()
        if city and city not in CITY_ALLOWLIST:
            return False
    # NAF prefix allowlist
    if NAF_PREFIX_ALLOW:
        code = (info.get("code_naf") or "").replace(".", "")
        if not any(code.startswith(p) for p in NAF_PREFIX_ALLOW):
            return False
    return True

def process_feed() -> List[Dict[str, Any]]:
    if not BODACC_FEED_URL:
        log.error("BODACC_FEED_URL is not set")
        return []
    log.info(f"Fetching feed: {BODACC_FEED_URL}")
    d = feedparser.parse(BODACC_FEED_URL)
    entries = d.entries[:MAX_ITEMS]
    items: List[Dict[str, Any]] = []
    seen_keys: set[str] = set()

    for e in entries:
        title = normalize_text(getattr(e, "title", ""))
        summary = normalize_text(getattr(e, "summary", getattr(e, "description", "")))
        link = getattr(e, "link", "")
        published_at = parse_published(e).isoformat()

        name = title
        siren = parse_siren(title + " " + summary)

        info = {
            "source": "bodacc",
            "company_name": name,
            "siren": siren,
            "summary": summary,
            "link": link,
            "published_at": published_at,
        }

        # Enrich with Pappers
        pappers = pappers_fetch(siren, name)
        info.update({
            "siren": info.get("siren") or pappers.get("siren"),
            "siret": pappers.get("siret"),
            "denomination": pappers.get("denomination"),
            "code_naf": pappers.get("code_naf"),
            "libelle_code_naf": pappers.get("libelle_code_naf"),
            "ville": pappers.get("ville"),
            "adresse": pappers.get("adresse"),
            "site": pappers.get("site"),
        })

        # Optional Hunter enrichment
        domain = None
        site = (info.get("site") or "").strip()
        if site:
            # crude domain parse
            m = re.search(r"https?://([^/]+)/?", site)
            if m:
                domain = m.group(1)
        hunter = hunter_domain_search(domain) if domain else {}
        if hunter:
            info["emails"] = hunter.get("emails")
            info["email_pattern"] = hunter.get("pattern")

        # Filters
        if not passes_filters(info):
            continue

        # Dedup key
        key = (info.get("siren") or "") + "|" + (domain or "") + "|" + (info.get("company_name") or "")
        if key in seen_keys:
            continue
        seen_keys.add(key)

        items.append(info)

    return items

def push_to_zoho(items: List[Dict[str, Any]]) -> int:
    if not ZOHO_FLOW_WEBHOOK:
        log.error("ZOHO_FLOW_WEBHOOK is not set")
        return 0
    pushed = 0
    for it in items:
        payload = {
            "source": "bodacc",
            "company_name": it.get("company_name"),
            "denomination": it.get("denomination"),
            "siren": it.get("siren"),
            "siret": it.get("siret"),
            "code_naf": it.get("code_naf"),
            "libelle_code_naf": it.get("libelle_code_naf"),
            "ville": it.get("ville"),
            "adresse": it.get("adresse"),
            "site": it.get("site"),
            "emails": it.get("emails"),
            "email_pattern": it.get("email_pattern"),
            "link": it.get("link"),
            "published_at": it.get("published_at"),
            "ts": datetime.now(timezone.utc).isoformat(),
        }
        ok = http_post_json(ZOHO_FLOW_WEBHOOK, payload)
        if ok:
            pushed += 1
        time.sleep(0.2)  # be gentle
    return pushed

def main():
    items = process_feed()
    log.info(f"Candidates: {len(items)}")
    if not items:
        return 0
    pushed = push_to_zoho(items)
    log.info(f"Pushed: {pushed}")
    return 0

if __name__ == "__main__":
    sys.exit(main())