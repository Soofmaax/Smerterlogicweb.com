"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroTypedEN() {
  const title = "Your current website is costing you 15 clients every month.";
  const [shouldAnimate, setShouldAnimate] = React.useState(false);
  React.useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const isMobile = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;
    setShouldAnimate(!(prefersReduced || isMobile));
  }, []);

  const charTyping = (delayPerChar = 0.05) => ({
    hidden: { opacity: 0 },
    show: (i: number) => ({
      opacity: 1,
      transition: { delay: i * delayPerChar, duration: 0.001 },
    }),
  });

  return (
    <section className="relative mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-70" />
      </div>

      <div className="mb-6">
        <span className="inline-flex rounded-full border border-foreground/15 bg-card px-3 py-1 text-sm text-foreground/80">
          Web studio
        </span>
      </div>

      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
        {title.split("").map((ch, i) => (
          <motion.span
            key={`ch-en-${i}-${ch}`}
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
        We build websites that generate qualified leads 24/7. Our clients get +127% more inquiries in 90 days.
      </p>

      <div className="mt-6">
        <Button asChild size="lg" variant="cta" className="w-full rounded-full md:w-auto">
          <Link href="/en/contact">Get a free quote in 24h</Link>
        </Button>
      </div>
    </section>
  );
}