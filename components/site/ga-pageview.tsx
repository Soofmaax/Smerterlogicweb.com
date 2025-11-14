"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

const PROVIDER = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "").toLowerCase();

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

/**
 * GA4 page_view tracker for App Router
 * - Relies on CookieConsent to have loaded gtag.js after consent (GA) or GTM to be present (GTM)
 * - Emits page_view on route changes when provider === "ga" or "gtm" and analytics consent granted
 * - Skips initial mount to avoid double page_view (GTM often fires one on load)
 */
export function GA4PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const didInitRef = React.useRef(false);

  React.useEffect(() => {
    const provider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "").toLowerCase();
    if (provider !== "ga" && provider !== "gtm") return;
    const c = getConsent();
    if (!(c && c.analytics === true)) return;
    if (typeof window === "undefined") return;

    // Skip first render to avoid duplicate initial page_view
    if (!didInitRef.current) {
      didInitRef.current = true;
      return;
    }

    const page_path = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    const page_location = window.location.href;
    const page_title = document.title || page_path;

    try {
      if (provider === "gtm" && Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push({
          event: "page_view",
          page_title,
          page_location,
          page_path,
        });
      } else {
        (window as any).gtag?.("event", "page_view", {
          page_title,
          page_location,
          page_path,
        });
      }
    } catch {
      // no-op
    }
  }, [pathname, searchParams]);

  return null;
}