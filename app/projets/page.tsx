import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { projectsFR } from "@/data/projects";
import { ProjectsGrid } from "@/components/site/projects-grid";
import { ProjectsStats } from "@/components/site/projects-stats";
import { StickyMobileCTA } from "@/components/site/sticky-mobile-cta";
import { BookingButton } from "@/components/site/booking-modal";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";

export const metadata = {
  title: "Projets — smarterlogicweb.com",
  description: "6 sites créés, 6 entreprises qui attirent plus de clients. Études de cas mesurables.",
  alternates: {
    canonical: "/projets",
    languages: {
      "fr-FR": "/projets",
      "en-US": "/en/projects",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/projets",
    title: "Projets — smarterlogicweb.com",
    description:
      "6 sites créés, 6 entreprises qui attirent plus de clients.",
  },
};

export default function ProjetsPage() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* Hero ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="reveal-clip inline-block">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">
            Ils M&apos;ont Fait Confiance
          </h1>
        </Reveal>
        <p className="mt-4 text-foreground/80">
          6 sites créés, 6 entreprises qui attirent plus de clients.
        </p>
      </div>

      {/* Grid + filters */}
      <div className="mt-10">
        <ProjectsGrid items={projectsFR.cases} />
      </div>

      {/* Stats globales */}
      <div className="mt-8">
        <ProjectsStats />
      </div>

      {/* CTA final */}
      <section className="mx-auto mt-2 w-full max-w-5xl px-0 py-12">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Votre Projet Sera Le Prochain</h2>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookingButton className="rounded-full" size="lg" label="Réserver mon audit gratuit (15 min)" />
            <Button asChild className="rounded-full" variant="secondary">
              <Link href="/#tarifs">Voir les tarifs</Link>
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <GoogleReviewsBadge />
          </div>
        </div>
      </section>

      {/* Final CTA global */}
      <FinalCTA />

      {/* Sticky CTA mobile */}
      <StickyMobileCTA />
    </section>
  );
}