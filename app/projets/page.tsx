import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/site/carousel";
import { TrackedLink } from "@/components/site/tracked-link";

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

function ShowcaseSlide({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-[28px] border bg-card p-6 card-elevated">
      {/* faux mockups empilés (browser / tablet / mobile) */}
      <div className="relative mx-auto h-56 w-full max-w-4xl">
        {/* browser */}
        <div className="absolute inset-x-4 top-0 h-40 rounded-2xl border bg-gradient-to-br from-[#22232a] via-[#1c1e24] to-[#171921] shadow-sm">
          <div className="flex items-center gap-1 border-b border-white/10 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <div className="ml-3 h-4 flex-1 rounded bg-white/10" />
          </div>
          <div className="p-4">
            <div className="h-3 w-2/3 rounded bg-white/10" />
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="h-16 rounded bg-white/10" />
              <div className="h-16 rounded bg-white/10" />
              <div className="h-16 rounded bg-white/10" />
            </div>
          </div>
        </div>
        {/* tablet */}
        <div className="absolute left-6 top-16 h-28 w-52 rounded-2xl border bg-gradient-to-br from-[#22232a] via-[#1c1e24] to-[#171921] shadow">
          <div className="m-3 h-3 w-1/2 rounded bg-white/10" />
          <div className="mx-3 mt-3 h-14 rounded bg-white/10" />
        </div>
        {/* mobile */}
        <div className="absolute right-8 top-10 h-28 w-16 rounded-2xl border bg-gradient-to-br from-[#22232a] via-[#1c1e24] to-[#171921] shadow">
          <div className="m-2 h-2 w-10 rounded bg-white/10" />
          <div className="mx-2 mt-2 h-16 rounded bg-white/10" />
        </div>
      </div>

      <div className="mt-6 text-center">
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-foreground/70">{subtitle}</p>
      </div>
    </div>
  );
}

export default function ProjetsPage() {
  const items = [
    <CaseCard
      key="refonte-associatif"
      id="refonte-associatif"
      title="Refonte site associatif"
      tags={["Next.js", "Accessibilité", "SEO"]}
      description="Navigation clarifiée, contraste renforcé, score Lighthouse 95+. Trafic organique +40%."
    />,
    <CaseCard
      key="site-vitrine-artisan"
      id="site-vitrine-artisan"
      title="Site vitrine artisan"
      tags={["Next.js", "Tailwind", "Formulaire"]}
      description="Identité sobre, devis simplifié, génération de leads +30% en 2 mois."
    />,
    <CaseCard
      key="optimisation-performance"
      id="optimisation-performance"
      title="Optimisation performance"
      tags={["Audit", "Web Vitals", "CDN"]}
      description="Chargement initial -50%, CLS maîtrisé, perception de rapidité accrue."
    />,
  ];

  const showcase = [
    <ShowcaseSlide
      key="slide-1"
      title="Site vitrine B2B"
      subtitle="Sobriété, clarté, conversion — multi‑device responsive"
    />,
    <ShowcaseSlide
      key="slide-2"
      title="Association — accessibilité"
      subtitle="Contrastes, navigation clavier, lisibilité AA/AAA"
    />,
    <ShowcaseSlide
      key="slide-3"
      title="Performance — Web Vitals"
      subtitle="First load optimisé, images responsive, mise en cache"
    />,
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Études de cas
        </h1>
        <p className="mt-4 text-foreground/80">
          Des interfaces sobres, rapides et orientées conversion. Voici des exemples de ce que je réalise.
        </p>
      </div>

      {/* Bandeau Showcase style "app shell" premium */}
      <div className="mt-10">
        <Carousel items={showcase} orientation="horizontal" autoplay intervalMs={4200} ariaLabel="Showcase réalisations" />
      </div>

      {/* Carousel premium horizontal pour les cas */}
      <div className="mt-10">
        <Carousel items={items} orientation="horizontal" autoplay intervalMs={4500} ariaLabel="Études de cas" />
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" className="rounded-full">
          <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Projet%20web%20-%20Brief" eventName="cta_devis_mailto_projets">
            Démarrer un projet
          </TrackedLink>
        </Button>
      </div>
    </section>
  );
}