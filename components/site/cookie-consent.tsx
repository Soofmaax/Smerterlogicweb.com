"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";

const PROVIDER = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "").toLowerCase();
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

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
  // GA (consent required) vs Plausible/Umami (info-only)
  const isGA = PROVIDER === "ga";
  const shouldShow = ["ga", "plausible", "umami"].includes(PROVIDER);

  const [visible, setVisible] = React.useState(false);
  const [prefs, setPrefs] = React.useState<ConsentPrefs>({ analytics: false, marketing: false });
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!shouldShow) return;
    const c = getConsent();
    if (isGA) {
      if (c && c.analytics === true) {
        loadGAOnce();
        setVisible(false);
        return;
      }
      if (c && c.analytics === false) {
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
  }, [shouldShow, isGA]);

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
              {isGA ? (
                <>
                  Nous souhaitons utiliser Google Analytics pour mesurer l’audience et améliorer le site. Vous pouvez
                  accepter, refuser ou paramétrer vos choix. Sans acceptation, aucun cookie Analytics ne sera déposé.
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
              setConsent({ analytics: false, marketing: false });
              setVisible(false);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isGA ? (
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
                      setPrefs({ analytics: false, marketing: false });
                      setConsent({ analytics: false, marketing: false });
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
                      if (prefs.analytics) loadGAOnce();
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
                  setPrefs({ analytics: false, marketing: false });
                  setConsent({ analytics: false, marketing: false });
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
                  loadGAOnce();
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
                writeConsent(c);
                setSettings(c);
                if (isGA && c.analytics) loadGAOnce();
                setVisible(false);
              }}
            >
              Tout accepter
            </button>
          </div>
        ) : (
          <div className="mt-3 rounded-lg border bg-accent/30 p-3">
            <div className="flex items-center justify-between">
              <label className="text-sm">
                <input
                  type="checkbox"
                  className="mr-2 align-middle"
                  checked={settings.analytics}
                  onChange={(e) => setSettings((s) => ({ ...s, analytics: e.target.checked }))}
                />
                Mesure d’audience (Analytics)
              </label>
              <span className="text-xs text-muted-foreground">{isGA ? "Google Analytics" : "Plausible/Umami"}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <label className="text-sm">
                <input
                  type="checkbox"
                  className="mr-2 align-middle"
                  checked={settings.marketing}
                  onChange={(e) => setSettings((s) => ({ ...s, marketing: e.target.checked }))}
                />
                Marketing (pixels publicitaires)
              </label>
              <span className="text-xs text-muted-foreground">Optionnel (ex. Meta/LinkedIn) — non activé par défaut</span>
            </div>

            <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:justify-end">
              <button
                className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
                onClick={() => {
                  const c: ConsentSettings = { analytics: false, marketing: false };
                  writeConsent(c);
                  setSettings(c);
                  setVisible(false);
                  setShowPrefs(false);
                }}
              >
                Tout refuser
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
                onClick={() => {
                  const c = { ...settings };
                  writeConsent(c);
                  if (isGA && c.analytics) loadGAOnce();
                  setVisible(false);
                  setShowPrefs(false);
                }}
              >
                Enregistrer
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground shadow-sm transition hover:opacity-90"
                onClick={() => {
                  const c: ConsentSettings = { analytics: true, marketing: true };
                  writeConsent(c);
                  setSettings(c);
                  if (isGA && c.analytics) loadGAOnce();
                  setVisible(false);
                  setShowPrefs(false);
                }}
              >
                Tout accepter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}