"use client";

import * as React from "react";
import { track } from "@/lib/analytics";

function hasConsent(): boolean {
  if (typeof document === "undefined") return false;
  const m = document.cookie.match(/(?:^|; )cookie_consent=([^;]+)/);
  if (!m) return false;
  try {
    const c = JSON.parse(decodeURIComponent(m[1]));
    return Boolean(c && c.analytics === true);
  } catch {
    return false;
  }
}

function getLinkText(el: HTMLAnchorElement): string {
  const txt = (el.textContent || "").trim();
  if (txt) return txt.slice(0, 120);
  const aria = el.getAttribute("aria-label") || "";
  if (aria) return aria.slice(0, 120);
  return "";
}

function isDownloadUrl(href: string): { is: boolean; ext?: string } {
  const m = href.toLowerCase().match(/\.(pdf|docx?|xlsx?|csv|zip|rar|7z|pptx?)$/);
  return { is: Boolean(m), ext: m?.[1] };
}

/**
 * Auto-events:
 * - outbound_click for external links
 * - file_download for common file extensions or links with download attribute
 * - mailto_click for mailto
 * - tel_click for tel
 * - cta_click for elements with [data-cta]
 * - custom: if element has [data-event], emit that event name and skip generic tracking for that click
 */
export function AutoEvents() {
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!hasConsent()) return;

      const t = e.target as HTMLElement | null;
      if (!t) return;
      const anchor = t.closest("a") as HTMLAnchorElement | null;
      const button = t.closest("button") as HTMLButtonElement | null;

      // Custom events via data-event (take precedence, avoid double-tracking)
      const withEventAttr = (t.closest("[data-event]") as HTMLElement | null);
      if (withEventAttr) {
        const ev = withEventAttr.getAttribute("data-event");
        if (ev) {
          track(ev);
          return; // skip generic handlers
        }
      }

      // CTA: any element marked with data-cta
      const ctaEl = t.closest("[data-cta]") as HTMLElement | null;
      if (ctaEl) {
        const label =
          (ctaEl.getAttribute("aria-label") || "").trim() ||
          (ctaEl.textContent || "").trim().slice(0, 120);
        track("cta_click", { label });
        // do not return; allow additional specific tracking (e.g., outbound)
      }

      // Link handling
      if (anchor) {
        const href = anchor.getAttribute("href") || "";
        if (!href || href.startsWith("#")) return;

        // mailto / tel
        if (href.startsWith("mailto:")) {
          // if already labeled as CTA, keep both semantics by adding props
          track("mailto_click", { link_url: href, link_text: getLinkText(anchor) });
          return;
        }
        if (href.startsWith("tel:")) {
          track("tel_click", { link_url: href, link_text: getLinkText(anchor) });
          return;
        }

        // download attribute or extension
        const dlAttr = anchor.getAttribute("download");
        const dlExt = isDownloadUrl(href);
        if (dlAttr || dlExt.is) {
          track("file_download", { link_url: href, file_ext: dlExt.ext || "", link_text: getLinkText(anchor) });
          return;
        }

        // outbound
        try {
          const url = new URL(href, window.location.href);
          const isExternal = url.origin !== window.location.origin;
          if (isExternal) {
            track("outbound_click", { link_url: url.href, link_text: getLinkText(anchor) });
          }
        } catch {
          // ignore parse errors
        }
      }

      // Buttons without links: no generic tracking unless data-cta/event present
      if (button && button.hasAttribute("data-cta")) {
        // already handled by [data-cta]
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true } as any);
    };
  }, []);

  return null;
}