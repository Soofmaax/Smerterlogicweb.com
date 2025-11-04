"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroTyped() {
  const title = "Votre site web freine votre croissance ?";
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

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

      {/* Title with typing effect */}
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

      <p className="mt-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
        Je crée des sites rapides et professionnels qui transforment vos visiteurs en clients.
      </p>

      <div className="mt-6">
        <Button asChild size="lg" variant="cta" className="w-full rounded-full md:w-auto">
          <Link href="/contact">Obtenir un devis gratuit en 24h</Link>
        </Button>
      </div>
    </section>
  );
}