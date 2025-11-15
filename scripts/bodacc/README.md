# BODACC lead pipeline (GitHub Actions)

This job fetches recent company creations from a BODACC RSS/Atom feed, enriches with Pappers (and optionally Hunter), then posts leads to a Zoho Flow webhook (or any HTTP endpoint).

## Files

- `scripts/bodacc/bodacc.py` — main pipeline
- `scripts/bodacc/requirements.txt` — Python deps
- `.github/workflows/bodacc.yml` — scheduled workflow

## Required secrets (Repository → Settings → Secrets and variables → Actions → Secrets)

- `BODACC_FEED_URL` — URL of the BODACC feed for new company creations (RSS/Atom)
- `ZOHO_FLOW_WEBHOOK` — HTTPS endpoint to receive leads (Zoho Flow or custom)

## Optional secrets

- `PAPPERS_API_KEY` — token for https://api.pappers.fr (enrichment by SIREN/denomination)
- `HUNTER_API_KEY` — token for https://api.hunter.io (domain/contacts discovery)

## Optional variables (Repository → Settings → Secrets and variables → Actions → Variables)

- `BODACC_MAX_ITEMS` — limit items processed per run (default 50)
- `BODACC_CITY_ALLOW` — comma-separated list of cities to keep (case-insensitive)
- `BODACC_NAF_PREFIX_ALLOW` — comma-separated list of NAF code prefixes to keep (e.g. `620,731`)

## Payload example (POSTed to webhook)

```json
{
  "source": "bodacc",
  "company_name": "ACME SARL",
  "denomination": "ACME SARL",
  "siren": "123456789",
  "siret": "12345678900012",
  "code_naf": "6201Z",
  "libelle_code_naf": "Programmation informatique",
  "ville": "Paris",
  "adresse": "12 Rue Exemple",
  "site": "https://acme.fr",
  "emails": [{ "value": "contact@acme.fr" }],
  "email_pattern": "first.last",
  "link": "https://bodacc.example/item/abc",
  "published_at": "2025-11-14T08:00:00Z",
  "ts": "2025-11-14T09:00:00Z"
}
```

## Notes

- The script is idempotent per run and uses simple in-memory de-duplication. Your CRM/Flow should deduplicate by SIREN/email.
- If `PAPPERS_API_KEY` is not set, enrichment is skipped.
- If `HUNTER_API_KEY` is not set or no domain is known, contact discovery is skipped.
- Set cron in `.github/workflows/bodacc.yml` to match your timezone/schedule.