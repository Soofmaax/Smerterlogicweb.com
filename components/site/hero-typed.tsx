"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Rocket } from "lucide-react";

export function HeroTyped() {
  // Business-card style hero lines
  const line1 = "SITE WEB";
  const line2 = "APPLICATIONS";
  const line3 = "DU PIXEL AU PAPIER";
  const tagline1 = "VOS RÊVES,";
  const tagline2 = "NOS ASTUCES !";
  const punchline = "Votre concurrent a déjà son site.";

  const [titleTyped, setTitleTyped] = React.useState("");
  const [showCaretTitle, setShowCaretTitle] = React.useState(true);

  // Primary CTA destination: phone > calendly > /contact
  const rawPhone = process.env.NEXT_PUBLIC_PHONE || "";
  const rawBooking = process.env.NEXT_PUBLIC_BOOKING_URL || "";
  const sanitizePhone = (p: string) => p.replace(/[^+\d]/g, "");
  const primaryHref = rawPhone ? `tel:${sanitizePhone(rawPhone)}` : rawBooking ? rawBooking : "/contact";
  const isInternal = primaryHref.startsWith("/");
  
  // Helper: treat mobile as reduced motion
  const isMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 768px)").matches;

  // Typewriter for main punchline
  React.useEffect(() => {
    const full = punchline;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isMobile());

    if (prefersReduced) {
      setTitleTyped(full);
      setShowCaretTitle(false);
      return;
    }

    let i = 0;
    const step = 45;
    const id = window.setInterval(() => {
      i += 1;
      setTitleTyped(full.slice(0, i));
      if (i >= full.length) {
        window.clearInterval(id);
        window.setTimeout(() => setShowCaretTitle(false), 800);
      }
    }, step);
    return () => window.clearInterval(id);
  }, [punchline]);

  

  return (
    <section className="relative mx-auto w-full max-w-5xl px-6 py-16 md:py-24 snap-start">
      {/* Subtle background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-70" />
      </div>

      <div className="relative z-10">
        {/* Top stacked lines, business-card style */}
        <div className="space-y-1">
          <div className="hero-title text-sm font-semibold tracking-[0.4em]">
            {line1}
          </div>
          <div className="hero-title text-sm font-semibold tracking-[0.4em]">
            {line2}
          </div>
          <div className="hero-title text-sm font-semibold tracking-[0.4em]">
            {line3}
          </div>
        </div>

        {/* Main punchline with typewriter */}
        <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
          <span className="block">
            {titleTyped || punchline}
          </span>
          <span className="block">
            Et vous ?
            {showCaretTitle && (
              <span
                className="ml-1 inline-block w-[2px] animate-pulse bg-foreground align-middle"
                style={{ height: "1em" }}
              />
            )}
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">
          {tagline1}
          <br />
          {tagline2}
        </p>

        

        {/* Primary CTA — simplifié, noir & blanc */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {isInternal ? (
            <Button
              asChild
              size="lg"
              variant="default"
              className="btn-lift rounded-full border border-foreground bg-foreground px-8 py-4 text-base font-semibold text-background hover:bg-foreground/90"
            >
              <Link href={primaryHref}>Parler de votre projet</Link>
            </Button>
          ) : (
            <Button
              asChild
              size="lg"
              variant="default"
              className="btn-lift rounded-full border border-foreground bg-foreground px-8 py-4 text-base font-semibold text-background hover:bg-foreground/90"
            >
              <a href={primaryHref} target="_blank" rel="noopener noreferrer">
                Parler de votre projet
              </a>
            </Button>
          )}
        </div>

        {/* Small note under CTA */}
        <div className="mt-2 text-xs text-muted-foreground">
          <span className="block">Sans engagement, réponse rapide.</span>
          <span className="block">On fait le point sur votre situation actuelle.</span>
        </div>

        {/* Récap visuel juste après le hero */}
        <div className="mt-6 grid gap-2 text-sm text-foreground/80 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2">
            <Clock className="h-4 w-4" />
            <span>Audit gratuit de votre site</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Devis détaillé sous 48 h</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2">
            <Rocket className="h-4 w-4" />
            <span>Site vitrine sur devis détaillé</span>
          </div>
        </div>
      </div>
    </section>
  );
}