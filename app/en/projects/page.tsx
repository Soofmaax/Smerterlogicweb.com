import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/site/carousel";
import { ProjectsShowcase } from "@/components/site/projects-showcase";
import { TrackedLink } from "@/components/site/tracked-link";
import { Reveal } from "@/components/site/reveal";
import { projectsEN } from "@/data/projects";

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

function CaseCard({
  id,
  title,
  tags,
  description,
}: {
  id?: string;
  title: string;
  tags: string[];
  description: string;
}) {
  return (
    <div id={id} className="flex scroll-mt-28 flex-col rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((t) => (
          <Badge key={t} variant="outline">
            {t}
          </Badge>
        ))}
      </div>
      <h3 className="mt-3 font-heading text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-foreground/80">{description}</p>
    </div>
  );
}



export default function ProjectsPage() {
  const items = projectsEN.cases.map((c) => (
    <CaseCard
      key={c.id}
      id={c.id}
      title={c.title}
      tags={c.tags}
      description={c.description}
    />
  ));

  const showcaseItems = projectsEN.showcase;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="reveal-clip inline-block">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
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

      {/* Premium horizontal carousel for case studies */}
      <section id="cases" className="scroll-mt-28 mt-10">
        <Carousel items={items} orientation="horizontal" autoplay intervalMs={4500} ariaLabel="Case studies" />
      </section>

      <section id="cta" className="scroll-mt-28 mt-10">
        <div className="flex justify-center">
          <Button asChild size="lg" className="rounded-full">
            <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Web%20project%20-%20Brief" eventName="cta_devis_mailto_projets">
              Start a project
            </TrackedLink>
          </Button>
        </div>
      </section>
    </section>
  );
}