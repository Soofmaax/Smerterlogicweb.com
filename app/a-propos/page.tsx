import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { MagneticZone } from "@/components/site/magnetic";
import { StickyMobileCTA } from "@/components/site/sticky-mobile-cta";
import { CheckCircle2, Handshake, Gauge } from "lucide-react";
import { BookingButton } from "@/components/site/booking-modal";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";
import { Guarantee } from "@/components/site/guarantee";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";

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
    <section className="relative mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      {/* Hero ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Section 1 — Hero */}
      <div className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <Badge variant="secondary" className="px-3 py-1">À propos</Badge>
        <Reveal as="h1" className="h2-underline mt-4 inline-block font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Une Développeuse à Votre Écoute
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-4 text-lg leading-relaxed text-foreground/80">
            Passionnée par le web et l&apos;accompagnement des entreprises locales
          </p>
        </Reveal>
      </div>

      {/* Section photo + histoire */}
      <div className="mt-10 grid gap-6 md:grid-cols-[220px,1fr]">
        {/* Photo placeholder with hover zoom */}
        <div className="rounded-[20px] border bg-card p-4 text-center">
          <div className="mx-auto h-40 w-40 overflow-hidden rounded-full shadow transition duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-200 to-emerald-200 text-3xl font-semibold text-foreground/80 dark:from-white/10 dark:via-white/10 dark:to-white/5">
              S
            </div>
          </div>
          <div className="mt-3 text-sm text-muted-foreground">Sonia — Front‑end</div>
        </div>
        {/* Story */}
        <div className="rounded-[20px] border bg-card p-6">
          <Reveal className="reveal-fade-up">
            <p className="text-foreground/80">
              Je m&apos;appelle Sonia, développeuse front-end spécialisée dans la création de sites web pour artisans et TPE.
              Après avoir constaté que beaucoup d&apos;entreprises locales perdaient des clients faute de présence en ligne claire et professionnelle,
              j&apos;ai décidé de me concentrer sur ce secteur. Mon approche ? Transformer la technique en quelque chose de simple.
              Vous ne devez pas comprendre le code pour avoir un site performant.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Section 3 — Mes valeurs */}
      <div className="mt-10">
        <Reveal as="h2" className="h2-underline font-heading text-3xl font-semibold md:text-4xl">Mes Valeurs</Reveal>
        <Reveal className="reveal-fade-up">
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { title: "Transparence", desc: "Tarifs clairs dès le départ. Pas de frais cachés, pas de jargon." },
              { title: "Accompagnement", desc: "Formation à la gestion de vos contenus. Je reste disponible après la livraison." },
              { title: "Performance", desc: "Sites rapides, visibles sur Google, qui vous amènent des clients." },
            ].map((v, i) => (
              <div key={v.title} className="rounded-[20px] card-elevated border bg-card p-5" style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                    {i === 0 ? <Handshake className="h-5 w-5" /> : i === 1 ? <CheckCircle2 className="h-5 w-5" /> : <Gauge className="h-5 w-5" />}
                  </span>
                  <h3 className="font-heading text-lg font-semibold">{v.title}</h3>
                </div>
                <p className="mt-2 text-sm text-foreground/80">{v.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Garantie de résultat */}
      <div className="mt-10">
        <Guarantee />
      </div>

      {/* Section 4 — Pourquoi me choisir */}
      <div className="mt-10 rounded-[20px] border bg-card p-6">
        <Reveal as="h2" className="h2-underline font-heading text-3xl font-semibold md:text-4xl">Pourquoi me choisir</Reveal>
        <Reveal className="reveal-fade-up">
          <ul className="mt-4 list-disc pl-6 text-foreground/80">
            <li>Je parle clair et je simplifie la technique pour vous concentrer sur l’essentiel.</li>
            <li>Un accompagnement sérieux : performance, accessibilité, SEO dès le départ.</li>
            <li>Un site pensé pour générer des contacts et vous faire gagner du temps.</li>
          </ul>
        </Reveal>
      </div>

      {/* Section 5 — CTA final */}
      <div className="mt-10 rounded-[28px] card-elevated border bg-primary/5 p-6">
        <Reveal as="h2" className="h2-underline font-heading text-2xl font-semibold">Prêt à Donner à Votre Entreprise le Site qu&apos;elle Mérite ?</Reveal>
        <MagneticZone>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
            <BookingButton size="lg" className="rounded-full" label="Réserver mon audit gratuit (15 min)" />
            <Button asChild size="lg" variant="secondary" className="rounded-full" data-magnetic="true">
              <Link href="/contact">Obtenir mon devis gratuit</Link>
            </Button>
          </div>
        </MagneticZone>
        <div className="mt-4 flex items-center justify-center">
          <GoogleReviewsBadge />
        </div>
      </div>

      {/* Lien projets */}
      <div className="mt-6 text-center">
        <Link href="/projets" className="link-underline link-underline-strong text-sm text-primary">Voir des réalisations</Link>
      </div>

      {/* Final CTA global */}
      <FinalCTA />

      {/* Sticky CTA mobile */}
      <StickyMobileCTA />
    </section>
  );
}