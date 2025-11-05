"use client";

import * as React from "react";

/**
 * GyroTilt:
 * - Applies subtle rotateX/rotateY to .card-elevated and section.snap-start on deviceorientation.
 * - Only active on mobile (pointer: coarse) and when permission is granted (iOS).
 * - Respects prefers-reduced-motion.
 */
export function GyroTilt() {
  React.useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    if (reduced || !coarse) return;

    let permGranted = true;
    const maybeRequestPermission = async () => {
      const AnyDeviceOrientationEvent = (window as any).DeviceOrientationEvent;
      if (AnyDeviceOrientationEvent && typeof AnyDeviceOrientationEvent.requestPermission === "function") {
        try {
          const res = await AnyDeviceOrientationEvent.requestPermission();
          permGranted = res === "granted";
        } catch {
          permGranted = false;
        }
      }
    };

    const applyTilt = (beta: number, gamma: number) => {
      const maxX = 6, maxY = 6;
      const rx = (beta / 90) * maxX;   // -90..90 -> -max..max
      const ry = (gamma / 90) * maxY;  // -90..90 -> -max..max

      const cards = Array.from(document.querySelectorAll<HTMLElement>(".card-elevated"));
      for (const c of cards) {
        c.style.setProperty("--rx", `${(-rx).toFixed(2)}deg`);
        c.style.setProperty("--ry", `${(ry).toFixed(2)}deg`);
      }

      const sections = Array.from(document.querySelectorAll<HTMLElement>("section.snap-start"));
      for (const s of sections) {
        s.style.transform = `rotateX(${(-rx).toFixed(2)}deg) rotateY(${(ry).toFixed(2)}deg)`;
      }
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      if (!permGranted) return;
      const beta = e.beta ?? 0;  // x
      const gamma = e.gamma ?? 0; // y
      applyTilt(beta, gamma);
    };

    let active = true;
    const onFocus = () => { active = true; };
    const onBlur = () => { active = false; };

    (async () => {
      await maybeRequestPermission();
      window.addEventListener("deviceorientation", onOrient);
      window.addEventListener("focus", onFocus);
      window.addEventListener("blur", onBlur);
    })();

    return () => {
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return null;
}