"use client";

import * as React from "react";

/**
 * PinchZoom
 * - Attaches pinch-to-zoom to elements with class '.zoomable' within the given root element.
 * - Applies scale and translate based on gesture; resets on end.
 */
export function PinchZoom({ root }: { root: React.RefObject<HTMLElement | null> }) {
  React.useEffect(() => {
    const el = root.current;
    if (!el) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>(".zoomable"));
    const cleanups: Array<() => void> = [];

    for (const target of targets) {
      let startDist = 0;
      let startMid = { x: 0, y: 0 };
      let scale = 1;
      let tx = 0, ty = 0;
      let lastTouches: TouchList | null = null;

      const getDist = (t1: Touch, t2: Touch) => {
        const dx = t1.clientX - t2.clientX;
        const dy = t1.clientY - t2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
      };
      const getMid = (t1: Touch, t2: Touch) => ({
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      });

      const onStart = (e: TouchEvent) => {
        if (e.touches.length < 2) return;
        lastTouches = e.touches;
        startDist = getDist(e.touches[0], e.touches[1]);
        startMid = getMid(e.touches[0], e.touches[1]);
        target.style.willChange = "transform";
        e.preventDefault();
      };

      const onMove = (e: TouchEvent) => {
        if (!lastTouches || e.touches.length < 2) return;
        const dist = getDist(e.touches[0], e.touches[1]);
        const mid = getMid(e.touches[0], e.touches[1]);
        const deltaScale = dist / (startDist || dist);
        scale = Math.max(1, Math.min(2.5, deltaScale));
        tx = (mid.x - startMid.x) * 0.4;
        ty = (mid.y - startMid.y) * 0.4;
        target.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
        e.preventDefault();
      };

      const onEnd = () => {
        startDist = 0;
        scale = 1;
        tx = 0; ty = 0;
        lastTouches = null;
        target.style.transform = "";
        target.style.willChange = "";
      };

      target.addEventListener("touchstart", onStart, { passive: false });
      target.addEventListener("touchmove", onMove, { passive: false });
      target.addEventListener("touchend", onEnd);
      target.addEventListener("touchcancel", onEnd);

      cleanups.push(() => {
        target.removeEventListener("touchstart", onStart);
        target.removeEventListener("touchmove", onMove);
        target.removeEventListener("touchend", onEnd);
        target.removeEventListener("touchcancel", onEnd);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [root]);

  return null;
}