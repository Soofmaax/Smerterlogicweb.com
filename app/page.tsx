import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroTyped } from "@/components/site/hero-typed";
import { PricingOffers } from "@/components/site/pricing-offers";
import { SeeTheDifference } from "@/components/site/see-the-difference";
import { PerformanceVisible } from "@/components/site/performance-visible";
import { TimelineProcess } from "@/components/site/timeline-process";
import { ExpertiseWhy } from "@/components/site/expertise-why";
import { TechnologiesGrid } from "@/components/site/technologies-grid";
import { FAQAccordion } from "@/components/site/faq-accordion";
import { ServicesAdaptation } from "@/components/site/services-adaptation";
import { Inclusions } from "@/components/site/inclusions";
import { AfterFirstYear } from "@/components/site/after-first-year";
import { WhyInvest } from "@/components/site/why-invest";
import { RealisationsGrid } from "@/components/site/realisations-grid";
import { TestimonialsSimple } from "@/components/site/testimonials-simple";
import { FinalCTA } from "@/components/site/final-cta";

export const metadata = {
  title: "Votre site web, enfin simple et performant.",
  description:
    "Je conçois et développe des sites web sur-mesure pour entrepreneurs et associations. Présence en ligne professionnelle, sans complexité.",
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/",
    title: "Votre site web, enfin simple et performant. — smarterlogicweb.com",
    description:
      "Sites web sur-mesure pour entrepreneurs et associations. Simple, performant, sans complexité — je m’occupe du reste.",
  },
};

export default function Page() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Subtle background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[35rem] w-[35rem] rounded-full bg-rose-300/10 blur-3xl" />
      </div>

      {/* New Hero with typing effect */}
      <HeroTyped />

      

      {/* Pourquoi mon expertise */}
      <ExpertiseWhy />

      {/* Pourquoi investir (Wix/WordPress vs sur-mesure) */}
      <WhyInvest />

      {/* Témoignages */}
      <TestimonialsSimple />

      {/* Offres & Tarifs */}
      <PricingOffers />

      {/* Section interactive — Voyez la Différence */}
      <SeeTheDifference />

      {/* Performances visibles */}
      <PerformanceVisible />

      {/* Processus de travail */}
      <TimelineProcess />

      {/* Ce qui est inclus / en option */}
      <Inclusions />

      {/* Après la première année */}
      <AfterFirstYear />

      {/* Technologies */}
      <TechnologiesGrid />

      {/* FAQ */}
      <FAQAccordion />

      {/* Services d'adaptation graphique */}
      <ServicesAdaptation />

      {/* CTA secondary */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-10">
        <div className="rounded-[28px] card-elevated border bg-card p-6">
          <h3 className="font-heading text-2xl font-semibold">Des solutions fiables, taillées pour vous.</h3>
          <p className="mt-2 text-foreground/80">
            Du site vitrine à l’optimisation de performance, en passant par l’accessibilité — je suis là pour vous aider.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full">
              <Link href="/contact">Discutons de votre projet</Link>
            </Button>
            <Link href="/engagement-associatif" className="group inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Heart size={16} className="transition-transform group-hover:scale-110" />
              <span>Découvrez mon engagement associatif</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA before footer */}
      <FinalCTA />

      {/* Mes Réalisations */}
      <RealisationsGrid />
    </div>
  );
}