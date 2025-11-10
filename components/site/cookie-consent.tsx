"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";

const PROVIDER = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "").toLowerCase();
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

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

function setConsent(v: { analytics?: boolean }) {
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
  // Show banner for GA (consent-based) and for Plausible/Umami (info-only)
  const isGA = PROVIDER === "ga";
  const shouldShow = ["ga", "plausible", "umami"].includes(PROVIDER);

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!shouldShow) return;
    const c = getConsent();
    if (isGA) {
      if (c && c.analytics === true) {
        // Consent already granted: ensure GA is loaded
        loadGAOnce();
        setVisible(false);
        return;
      }
      if (c && c.analytics === false) {
        setVisible(false);
        return;
      }
      setVisible(true);
      return;
    }
    // Info-only mode: show once until user closes or accepts
    if (c) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [shouldShow, isGA]);

  if (!shouldShow || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-5xl px-4 pb-4">
      <div className="rounded-2xl border bg-card p-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="font-semibold">Cookies de mesure d’audience</div>
            <p className="mt-1 text-sm text-foreground/80">
              {isGA ? (
                <>
                  Nous souhaitons utiliser Google Analytics pour mesurer l’audience et améliorer le site. Vous pouvez refuser.
                  En continuant sans accepter, aucun cookie Analytics ne sera déposé. Voir{" "}
                  <Link href="/politique-de-confidentialite" className="underline">
                    la politique de confidentialité
                  </Link>.
                </>
              ) : (
                <>
                  Nous utilisons une solution d’analytics respectueuse (Plausible/Umami) sans cookies marketing.
                  Vous pouvez consulter{" "}
                  <Link href="/politique-de-confidentialite" className="underline">
                    la politique de confidentialité
                  </Link>.
                </>
              )}
            </p>
          </div>
          <button
            className="rounded p-1 text-muted-foreground hover:bg-accent"
            aria-label="Fermer"
            onClick={() => {
              setConsent({ analytics: false });
              setVisible(false);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isGA ? (
          <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:justify-end">
            <button
              className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
              onClick={() => {
                setConsent({ analytics: false });
                setVisible(false);
              }}
            >
              Refuser
            </button>
            <button
              className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground shadow-sm transition hover:opacity-90"
              onClick={() => {
                setConsent({ analytics: true });
                loadGAOnce();
                setVisible(false);
              }}
            >
              Accepter
            </button>
          </div>
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
}