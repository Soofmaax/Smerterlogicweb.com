"use client";

import * as React from "react";

export function UXEnhancer() {
  React.useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduceMotion) return;

    let active: HTMLElement | null = null;

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".card-elevated") as HTMLElement | null;
      if (target && active !== target) {
        active = target;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!active) return;
      const related = e.relatedTarget as Node | null;
      if (!related || !active.contains(related)) {
        // leaving the active element
        active.style.setProperty("--rx", "0deg");
        active.style.setProperty("--ry", "0deg");
        active = null;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!active) return;
      const rect = active.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width; // -0.5..0.5
      const dy = (e.clientY - cy) / rect.height;
      const maxX = 4; // deg
      const maxY = 5; // deg
      const rx = (-dy * maxX).toFixed(2);
      const ry = (dx * maxY).toFixed(2);
      active.style.setProperty("--rx", `${rx}deg`);
      active.style.setProperty("--ry", `${ry}deg`);
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return null;
}