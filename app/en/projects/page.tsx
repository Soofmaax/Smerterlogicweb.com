import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/site/carousel";
import { TrackedLink } from "@/components/site/tracked-link";

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
  const items = [
    <CaseCard
      key="refonte-associatif"
      id="refonte-associatif"
      title="Nonprofit redesign"
      tags={["Next.js", "Accessibility", "SEO"]}
      description="Clearer navigation, stronger contrast, Lighthouse 95+. +40% organic traffic."
    />,
    <CaseCard
      key="site-vitrine-artisan"
      id="site-vitrine-artisan"
      title="Artisan showcase site"
      tags={["Next.js", "Tailwind", "Form"]}
      description="Sober identity, simplified quotes, +30% lead gen in 2 months."
    />,
    <CaseCard
      key="optimisation-performance"
      id="optimisation-performance"
      title="Performance optimisation"
      tags={["Audit", "Web Vitals", "CDN"]}
      description="−50% initial load, stable CLS, faster perceived speed."
    />,
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Case studies
        </h1>
        <p className="mt-4 text-foreground/80">
          Sober, fast and conversion‑oriented interfaces. Here’s what I build.
        </p>
      </div>

      {/* Premium horizontal carousel for case studies */}
      <div className="mt-10">
        <Carousel items={items} orientation="horizontal" autoplay intervalMs={4500} ariaLabel="Case studies" />
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" className="rounded-full">
          <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Web%20project%20-%20Brief" eventName="cta_devis_mailto_projets">
            Start a project
          </TrackedLink>
        </Button>
      </div>
    </section>
  );
}