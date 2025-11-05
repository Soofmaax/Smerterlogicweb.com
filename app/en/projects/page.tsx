import { Button } from "@/components/ui/button";
import { ProjectsShowcase } from "@/components/site/projects-showcase";
import { ProjectsCases } from "@/components/site/projects-cases";
import { RightDotsNav } from "@/components/site/right-dots-nav";
import { TrackedLink } from "@/components/site/tracked-link";
import { Reveal } from "@/components/site/reveal";
import { projectsEN } from "@/data/projects";
import { BookingButton } from "@/components/site/booking-modal";
import { Particles } from "@/components/site/particles";
import { FinalCTA } from "@/components/site/final-cta";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";

export const metadata = {
  title: "Projects — smarterlogicweb.com",
  description: "Case studies: simplicity, performance, conversion. A glimpse of Next.js work.",
  alternates: {
    canonical: "/en/projects",
    languages: {
      "en-US": "/en/projects",
      "fr-FR": "/projets",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/projects",
    title: "Projects — smarterlogicweb.com",
    description:
      "Case studies: simplicity, performance, conversion.",
  },
};

export default function ProjectsPage() {
  const showcaseItems = projectsEN.showcase;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      <RightDotsNav
        sections={[
          { id: "showcase", label: "Showcase" },
          { id: "cases", label: "Cases" },
          { id: "cta", label: "Contact" },
        ]}
        ariaLabel="Sections navigation"
      />
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="reveal-clip inline-block">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">
            Case studies
          </h1>
        </Reveal>
        <p className="mt-4 text-foreground/80">
          Sober, fast and conversion‑oriented interfaces. Here’s what I build.
        </p>
      </div>

      {/* Sticky nav */}
      <div className="mt-6 hidden md:flex justify-center">
        <nav aria-label="Sections" className="sticky top-24 inline-flex gap-2 rounded-full border bg-card p-2 shadow-sm">
          <a href="#showcase" className="rounded-full px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">Showcase</a>
          <a href="#cases" className="rounded-full px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">Cases</a>
          <a href="#cta" className="rounded-full px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">Contact</a>
        </nav>
      </div>

      {/* Full-width visual banner with reveal (sober) */}
      <Reveal className="reveal-clip mt-8 block">
        <div className="h-44 w-full rounded-[28px] border bg-gradient-to-br from-[#22232a] via-[#1c1e24] to-[#171921] md:h-64" />
      </Reveal>

      {/* Premium app-shell style showcase band */}
      <section id="showcase" className="scroll-mt-28 mt-10">
        <ProjectsShowcase items={showcaseItems} locale="en" />
      </section>

      {/* Case studies with zoom + details */}
      <section id="cases" className="scroll-mt-28 mt-10">
        <ProjectsCases items={projectsEN.cases} locale="en" />
      </section>

      <section id="cta" className="scroll-mt-28 mt-10">
        <div className="flex flex-col items-center gap-3 justify-center">
          <BookingButton className="rounded-full" size="lg" label="Book my free audit (15 min)" />
          <Button asChild size="lg" className="rounded-full">
            <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Web%20project%20-%20Brief" eventName="cta_devis_mailto_projets">
              Start a project
            </TrackedLink>
          </Button>
          <div className="mt-2">
            <GoogleReviewsBadge />
          </div>
        </div>
      </section>

      <FinalCTA />
    </section>
  );
}