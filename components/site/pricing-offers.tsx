import * as React from "react";
import { CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingButton } from "@/components/site/booking-modal";
import { Carousel } from "@/components/site/carousel";

type Plan = {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
};

const plans: Plan[] = [
  {
    name: "Site Vitrine",
    price: "À partir de 1 200€",
    features: [
      "3 à 5 pages responsive",
      "Design moderne adapté à votre charte",
      "SEO on‑page complet",
      "Formulaire de contact sécurisé",
      "Google Maps + horaires",
      "Score PageSpeed > 90",
      "Hébergement + domaine 1 an offerts",
      "Formation mise à jour contenu basique",
    ],
  },
  {
    name: "Site Business",
    price: "À partir de 2 500€",
    recommended: true,
    features: [
      "5 à 10 pages",
      "Présentation de vos réalisations",
      "Blog avec catégories",
      "Espace actus / promotions",
      "Suivi de vos visiteurs",
      "Boutons qui incitent vos visiteurs à vous contacter",
      "Support prioritaire 3 mois",
      "Sauvegardes automatiques hebdomadaires",
    ],
  },
  {
    name: "Site Premium",
    price: "Sur devis, à partir de 4 500€",
    features: [
      "Réservation / demande de devis en ligne",
      "Espace client sécurisé (si besoin)",
      "Intégrations API (CRM, calendrier…)",
      "PWA si pertinent",
      "Multilingue si besoin",
      "Suivi positionnement SEO 3 mois",
      "Maintenance et mises à jour annuelles incluses",
      "Accompagnement marketing digital de base",
    ],
  },
];

export function PricingOffers() {
  const slides = plans.map((plan) => <PlanCard key={plan.name} plan={plan} />);

  return (
    <section id="tarifs" className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Offres et tarifs</h2>
        <p className="mt-2 text-foreground/70">
          Des formules claires pour artisans et PME — performances, SEO et conversions au cœur.
        </p>
      </div>

      {/* Availability note (synced with UrgencyBanner) */}
      <p className="mb-4 text-center text-sm font-medium text-primary motion-safe:animate-pulse">
        <span className="mr-1">⚠️</span>
        Plus que 2 créneaux disponibles ce mois-ci.{" "}
        <a href="/contact" className="link-underline link-underline-strong">
          Réservez votre audit gratuit&nbsp;!
        </a>
      </p>

      {/* Carousel horizontal (affiche 1 / 2 / 3 cartes selon la largeur) */}
      <Carousel items={slides} ariaLabel="Offres et tarifs" centerEmphasis />

      <p className="mt-5 text-sm text-foreground/70">
        Important: ces tarifs s’appliquent si vous disposez déjà de votre identité visuelle (logo, charte graphique,
        contenus). Si vous avez besoin d’aide pour la création graphique, je peux vous recommander des graphistes
        partenaires compétents et abordables.
      </p>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        "group pricing-spin relative rounded-[24px] border bg-card p-5 transition duration-300 pricing-animated",
        "hover:-translate-y-1 hover:shadow-lg card-elevated",
        plan.recommended ? "ring-2 ring-amber-400 md:scale-[1.04] border-amber-300 shadow-xl" : ""
      )}
    >
      <div className="spin-inner">
        {/* Header: title + recommended pill aligned right */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
          {plan.recommended ? (
            <span className="badge-premium inline-flex items-center gap-1.5 rounded-full bg-amber-500/95 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
              <Star className="h-3.5 w-3.5" /> Recommandé
            </span>
          ) : null}
        </div>

        <div className="mt-1 text-2xl font-extrabold md:text-3xl">{plan.price}</div>

        <ul className="mt-3 space-y-1.5">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <BookingButton className="w-full h-11 md:h-12 text-base" label="Réserver mon audit gratuit (15 min)" />
        </div>
      </div>
    </article>
  );
}