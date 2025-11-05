"use client";

import * as React from "react";

/**
 * Custom cursor overlay with emoji states + magnetic buttons.
 * - Desktop only (pointer: fine), disabled for prefers-reduced-motion.
 * - Lightweight: transform only, requestAnimationFrame throttling.
 */
export function Cursor() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const stateRef = React.useRef<"default" | "click" | "link" | "text" | "loading" | "love">("default");
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const isFinePointer = window.matchMedia?.("(pointer: fine)")?.matches ?? true;
    if (prefersReduced || !isFinePointer) return;

    const el = document.createElement("div");
    el.className = "custom-cursor";
    el.setAttribute("aria-hidden", "true");
    el.textContent = "👆";
    document.body.appendChild(el);
    ref.current = el;

    const setEmoji = (s: typeof stateRef.current) => {
      stateRef.current = s;
      if (!ref.current) return;
      const map: Record<string, string> = {
        default: "👆",
        click: "👇",
        link: "👉",
        text: "✍️",
        loading: "⏳",
        love: "❤️",
      };
      ref.current.textContent = map[s] || "👆";
    };

    const onMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        rafRef.current = 0;
      });
    };
    const onDown = () => setEmoji("click");
    const onUp = () => setEmoji("default");

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("a, button, [role='button']")) {
        setEmoji("link");
      } else if (t.closest("input, textarea, [contenteditable='true']")) {
        setEmoji("text");
      } else {
        setEmoji("default");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);

    // Magnetic buttons (all buttons and anchors with role=button)
    const magnets = Array.from(document.querySelectorAll("button, a[role='button']")) as HTMLElement[];
    const handleMagnetic = (el: HTMLElement) => {
      const onMagMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      };
      const onLeave = () => {
        el.style.transform = "translate(0, 0)";
      };
      el.addEventListener("mousemove", onMagMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMagMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    };
    const cleanups = magnets.map(handleMagnetic);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      cleanups.forEach((fn) => fn());
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (ref.current) {
        ref.current.remove();
        ref.current = null;
      }
    };
  }, []);

  return null;
}