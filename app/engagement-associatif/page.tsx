import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { MagneticZone } from "@/components/site/magnetic";
import { BadgeCheck, GraduationCap, Users } from "lucide-react";
import { AssociationsGrid } from "@/components/site/associations-grid";
import { BookingButton } from "@/components/site/booking-modal";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";
import { Guarantee } from "@/components/site/guarantee";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";

export const metadata = {
  title: "Engagement — smarterlogicweb.com",
  description:
    "Le web au service de tous : 1 association / mois avec site offert, tarifs solidaires pour les autres. Tarifs justes, transmission et proximité.",
  alternates: {
    canonical: "/engagement-associatif",
    languages: {
      "fr-FR": "/engagement-associatif",
      "en-US": "/en/nonprofit-commitment",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/engagement-associatif",
    title: "Engagement — smarterlogicweb.com",
    description:
      "Le web au service de tous : 1 association / mois avec site offert, tarifs solidaires pour les autres. Tarifs justes, transmission et proximité.",
  },
};

export default function EngagementAssociatifPage() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="px-3 py-1">Engagement</Badge>
        <Reveal className="reveal-fade-up">
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">Le Web au Service de Tous</h1>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-4 text-foreground/80">
            Parce qu&apos;une présence en ligne ne devrait pas être un luxe réservé aux grandes entreprises.
          </p>
        </Reveal>
      </div>

      {/* Vision */}
      <div className="mx-auto mt-10 max-w-4xl">
        <Reveal className="reveal-fade-up">
          <article className="rounded-[24px] border bg-card p-6">
            <h2 className="h2-underline inline-block font-heading text-3xl font-semibold md:text-4xl">Pourquoi Cet Engagement</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              J&apos;ai créé smarterlogicweb avec une conviction : chaque artisan, commerce local ou association mérite un site web professionnel.
              Trop souvent, les petites structures sont exclues du numérique à cause de prix prohibitifs ou d&apos;un discours trop technique.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              Mon engagement : rendre le web accessible avec tarifs transparents, accompagnement humain, zéro jargon.
            </p>
          </article>
        </Reveal>
      </div>

      {/* Programme associatif */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Reveal className="reveal-fade-up md:col-span-2">
          <article className="program-highlight rounded-[24px] border bg-card p-6">
            <div className="flex items-center gap-2">
              <span className="badge-free inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                GRATUIT
              </span>
              <h3 className="font-heading text-xl font-semibold">1 Association, 1 Site Gratuit Chaque Mois</h3>
            </div>
            <p className="mt-2 text-sm text-foreground/80">
              Chaque mois, je choisis une association d&apos;intérêt général et je réalise son site web gratuitement. Un site professionnel complet, sans contrepartie.
            </p>
            <p className="mt-2 text-sm text-foreground/80">
              Vous portez un projet associatif qui mérite d&apos;exister en ligne ? Candidatez pour être l&apos;association du mois.
            </p>
            <div className="mt-4">
              <Button asChild className="rounded-full btn-lift" variant="cta">
                <Link href="/candidature-association">Candidater gratuitement</Link>
              </Button>
            </div>
          </article>
        </Reveal>

        <Reveal className="reveal-fade-up">
          <article className="rounded-[24px] border bg-card p-6">
            <h3 className="font-heading text-xl font-semibold">Vous Ne Pouvez Pas Attendre ?</h3>
            <p className="mt-2 text-sm text-foreground/80">
              Si votre association a besoin d&apos;un site rapidement, je propose des tarifs solidaires très accessibles. Le prix ne doit pas être un frein à votre mission.
            </p>
            <div className="mt-4">
              <Button asChild className="rounded-full btn-lift" variant="secondary">
                <Link href="mailto:contact@smarterlogicweb.com?subject=Tarif%20solidaire%20-%20Association">Demander un tarif solidaire</Link>
              </Button>
            </div>
          </article>
        </Reveal>
      </div>

      {/* Mes Engagements */}
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: <BadgeCheck className="h-5 w-5" />,
            title: "Tarifs Justes et Transparents",
            desc: "Prix fixes dès le départ. Pas de frais cachés. Formules pensées pour être accessibles.",
          },
          {
            icon: <GraduationCap className="h-5 w-5" />,
            title: "Transmission de Compétences",
            desc: "Formation incluse. Vous devenez autonome sur votre site. Le code vous appartient.",
          },
          {
            icon: <Users className="h-5 w-5" />,
            title: "Local et Humain",
            desc: "Priorité aux entreprises locales et circuits courts. Accompagnement personnalisé, pas de process industriel.",
          },
        ].map((c, i) => (
          <Reveal key={i} className="reveal-fade-up">
            <article
              className="rounded-[20px] card-elevated border bg-card p-6"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                {c.icon}
              </div>
              <h3 className="mt-3 font-heading text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-foreground/80">{c.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Associations accompagnées */}
      <div className="mt-12">
        <Reveal className="reveal-fade-up">
          <h2 className="h2-underline inline-block font-heading text-3xl font-semibold md:text-4xl">Ils Ont Bénéficié du Programme</h2>
        </Reveal>
        <div className="mt-6">
          <AssociationsGrid />
        </div>
      </div>

      {/* Critères de sélection */}
      <div className="mt-12">
        <Reveal className="reveal-fade-up">
          <article className="rounded-[24px] border bg-card p-6">
            <h2 className="font-heading text-2xl font-semibold">Comment Je Choisis l&apos;Association du Mois</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>• Projet d&apos;intérêt général authentique</li>
              <li>• Impact local ou social significatif</li>
              <li>• Besoin réel d&apos;une présence web</li>
              <li>• Équipe motivée et disponible pour collaborer</li>
              <li>• Pas de discrimination (toutes causes éligibles)</li>
            </ul>
          </article>
        </Reveal>
      </div>

      {/* Garantie */}
      <div className="mt-12">
        <Guarantee />
      </div>

      {/* CTA final */}
      <div className="mt-12">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Votre Association Mérite d&apos;Exister en Ligne</h2>
          <MagneticZone>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookingButton className="rounded-full btn-lift" label="Réserver mon audit gratuit (15 min)" />
              <Button asChild className="rounded-full btn-lift" variant="cta" data-magnetic="true">
                <Link href="/candidature-association">Candidater au site gratuit</Link>
              </Button>
              <Button asChild className="rounded-full btn-lift" variant="secondary" data-magnetic="true">
                <Link href="mailto:contact@smarterlogicweb.com?subject=Tarif%20solidaire%20-%20Association">Demander un tarif solidaire</Link>
              </Button>
              <Button asChild className="rounded-full btn-lift" variant="outline" data-magnetic="true">
                <Link href="/services">Retour aux services classiques</Link>
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <GoogleReviewsBadge />
            </div>
          </MagneticZone>
        </div>
      </div>

      {/* Final CTA global */}
      <FinalCTA />
    </section>
  );
}