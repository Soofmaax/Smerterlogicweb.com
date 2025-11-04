import Link from "next/link";
import { Heart } from "lucide-react";
import { StatsCard } from "@/components/site/stats-card";
import { statsFR } from "@/data/stats";
import { TrackedLink } from "@/components/site/tracked-link";
import { Carousel } from "@/components/site/carousel";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { HeroTyped } from "@/components/site/hero-typed";
import { PricingOffers } from "@/components/site/pricing-offers";
import { ServicesAdaptation } from "@/components/site/services-adaptation";
import { FinalCTA } from "@/components/site/final-cta";

export const metadata = {
  title: "Votre site web, enfin simple et performant.",
  description:
    "Je conçois et développe des sites web sur-mesure pour entrepreneurs et associations. Présence en ligne professionnelle, sans complexité.",
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
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
      {/* Subtle background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[35rem] w-[35rem] rounded-full bg-rose-300/10 blur-3xl" />
      </div>

      {/* New Hero with typing effect */}
      <HeroTyped />

      {/* Stats cards */}
      <section className="mx-auto w-full max-w-3xl px-6 py-2">
        <Reveal className="reveal-fade-up">
          <div className="grid gap-6 md:grid-cols-1">
            {statsFR.slice(0, 1).map((items, idx) => (
              <StatsCard key={idx} items={items} variant="light" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Vertical ticker (sobre) */}
      <section className="mx-auto w-full max-w-3xl px-6 py-4">
        <div className="rounded-[20px] border bg-muted/40 p-4">
          <Carousel
            orientation="vertical"
            autoplay
            intervalMs={3000}
            ariaLabel="Messages clés"
            items={[
              <div key="1" className="flex h-24 items-center justify-center text-center text-foreground/80">
                Sites clairs, rapides, durables.
              </div>,
              <div key="2" className="flex h-24 items-center justify-center text-center text-foreground/80">
                Accessibilité et performance dès le départ.
              </div>,
              <div key="3" className="flex h-24 items-center justify-center text-center text-foreground/80">
                Partenaire fiable pour votre croissance.
              </div>,
            ]}
          />
        </div>
      </section>

      {/* Discover card */}
      <section className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-4 md:p-6">
          <div className="overflow-hidden rounded-[20px] bg-gradient-to-tr from-rose-200 via-purple-200 to-indigo-200">
            <div className="h-40 md:h-56" />
          </div>
          <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            Découvrez ce qui est possible avec smarterlogicweb
          </h2>
          <p className="mt-3 text-foreground/80">
            Explorez la gamme complète de solutions et trouvez l’approche idéale pour votre activité.
          </p>
          <div className="mt-5">
            <Button asChild className="w-full rounded-full md:w-auto">
              <Link href="#tarifs">Voir les tarifs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Offres & Tarifs */}
      <PricingOffers />

      {/* Services d'adaptation graphique */}
      <ServicesAdaptation />

      {/* CTA secondary */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-10">
        <div className="rounded-[28px] card-elevated border bg-card p-6">
          <h3 className="font-heading text-2xl font-semibold">Des solutions fiables, taillées pour vous.</h3>
          <p className="mt-2 text-foreground/80">
            Du site vitrine à l’optimisation de performance, en passant par l’accessibilité — je suis là pour vous aider.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full">
              <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Devis%20gratuit" eventName="cta_devis_mailto_hero">
                Obtenir mon devis gratuit
              </TrackedLink>
            </Button>
            <Link href="/engagement-associatif" className="group inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Heart size={16} className="transition-transform group-hover:scale-110" />
              <span>Découvrez mon engagement associatif</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA before footer */}
      <FinalCTA />

      {/* Partners logos block — horizontal carousel */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-10">
        <Reveal className="reveal-clip block">
          <div className="overflow-hidden rounded-[28px] card-elevated border p-6 bg-card">
            <h3 className="text-center font-heading text-2xl font-semibold md:text-3xl">
              Des solutions de confiance, adaptées à vous.
            </h3>
            <p className="mt-2 text-center text-foreground/70">
              Rejoignez nos futurs partenaires et clients satisfaits.
            </p>

            {/* Carousel */}
            <div className="mt-6">
              <Carousel
                orientation="horizontal"
                autoplay
                intervalMs={3500}
                ariaLabel="Logos partenaires"
                items={[
                  "Votre logo",
                  "Client A",
                  "Client B",
                  "Client C",
                  "Client D",
                  "Client E",
                  "Client F",
                  "Client G",
                ].map((name) => (
                  <div
                    key={name}
                    className="flex h-16 items-center justify-center rounded-2xl bg-white/70 text-sm font-medium text-foreground/60 ring-1 ring-black/5 dark:bg-white/5 dark:text-white/70"
                    aria-label={`Logo ${name}`}
                  >
                    {name}
                  </div>
                ))}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Resources — horizontal carousel */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-20">
        <Reveal className="reveal-clip block">
          <div className="overflow-hidden rounded-[28px] card-elevated border p-6 bg-card">
            <h3 className="text-center font-heading text-2xl font-semibold md:text-3xl">
              Ressources récentes
            </h3>
            <p className="mt-2 text-center text-foreground/70">
              Conseils clairs pour améliorer votre site et vos conversions.
            </p>
            <div className="mt-6">
              <Carousel
                orientation="horizontal"
                autoplay
                intervalMs={3800}
                ariaLabel="Ressources"
                items={[
                  {
                    title: "Optimiser Core Web Vitals",
                    category: "Performance",
                  },
                  {
                    title: "Accessibilité: 10 points clés",
                    category: "A11y",
                  },
                  {
                    title: "SEO technique avec Next.js",
                    category: "SEO",
                  },
                  {
                    title: "Refonte: par où commencer",
                    category: "UX",
                  },
                  {
                    title: "Formulaires qui convertissent",
                    category: "Conversion",
                  },
                ].map((r, i) => (
                  <article key={i} className="rounded-[20px] border bg-card p-5 transition hover:shadow-md focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/60">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{r.category}</div>
                    <h4 className="mt-2 font-heading text-lg font-semibold">{r.title}</h4>
                    <p className="mt-2 text-sm text-foreground/70">Lecture rapide — meilleures pratiques applicables.</p>
                    <a href="#" className="link-underline mt-3 inline-block rounded text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
                      Lire
                    </a>
                  </article>
                ))}
              />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}