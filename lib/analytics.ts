export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const provider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "").toLowerCase();
  const DEBUG = (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG || "0").trim() === "1";

  if (DEBUG) {
    try {
      // Minimal debug to help validate wiring without noisy logs in production
      // eslint-disable-next-line no-console
      console.debug("[analytics]", { provider, event, props });
    } catch {}
  }

  // Plausible
  if (provider === "plausible") {
    const plausible = (window as any).plausible;
    if (typeof plausible === "function") {
      plausible(event, props ? { props } : undefined);
    }
    return;
  }

  // Umami
  if (provider === "umami") {
    const umami = (window as any).umami;
    if (typeof umami === "function") {
      try {
        // Standard event, props ignored by umami default API
        umami.track(event);
      } catch {
        // no-op
      }
    }
    return;
  }

  // Google Analytics (only after consent; gtag defined by CookieConsent)
  if (provider === "ga") {
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      try {
        gtag("event", event, props || {});
      } catch {
        // no-op
      }
    }
    return;
  }

  // Google Tag Manager: push dataLayer event object
  if (provider === "gtm") {
    const dl = (window as any).dataLayer;
    if (Array.isArray(dl)) {
      const payload: Record<string, unknown> = { event };
      if (props && typeof props === "object") {
        Object.assign(payload, props);
      }
      dl.push(payload);
      if (DEBUG) {
        try {
          // eslint-disable-next-line no-console
          console.debug("[analytics] dataLayer.push", payload);
        } catch {}
      }
    } else {
      // Fallback to gtag stub if present
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        try {
          gtag("event", event, props || {});
          if (DEBUG) {
            // eslint-disable-next-line no-console
            console.debug("[analytics] gtag(event)", { event, props });
          }
        } catch {
          // no-op
        }
      }
    }
  }
}