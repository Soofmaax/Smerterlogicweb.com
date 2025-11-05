"use client";

import * as React from "react";

/**
 * Canvas particle system (network mode).
 * - Pauses on prefers-reduced-motion.
 * - ~80 particles desktop / ~40 mobile.
 * - Draws connecting lines for nearby particles.
 * - Mounts in a local container to avoid selecting the wrong <section>.
 */
export function Particles() {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number>(0);
  const particlesRef = React.useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const mouseRef = React.useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  React.useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const manualReduced = (() => {
      try { return localStorage.getItem("reduce_motion") === "1"; } catch { return false; }
    })();
    if (prefersReduced || manualReduced) return;

    const target = hostRef.current || document.body;

    const canvas = document.createElement("canvas");
    canvas.className = "particles-layer";
    canvasRef.current = canvas;
    target.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const isMobile = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;
    const count = isMobile ? 60 : 100;
    const linkDist = isMobile ? 100 * dpr : 140 * dpr;

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

    let paused = false;

    let lastMoveTs = Date.now();

    const step = () => {
      if (!ctx || paused) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const parts = particlesRef.current;

      // update particles
      for (const p of parts) {
        // mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 * dpr) {
          p.vx -= dx * 0.0005;
          p.vy -= dy * 0.0005;
        }

        // move
        p.x += p.vx;
        p.y += p.vy;

        // bounds reflect
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      // draw lines (lighter when idle)
      const idle = Date.now() - lastMoveTs > 5000;
      const stepIdx = idle ? 2 : 1;
      for (let i = 0; i < parts.length; i += stepIdx) {
        for (let j = i + 1; j < parts.length; j += stepIdx) {
          const a = parts[i], b = parts[j];
          if (!a || !b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const alpha = 0.15 * (1 - d2 / (linkDist * linkDist));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(37,99,235,${alpha})`; // brand blue
            ctx.lineWidth = 0.8 * dpr;
            ctx.stroke();
          }
        }
      }

      // draw points
      for (const p of parts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.35)";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * dpr;
      mouseRef.current.y = (e.clientY - rect.top) * dpr;
      lastMoveTs = Date.now();
    };

    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const onVisibility = () => {
      paused = document.hidden;
    };
    const onFocus = () => { paused = false; };
    const onBlur = () => { paused = true; };

    window.addEventListener("resize", resize);
    window.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.remove();
    };
  }, []);

  // Host div that acts as an absolute layer; parent (hero overlay) already is absolute with -z-10
  return <div ref={hostRef} className="absolute inset-0 pointer-events-none" aria-hidden />;
}