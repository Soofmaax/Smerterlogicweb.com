import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { track } from "@/lib/analytics";

export const metadata = {
  title: "Projets — smarterlogicweb.com",
  description: "Études de cas: simplicité, performance, conversion. Aperçu de réalisations Next.js.",
  alternates: { canonical: "/projets" },
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
    <div id={id} className="flex scroll-mt-28 flex-col rounded-xl border bg-card p-6">
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

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <CaseCard
          id="refonte-associatif"
          title="Refonte site associatif"
          tags={["Next.js", "Accessibilité", "SEO"]}
          description="Navigation clarifiée, contraste renforcé, score Lighthouse 95+. Trafic organique +40%."
        />
        <CaseCard
          id="site-vitrine-artisan"
          title="Site vitrine artisan"
          tags={["Next.js", "Tailwind", "Formulaire"]}
          description="Identité sobre, devis simplifié, génération de leads +30% en 2 mois."
        />
        <CaseCard
          id="optimisation-performance"
          title="Optimisation performance"
          tags={["Audit", "Web Vitals", "CDN"]}
          description="Chargement initial -50%, CLS maîtrisé, perception de rapidité accrue."
        />
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" className="rounded-full">
          <Link href="mailto:contact@smarterlogicweb.com?subject=Projet%20web%20-%20Brief" onClick={() => track("cta_devis_mailto_projets")}>
            Démarrer un projet
          </Link>
        </Button>
      </div>
    </section>
  );
}