"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroTyped() {
  const title = "Sites Web Performants pour Artisans et Entreprises Locales";
  const phrase = "Rapide. Performant. Professionnel.";
  const [mounted, setMounted] = React.useState(false);
  const [typed, setTyped] = React.useState("");

  React.useEffect(() => setMounted(true), []);

  // Simple typed effect for the phrase (50ms per character)
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(phrase.slice(0, i + 1));
      i++;
      if (i >= phrase.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <section className="relative mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      {/* Animated background behind hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-70" />
      </div>

      {/* Small badge */}
      <div className="mb-6">
        <span className="inline-flex rounded-full border border-foreground/15 bg-card px-3 py-1 text-sm text-foreground/80">
          Studio web
        </span>
      </div>

      {/* Title with fade-in typing (per character) */}
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

      {/* Subheading with typed phrase */}
      <p className="mt-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
        Des sites statiques ultra-rapides, optimisés pour Google et conçus pour convertir vos visiteurs en clients.
        {" "}
        <span className="font-semibold text-foreground">{typed}</span>
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" variant="cta" className="rounded-full">
          <Link href="/contact">Discutons de votre projet</Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="rounded-full">
          <Link href="/projets">Voir mes réalisations</Link>
        </Button>
      </div>
    </section>
  );
}