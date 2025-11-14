"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";

const PROVIDER = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "").toLowerCase();
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const GA_FALLBACK = (process.env.NEXT_PUBLIC_GA_FALLBACK || "0").trim();

type ConsentPrefs = { analytics?: boolean; marketing?: boolean };

function getConsent(): ConsentPrefs | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )cookie_consent=([^;]+)/);
  if (!m) return null;
  try {
    return JSON.parse(decodeURIComponent(m[1]));
  } catch {
    return null;
  }
}

function setConsent(v: ConsentPrefs) {
  if (typeof document === "undefined") return;
  const val = encodeURIComponent(JSON.stringify(v));
  // 6 mois
  const exp = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `cookie_consent=${val}; expires=${exp}; path=/; SameSite=Lax`;
}

function updateGtagConsent(v: ConsentPrefs) {
  try {
    const analytics = v.analytics === true ? "granted" : "denied";
    const marketing = v.marketing === true ? "granted" : "denied";
    (window as any).gtag?.("consent", "update", {
      ad_storage: marketing,
      analytics_storage: analytics,
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
      ad_user_data: marketing,
      ad_personalization: marketing,
    });
  } catch {
    // no-op
  }
}

function loadGAOnce() {
  if (typeof window === "undefined" || !GA_ID) return;
  if ((window as any).__ga_loaded) return;
  (window as any).__ga_loaded = true;
  // gtag.js
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  const inline = document.createElement("script");
  inline.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(inline);
}

export function CookieConsent() {
  // GA/GTM (consent required) vs Plausible/Umami (info-only)
  const isGA = PROVIDER === "ga";
  const isGTM = PROVIDER === "gtm";
  const needsConsent = isGA || isGTM;
  const shouldShow = ["ga", "gtm", "plausible", "umami"].includes(PROVIDER);

  const [visible, setVisible] = React.useState(false);
  const [prefs, setPrefs] = React.useState<ConsentPrefs>({ analytics: false, marketing: false });
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!shouldShow) return;
    const c = getConsent();
    if (needsConsent) {
      if (c && (c.analytics === true || c.analytics === false)) {
        updateGtagConsent(c);
        if ((isGA || (isGTM && GA_FALLBACK === "1")) && c.analytics === true) {
          loadGAOnce();
        }
        setVisible(false);
        return;
      }
      setVisible(true);
      setPrefs({ analytics: Boolean(c?.analytics), marketing: Boolean(c?.marketing) });
      return;
    }
    // Info-only mode: show once until user closes or accepts
    if (c) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [shouldShow, needsConsent, isGA]);

  // Allow reopening banner from footer or /cookies page
  React.useEffect(() => {
    function openBanner() {
      setVisible(true);
    }
    (window as any).cookieConsentOpen = openBanner;
    window.addEventListener("cookie-consent:open", openBanner);
    return () => {
      try {
        delete (window as any).cookieConsentOpen;
      } catch {}
      window.removeEventListener("cookie-consent:open", openBanner);
    };
  }, []);

  if (!shouldShow || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-5xl px-4 pb-4">
      <div className="rounded-2xl border bg-card p-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="font-semibold">Cookies et consentement</div>
            <p className="mt-1 text-sm text-foreground/80">
              {needsConsent ? (
                <>
                  Nous souhaitons utiliser une mesure d’audience (Google Analytics via GA4/GTM) et éventuellement des pixels marketing.
                  Vous pouvez accepter, refuser ou paramétrer vos choix. Sans acceptation, aucun cookie Analytics/marketing ne sera déposé.
                  Voir{" "}
                  <Link href="/politique-de-confidentialite" className="underline">
                    la politique de confidentialité
                  </Link>
                  .
                </>
              ) : (
                <>
                  Nous utilisons une solution d’analytics respectueuse (Plausible/Umami) sans cookies marketing.
                  Vous pouvez consulter{" "}
                  <Link href="/politique-de-confidentialite" className="underline">
                    la politique de confidentialité
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
          <button
            className="rounded p-1 text-muted-foreground hover:bg-accent"
            aria-label="Fermer"
            onClick={() => {
              const denied = { analytics: false, marketing: false };
              setConsent(denied);
              if (needsConsent) updateGtagConsent(denied);
              setVisible(false);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {needsConsent ? (
          <>
            {settingsOpen ? (
              <div className="mt-3 rounded-xl border bg-accent/30 p-3">
                <div className="flex items-center gap-2">
                  <input
                    id="consent-analytics"
                    type="checkbox"
                    checked={Boolean(prefs.analytics)}
                    onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                  />
                  <label htmlFor="consent-analytics" className="text-sm">
                    Mesure d’audience (Google Analytics)
                  </label>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    id="consent-marketing"
                    type="checkbox"
                    checked={Boolean(prefs.marketing)}
                    onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                  />
                  <label htmlFor="consent-marketing" className="text-sm">
                    Marketing/retargeting (pixels publicitaires)
                  </label>
                </div>
                <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:justify-end">
                  <button
                    className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
                    onClick={() => {
                      const denied = { analytics: false, marketing: false };
                      setPrefs(denied);
                      setConsent(denied);
                      updateGtagConsent(denied);
                      setSettingsOpen(false);
                      setVisible(false);
                    }}
                  >
                    Tout refuser
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground shadow-sm transition hover:opacity-90"
                    onClick={() => {
                      setConsent(prefs);
                      updateGtagConsent(prefs);
                      if ((isGA || (isGTM && GA_FALLBACK === "1")) && prefs.analytics) loadGAOnce();
                      setSettingsOpen(false);
                      setVisible(false);
                    }}
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:justify-end">
              <button
                className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
                onClick={() => {
                  const denied = { analytics: false, marketing: false };
                  setPrefs(denied);
                  setConsent(denied);
                  updateGtagConsent(denied);
                  setVisible(false);
                }}
              >
                Tout refuser
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
                onClick={() => setSettingsOpen((v) => !v)}
              >
                Paramétrer
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground shadow-sm transition hover:opacity-90"
                onClick={() => {
                  const all = { analytics: true, marketing: true };
                  setPrefs(all);
                  setConsent(all);
                  updateGtagConsent(all);
                  if (isGA || (isGTM && GA_FALLBACK === "1")) loadGAOnce();
                  setVisible(false);
                }}
              >
                Tout accepter
              </button>
            </div>
          </>
        ) : (
          <div className="mt-3 flex items-center justify-end">
            <button
              className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground shadow-sm transition hover:opacity-90"
              onClick={() => {
                setConsent({ analytics: true }); // mark acknowledged
                setVisible(false);
              }}
            >
              OK, compris
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
                