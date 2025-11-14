export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const provider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "").toLowerCase();

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
    } else {
      // Fallback to gtag stub if present
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        try {
          gtag("event", event, props || {});
        } catch {
          // no-op
        }
      }
    }
  }
}