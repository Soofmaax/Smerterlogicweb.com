import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Engagement associatif — smarterlogicweb.com",
  description:
    "Mon engagement associatif: aider des projets à impact grâce au web. Mentorat, refontes accessibles, optimisation de la performance.",
};

export default function EngagementAssociatifPage() {
  return (
    <div className="relative">
      <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-4 flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            Engagement
          </Badge>
          <Heart className="h-4 w-4 text-secondary" />
        </div>

        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Donner du sens au web par l’action associative.
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-foreground/80">
          J’accompagne des associations et initiatives citoyennes pour rendre leurs sites plus clairs, plus inclusifs
          et plus performants. Mon objectif: amplifier leur impact en ligne avec des interfaces simples, accessibles et
          rapides.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-heading text-xl font-semibold">Refonte accessible</h3>
            <p className="mt-2 text-foreground/80">
              Structure claire, contrastes, navigation clavier, contenus lisibles: des sites plus inclusifs pour tous.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-heading text-xl font-semibold">Performance & SEO</h3>
            <p className="mt-2 text-foreground/80">
              Pages rapides, meilleur référencement, plus de visibilité pour les causes qui comptent.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href="mailto:contact@smarterlogicweb.com?subject=Projet%20associatif">
              Parlez-moi de votre projet
            </Link>
          </Button>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Retour à l’accueil
          </Link>
        </div>
      </section>
    </div>
  );
}