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
 * - Relies on CookieConsent to have loaded gtag.js after consent
 * - Emits page_view on route changes when provider === "ga" and analytics consent granted
 */
export function GA4PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (PROVIDER !== "ga") return;
    const c = getConsent();
    if (!(c && c.analytics === true)) return;
    if (typeof window === "undefined") return;

    const page_path = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    const page_location = window.location.href;
    const page_title = document.title || page_path;

    try {
      (window as any).gtag?.("event", "page_view", {
        page_title,
        page_location,
        page_path,
      });
    } catch {
      // no-op
    }
  }, [pathname, searchParams]);

  return null;
}