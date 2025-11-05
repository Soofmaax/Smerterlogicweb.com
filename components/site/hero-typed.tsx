"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Particles } from "@/components/site/particles";
import { LiveCode } from "@/components/site/live-code";
import { BookingButton } from "@/components/site/booking-modal";

export function HeroTyped() {
  const title = "Obtenez 3 à 5 Nouveaux Clients par Mois Grâce à Votre Site Web";
  const words = React.useMemo(() => ["Rapides", "Modernes", "Efficaces", "Professionnels"], []);
  const [typedWord, setTypedWord] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<"typing" | "pausing" | "deleting">("typing");
  const [titleTyped, setTitleTyped] = React.useState("");
  const [showCaretTitle, setShowCaretTitle] = React.useState(true);

  // parallax refs
  const p1Ref = React.useRef<HTMLDivElement | null>(null);
  const p2Ref = React.useRef<HTMLDivElement | null>(null);
  const mockRef = React.useRef<HTMLDivElement | null>(null);

  // Typewriter for H1
  React.useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setTitleTyped(title);
      setShowCaretTitle(false);
      return;
    }

    let i = 0;
    const step = 50; // 50ms / letter
    const id = window.setInterval(() => {
      i += 1;
      setTitleTyped(title.slice(0, i));
      if (i >= title.length) {
        window.clearInterval(id);
        window.setTimeout(() => setShowCaretTitle(false), 1000);
      }
    }, step);
    return () => window.clearInterval(id);
  }, [title]);

  // Typing cycle for rotating words
  React.useEffect(() => {
    const current = words[wordIndex];
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setTypedWord(current);
      return;
    }

    let timeout: number;
    if (phase === "typing") {
      if (typedWord.length < current.length) {
        timeout = window.setTimeout(() => setTypedWord(current.slice(0, typedWord.length + 1)), 60);
      } else {
        timeout = window.setTimeout(() => setPhase("pausing"), 1400);
      }
    } else if (phase === "pausing") {
      timeout = window.setTimeout(() => setPhase("deleting"), 700);
    } else if (phase === "deleting") {
      if (typedWord.length > 0) {
        timeout = window.setTimeout(() => setTypedWord(current.slice(0, typedWord.length - 1)), 35);
      } else {
        setPhase("typing");
        setWordIndex((i) => (i + 1) % words.length);
      }
    }
    return () => window.clearTimeout(timeout);
  }, [typedWord, phase, wordIndex, words]);

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
        const tm = `translate3d(0, ${Math.min(120, y * 0.6)}px, 0)`; // mockup at 60% scroll speed
        if (p1Ref.current) p1Ref.current.style.transform = t1;
        if (p2Ref.current) p2Ref.current.style.transform = t2;
        if (mockRef.current) mockRef.current.style.transform = tm;
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

  return (
    <section className="relative mx-auto w-full max-w-5xl px-6 py-16 md:py-24 snap-start">
      {/* Subtle animated background + parallax shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <div ref={p1Ref} className="absolute -left-16 top-8 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
        <div ref={p2Ref} className="absolute -right-20 top-28 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
        <Particles />
      </div>

      <div className="relative z-10">
      {/* Urgency badge */}
      <div className="mb-6">
        <span className="inline-flex rounded-full border border-foreground/15 bg-card px-3 py-1 text-sm text-foreground/80">
          🔥 2 places disponibles en novembre 2025
        </span>
      </div>

      {/* Title with typewriter */}
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
        {titleTyped || title}
        {showCaretTitle && <span className="ml-1 inline-block w-[2px] animate-pulse bg-foreground align-middle" style={{ height: "1em" }} />}
      </h1>

      {/* Animated gradient word (WOW) */}
      <div aria-live="polite" className="mt-2 text-2xl font-semibold hero-title md:text-3xl">
        {typedWord}
      </div>

      {/* Subheading */}
      <p className="mt-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
        En 8 semaines, vous êtes visible sur Google
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <BookingButton
          label="Réserver mon audit gratuit (15 min)"
          className="button-glitch h-12 px-8 text-base md:h-14 md:px-10 md:text-lg"
        />
        <Button asChild size="lg" variant="secondary" className="rounded-full">
          <Link href="/contact">Discutons de votre projet</Link>
        </Button>
      </div>

      {/* Urgency subtext */}
      <div className="mt-2 text-sm text-muted-foreground">
        Prochain démarrage : semaine du 18 novembre
      </div>

      {/* Reassurance badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-foreground/80">
        <span className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-card px-2.5 py-1">
          <CheckCircle2 className="h-4 w-4 text-primary" /> Réponse sous 24h
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-card px-2.5 py-1">
          <CheckCircle2 className="h-4 w-4 text-primary" /> Tarifs transparents
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-card px-2.5 py-1">
          <CheckCircle2 className="h-4 w-4 text-primary" /> Sans engagement
        </span>
      </div>

      {/* Compact device mockup with metrics */}
      <div className="mt-8">
        <div ref={mockRef} className="rounded-[20px] border bg-card p-4 shadow-sm">
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

      {/* Live code preview (real file) */}
      <LiveCode path="components/site/hero-typed.tsx" title="Code du Hero" />
      </div>
    </section>
  );
}