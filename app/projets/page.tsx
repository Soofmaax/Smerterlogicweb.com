import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/site/carousel";
import { ProjectsShowcase } from "@/components/site/projects-showcase";
import { TrackedLink } from "@/components/site/tracked-link";
import { Reveal } from "@/components/site/reveal";
import { projectsFR } from "@/data/projects";

export const metadata = {
  title: "Projets — smarterlogicweb.com",
  description: "Études de cas: simplicité, performance, conversion. Aperçu de réalisations Next.js.",
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
      "Études de cas: simplicité, performance, conversion. Aperçu de réalisations Next.js.",
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



export default function ProjetsPage() {
  const items = projectsFR.cases.map((c) => (
    <CaseCard
      key={c.id}
      id={c.id}
      title={c.title}
      tags={c.tags}
      description={c.description}
    />
  ));

  const showcaseItems = projectsFR.showcase;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="reveal-clip inline-block">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Études de cas
          </h1>
        </Reveal>
        <p className="mt-4 text-foreground/80">
          Des interfaces sobres, rapides et orientées conversion. Voici des exemples de ce que je réalise.
        </p>
      </div>

      {/* Nav sticky */}
      <div className="mt-6 hidden md:flex justify-center">
        <nav aria-label="Sections" className="sticky top-24 inline-flex gap-2 rounded-full border bg-card p-2 shadow-sm">
          <a href="#showcase" className="rounded-full px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">Showcase</a>
          <a href="#etudes" className="rounded-full px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">Études</a>
          <a href="#cta" className="rounded-full px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">Contact</a>
        </nav>
      </div>

      {/* Bandeau visuel plein cadre avec reveal (sobre) */}
      <Reveal className="reveal-clip mt-8 block">
        <div className="h-44 w-full rounded-[28px] border bg-gradient-to-br from-[#22232a] via-[#1c1e24] to-[#171921] md:h-64" />
      </Reveal>

      {/* Bandeau Showcase style "app shell" premium */}
      <section id="showcase" className="scroll-mt-28 mt-10">
        <ProjectsShowcase items={showcaseItems} locale="fr" />
      </section>

      {/* Carousel premium horizontal pour les cas */}
      <section id="etudes" className="scroll-mt-28 mt-10">
        <Carousel items={items} orientation="horizontal" autoplay intervalMs={4500} ariaLabel="Études de cas" />
      </section>

      <section id="cta" className="scroll-mt-28 mt-10">
        <div className="flex justify-center">
          <Button asChild size="lg" className="rounded-full">
            <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Projet%20web%20-%20Brief" eventName="cta_devis_mailto_projets">
              Démarrer un projet
            </TrackedLink>
          </Button>
        </div>
      </section>
    </section>
  );
}