"use client";

import * as React from "react";

/**
 * Smart CTAs: show small dynamic prompts based on behavior.
 * - scroll >= 50%, hover on .project-card, time on site >= 45s
 * - non-blocking; dismissible; respects reduced-motion.
 */
export function SmartCTAs() {
  const [msg, setMsg] = React.useState<string | null>(null);
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<number>(0);

  React.useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const snooze = localStorage.getItem("cta_snooze");
    if (prefersReduced || snooze === "1") return;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = (doc.scrollTop) / ((doc.scrollHeight - doc.clientHeight) || 1);
      if (scrolled >= 0.5 && !visible) {
        setMsg("Intéressé par mon profil ? 📞");
        setVisible(true);
      }
    };
    const onHover = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest(".project-card")) {
        setMsg("Un projet similaire ? 🚀");
        setVisible(true);
      }
    };
    const onTime = () => {
      timerRef.current = window.setTimeout(() => {
        if (!visible) {
          setMsg("On travaille ensemble ? 💼");
          setVisible(true);
        }
      }, 45000);
    };
    onTime();

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseover", onHover);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseover", onHover);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible]);

  if (!visible || !msg) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <div className="rounded-full border bg-card px-4 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-sm">{msg}</span>
          <div className="flex gap-1">
            <a href="/contact" className="inline-flex items-center rounded-full border px-3 py-1 text-xs hover:bg-accent">Contact</a>
            <a href="/#tarifs" className="inline-flex items-center rounded-full border px-3 py-1 text-xs hover:bg-accent">Tarifs</a>
            <button
              type="button"
              className="inline-flex items-center rounded-full border px-3 py-1 text-xs hover:bg-accent"
              onClick={() => { setVisible(false); localStorage.setItem("cta_snooze", "1"); }}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}