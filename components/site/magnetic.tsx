"use client";

import * as React from "react";

export function MagneticZone({ children, maxOffset = 5 }: { children: React.ReactNode; maxOffset?: number }) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const targets = Array.from(wrap.querySelectorAll<HTMLElement>("[data-magnetic='true']"));
      targets.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2;
        const my = e.clientY - rect.top - rect.height / 2;
        const damp = maxOffset;
        btn.style.transform = `translate(${Math.max(Math.min(mx / 12, damp), -damp)}px, ${Math.max(Math.min(my / 12, damp), -damp)}px)`;
      });
    };
    const onLeave = () => {
      const targets = Array.from(wrap.querySelectorAll<HTMLElement>("[data-magnetic='true']"));
      targets.forEach((btn) => (btn.style.transform = "translate(0,0)"));
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [maxOffset]);

  return <div ref={ref}>{children}</div>;
}