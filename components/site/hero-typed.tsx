"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroTyped() {
  const title = "Sites Web Performants pour Artisans et Entreprises Locales";
  const words = ["Rapides", "Modernes", "Efficaces", "Professionnels"];
  const [mounted, setMounted] = React.useState(false);
  const [typed, setTyped] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<"typing" | "pausing" | "deleting">("typing");

  // parallax refs
  const p1Ref = React.useRef<HTMLDivElement | null>(null);
  const p2Ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => setMounted(true), []);

  // Typing cycle for words with blinking caret
  React.useEffect(() => {
    const current = words[wordIndex];
    let timeout: number;

    if (phase === "typing") {
      if (typed.length < current.length) {
        timeout = window.setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 60);
      } else {
        timeout = window.setTimeout(() => setPhase("pausing"), 1400);
      }
    } else if (phase === "pausing") {
      timeout = window.setTimeout(() => setPhase("deleting"), 700);
    } else if (phase === "deleting") {
      if (typed.length > 0) {
        timeout = window.setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 35);
      } else {
        setPhase("typing");
        setWordIndex((i) => (i + 1) % words.length);
      }
    }

    return () => window.clearTimeout(timeout);
  }, [typed, phase, wordIndex, words]);

  // Parallax on scroll (very subtle)
  React.useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const t1 = `translate3d(0, ${Math.min(60, y * 0.06)}px, 0)`;
        const t2 = `translate3d(0, ${Math.min(80, y * 0.1)}px, 0)`;
        if (p1Ref.current) p1Ref.current.style.transform = t1;
        if (p2Ref.current) p2Ref.current.style.transform = t2;
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const charTyping = (delayPerChar = 0.05) => ({
    hidden: { opacity: 0 },
    show: (i: number) => ({
      opacity: 1,
      transition: { delay: i * delayPerChar, duration: 0.001 },
    }),
  });

  const shouldAnimate = mounted;

  return (
    <section className="relative mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      {/* Subtle animated background + parallax shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <div
          ref={p1Ref}
          className="absolute -left-16 top-8 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
        />
        <div
          ref={p2Ref}
          className="absolute -right-20 top-28 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl"
        />
      </div>

      {/* Small badge */}
      <div className="mb-6">
        <span className="inline-flex rounded-full border border-foreground/15 bg-card px-3 py-1 text-sm text-foreground/80">
          Studio web
        </span>
      </div>

      {/* Title with per-character fade-in */}
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
        {title.split("").map((ch, i) => (
          <motion.span
            key={`ch-${i}-${ch}`}
            custom={i}
            variants={charTyping(0.05)}
            initial={shouldAnimate ? "hidden" : "show"}
            animate="show"
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </h1>

      {/* Subheading with live typing word */}
      <p className="mt-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
        Des sites statiques ultra-rapides, optimisés pour Google et conçus pour convertir vos visiteurs en clients.{" "}
        <span className="font-semibold text-foreground">
          {typed}
          <span
            className="ml-0.5 inline-block w-[1px] animate-pulse bg-foreground/70 align-middle"
            style={{ height: "1em" }}
          />
        </span>
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" variant="cta" className="rounded-full">
          <Link href="/contact">Discutons de votre projet</Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="rounded-full">
          <Link href="/projets">Voir mes réalisations</Link>
        </Button>
      </div>

      {/* Compact device mockup with metrics */}
      <div className="mt-8">
        <div className="rounded-[20px] border bg-card p-4 shadow-sm">
          {/* Browser frame */}
          <div className="flex items-center gap-1 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <div className="ml-3 h-5 flex-1 rounded bg-muted/60" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {/* Left: site preview skeleton */}
            <div className="rounded-lg border bg-muted/40 p-3 md:col-span-2">
              <div className="h-6 w-2/3 rounded bg-white/70 dark:bg-white/10" />
              <div className="mt-2 h-3 w-4/5 rounded bg-white/60 dark:bg-white/10" />
              <div className="mt-4 h-24 rounded bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-10 rounded bg-white/70 dark:bg-white/10" />
                <div className="h-10 rounded bg-white/70 dark:bg-white/10" />
                <div className="h-10 rounded bg-white/70 dark:bg-white/10" />
              </div>
            </div>
            {/* Right: metrics badges */}
            <div className="flex flex-col gap-3">
              <div className="rounded-lg border bg-white/80 p-3 text-sm shadow-sm dark:bg-white/5">
                <div className="text-xs text-muted-foreground">Score de performance</div>
                <div className="mt-1 text-2xl font-bold text-amber-500">95/100</div>
              </div>
              <div className="rounded-lg border bg-white/80 p-3 text-sm shadow-sm dark:bg-white/5">
                <div className="text-xs text-muted-foreground">Temps de chargement</div>
                <div className="mt-1 text-2xl font-bold">0,9s</div>
              </div>
              <div className="rounded-lg border bg-white/80 p-3 text-sm shadow-sm dark:bg-white/5">
                <div className="text-xs text-muted-foreground">Compatible mobile</div>
                <div className="mt-1 text-2xl font-bold">100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}