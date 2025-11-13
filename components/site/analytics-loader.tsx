"use client";

import Script from "next/script";
import * as React from "react";

const PROVIDER = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "").toLowerCase();
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "smarterlogicweb.com";
const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://analytics.umami.is/script.js";
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "";

function getConsent(): { analytics?: boolean } | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )cookie_consent=([^;]+)/);
  if (!m) return null;
  try {
    return JSON.parse(decodeURIComponent(m[1]));
  } catch {
    return null;
  }
}

export function AnalyticsLoader() {
  const [allowed, setAllowed] = React.useState(false);

  React.useEffect(() => {
    const c = getConsent();
    setAllowed(Boolean(c && c.analytics === true));
  }, []);

  if (!allowed) return null;

  // GA is loaded via CookieConsent upon user acceptance
  if (PROVIDER === "ga") return null;

  return (
    <>
      {PROVIDER === "plausible" && (
        <Script strategy="lazyOnload" data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
      )}
      {PROVIDER === "umami" && UMAMI_WEBSITE_ID && (
        <Script strategy="lazyOnload" src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} />
      )}
    </>
  );
}