import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { track } from "@/lib/analytics";

export const metadata = {
  title: "Services — smarterlogicweb.com",
  description:
    "Sites vitrines, refontes, optimisation, accompagnement continu: des services web simples, performants et orientés résultats.",
  alternates: {
    canonical: "/services",
    languages: {
      "fr-FR": "/services",
      "en-US": "/en/services",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/services",
    title: "Services — smarterlogicweb.com",
    description:
      "Sites vitrines, refontes, optimisation, accompagnement continu: des services web simples, performants et orientés résultats.",
  },
};

export default function ServicesPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="px-3 py-1">Offre</Badge>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Des sites sur-mesure, simples, performants, orientés résultats.
        </h1>
        <p className="mt-4 text-foreground/80">
          Je conçois des interfaces épurées, rapides, optimisées SEO, et faciles à maintenir. Vous vous concentrez sur votre activité, je m’occupe du reste.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div id="vitrine" className="rounded-xl border bg-card p-6 scroll-mt-28">
          <h3 className="font-heading text-xl font-semibold">Site vitrine rapide</h3>
          <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
            <li>Next.js + Tailwind CSS</li>
            <li>Pages clés: Accueil, Services, À propos, Contact</li>
            <li>SEO technique, performance Lighthouse</li>
            <li>Livraison 2–3 semaines</li>
          </ul>
        </div>
        <div id="refonte" className="rounded-xl border bg-card p-6 scroll-mt-28">
          <h3 className="font-heading text-xl font-semibold">Refonte & optimisation</h3>
          <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
            <li>Audit UX, accessibilité (WCAG), performance</li>
            <li>Nettoyage du design, hiérarchie visuelle</li>
            <li>Amélioration du référencement</li>
            <li>Migration vers Next.js si pertinent</li>
          </ul>
        </div>
        <div id="accompagnement" className="rounded-xl border bg-card p-6 scroll-mt-28">
          <h3 className="font-heading text-xl font-semibold">Accompagnement continu</h3>
          <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
            <li>Mises à jour, contenus, évolutions</li>
            <li>Optimisations A/B et suivi conversions</li>
            <li>Support prioritaire</li>
            <li>Forfait mensuel flexible</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" className="rounded-full">
          <Link href="mailto:contact@smarterlogicweb.com?subject=Devis%20services%20web" onClick={() => track("cta_devis_mailto_services")}>
            Obtenir mon devis gratuit
          </Link>
        </Button>
      </div>
    </section>
  );
}