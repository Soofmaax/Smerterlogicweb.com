"use client";

import * as React from "react";

export function ScrollProgress() {
  const barRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;

    const update = () => {
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const p = scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0;
      el.style.transform = `scaleX(${p})`;
      raf = 0;
    };

    const onScroll = () => {
      if (prefersReduced) return;
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[120] h-0.5 bg-transparent">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-primary"
        style={{ transform: "scaleX(0)" }}
        aria-hidden
      />
    </div>
  );
}