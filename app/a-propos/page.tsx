import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { track } from "@/lib/analytics";

export const metadata = {
  title: "À propos — smarterlogicweb.com",
  description: "Développeuse front-end — simplicité, performance et exigence au service de votre présence en ligne.",
  alternates: {
    canonical: "/a-propos",
    languages: {
      "fr-FR": "/a-propos",
      "en-US": "/en/about",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/a-propos",
    title: "À propos — smarterlogicweb.com",
    description:
      "Développeuse front-end — simplicité, performance et exigence au service de votre présence en ligne.",
  },
};

export default function AProposPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <Badge variant="secondary" className="px-3 py-1">À propos</Badge>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Bonjour, moi c’est Sarah — développeuse front-end.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/80">
          J’aide entrepreneurs et associations à obtenir une présence en ligne claire, professionnelle
          et performante. Mon approche: design sobre, code propre, focus conversion.
        </p>
        <p className="mt-4 text-foreground/80">
          J’utilise Next.js, Tailwind CSS et une bibliothèque de composants compacte pour livrer vite et bien.
          Chaque projet est conçu pour être rapide, accessible et facile à faire évoluer.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <Button asChild className="rounded-full">
            <Link href="mailto:contact@smarterlogicweb.com?subject=Projet%20web" onClick={() => track("cta_devis_mailto_apropos")}>Obtenir mon devis gratuit</Link>
          </Button>
          <Link href="/projets" className="text-sm text-muted-foreground hover:text-foreground">
            Voir des projets
          </Link>
        </div>
      </div>
    </section>
  );
}