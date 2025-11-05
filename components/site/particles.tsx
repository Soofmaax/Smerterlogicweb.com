"use client";

import * as React from "react";

/**
 * Lightweight canvas particle system.
 * - Pauses on prefers-reduced-motion.
 * - Limits to ~80 particles on desktop, ~40 on mobile.
 */
export function Particles() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number>(0);
  const particlesRef = React.useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const mouseRef = React.useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  React.useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const canvas = document.createElement("canvas");
    canvas.className = "particles-layer";
    canvasRef.current = canvas;

    const parent = document.querySelector("section"); // mount in current section context
    const target = parent ? parent : document.body;
    target.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const isMobile = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;
    const count = isMobile ? 40 : 80;

    const resize = () => {
      const rect = target.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };
    resize();

    particlesRef.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    const step = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        // mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx -= dx * 0.0005;
          p.vy -= dy * 0.0005;
        }

        // move
        p.x += p.vx;
        p.y += p.vy;

        // bounds
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.35)"; // brand blue
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * dpr;
      mouseRef.current.y = (e.clientY - rect.top) * dpr;
    };

    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.remove();
    };
  }, []);

  return null;
}