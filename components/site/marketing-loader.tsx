"use client";

import * as React from "react";

/**
 * Loads marketing scripts ONLY when user consented to "marketing".
 * Prefers Google Tag Manager (GTM) if NEXT_PUBLIC_GTM_ID is set,
 * otherwise loads individual pixels (Meta, LinkedIn, Hotjar).
 *
 * Env vars (set on Netlify):
 * - NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX (optional; centralizes tags in GTM)
 * - NEXT_PUBLIC_META_PIXEL_ID=xxxxxxxxxxxxxxx (optional if not using GTM)
 * - NEXT_PUBLIC_LINKEDIN_PARTNER_ID=XXXXXX (optional if not using GTM)
 * - NEXT_PUBLIC_HOTJAR_ID=XXXXX (optional if not using GTM)
 * - NEXT_PUBLIC_HOTJAR_SV=6
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || "";
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || "";
const HOTJAR_SV = process.env.NEXT_PUBLIC_HOTJAR_SV || "6";

type ConsentPrefs = { analytics?: boolean; marketing?: boolean };

function readConsent(): ConsentPrefs | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )cookie_consent=([^;]+)/);
  if (!m) return null;
  try {
    return JSON.parse(decodeURIComponent(m[1]));
  } catch {
    return null;
  }
}

function loadGTM() {
  if (typeof window === "undefined" || !GTM_ID) return;
  if ((window as any).__gtm_loaded) return;
  (window as any).__gtm_loaded = true;

  (function (w: any, d: any, s: any, l: any, i: string) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s);
    const dl = l !== "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode!.insertBefore(j, f);
  })(window, document, "script", "dataLayer", GTM_ID);
}

function loadMetaPixel() {
  if (typeof window === "undefined" || !META_PIXEL_ID) return;
  if ((window as any).__fbq_loaded) return;
  (window as any).__fbq_loaded = true;

  // fbq bootstrap
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      (n!.callMethod ? n!.callMethod : n!.queue.push(arguments));
    };
    if (!f._fbq) f._fbq = n;
    n!.push = n!.push || [];
    n!.loaded = true;
    n!.version = "2.0";
    n!.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode!.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  try {
    (window as any).fbq("init", META_PIXEL_ID);
    (window as any).fbq("track", "PageView");
  } catch {
    // ignore
  }

  // Optional noscript image beacon (best-effort)
  try {
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=${encodeURIComponent(META_PIXEL_ID)}&ev=PageView&noscript=1`;
    document.body.appendChild(img);
  } catch {}
}

function loadLinkedInInsight() {
  if (typeof window === "undefined" || !LINKEDIN_PARTNER_ID) return;
  if ((window as any).__linkedin_loaded) return;
  (window as any).__linkedin_loaded = true;

  try {
    (window as any)._linkedin_partner_id = LINKEDIN_PARTNER_ID;
    (window as any)._linkedin_data_partner_ids = (window as any)._linkedin_data_partner_ids || [];
    (window as any)._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
  } catch {}

  const s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  const s0 = document.getElementsByTagName("script")[0];
  s0.parentNode!.insertBefore(s, s0);

  // Optional noscript image beacon
  try {
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.alt = "";
    img.src = `https://px.ads.linkedin.com/collect/?pid=${encodeURIComponent(LINKEDIN_PARTNER_ID)}&fmt=gif`;
    document.body.appendChild(img);
  } catch {}
}

function loadHotjar() {
  if (typeof window === "undefined" || !HOTJAR_ID || !HOTJAR_SV) return;
  if ((window as any).hj && (window as any)._hjSettings) return;

  (function (h: any, o: any, t: any, j: any, a?: any, r?: any) {
    h.hj =
      h.hj ||
      function () {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: Number(HOTJAR_ID), hjsv: Number(HOTJAR_SV) };
    a = o.getElementsByTagName("head")[0];
    r = o.createElement("script");
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
}

export function MarketingLoader() {
  const [allowed, setAllowed] = React.useState(false);

  React.useEffect(() => {
    const c = readConsent();
    setAllowed(Boolean(c && c.marketing === true));
  }, []);

  React.useEffect(() => {
    if (!allowed) return;
    if (GTM_ID) {
      // Prefer GTM: centralize tags and let GTM manage pixels
      loadGTM();
      return;
    }
    // Fallback: load individual pixels guarded by consent
    loadMetaPixel();
    loadLinkedInInsight();
    loadHotjar();
  }, [allowed]);

  return null;
}