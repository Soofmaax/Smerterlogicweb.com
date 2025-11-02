import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { track } from "@/lib/analytics";

export const metadata = {
  title: "Votre site web, enfin simple et performant.",
  description:
    "Je conçois et développe des sites web sur-mesure pour entrepreneurs et associations. Présence en ligne professionnelle, sans complexité.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://smarterlogicweb.com/",
    title: "Votre site web, enfin simple et performant. — smarterlogicweb.com",
    description:
      "Sites web sur-mesure pour entrepreneurs et associations. Simple, performant, sans complexité — je m’occupe du reste.",
  },
};

export default function Page() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Subtle, premium background accents (non-distracting) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[35rem] w-[35rem] rounded-full bg-rose-300/10 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center px-6 py-24 text-center md:py-32">
        <div className="mb-6">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            Développeuse passionnée
          </Badge>
        </div>

        <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          Votre site web, enfin simple et performant.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
          Je conçois et développe des sites web sur-mesure pour les entrepreneurs et associations qui veulent une
          présence en ligne professionnelle, sans la complexité technique. Concentrez-vous sur votre métier, je
          m&apos;occupe du reste.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Button
            asChild
            size="lg"
            variant="default"
            className="h-12 rounded-full px-7 text-base font-medium transition-transform duration-200 hover:scale-105"
          >
            <Link
              href="mailto:contact@smarterlogicweb.com?subject=Devis%20gratuit%20-%20Nouveau%20projet"
              onClick={() => track("cta_devis_mailto_hero")}
            >
              Obtenir mon devis gratuit
            </Link>
          </Button>

          <Link
            href="/engagement-associatif"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Heart size={16} className="transition-transform group-hover:scale-110" />
            <span>Découvrez mon engagement associatif</span>
          </Link>
        </div>
      </section>
    </div>
  );
}