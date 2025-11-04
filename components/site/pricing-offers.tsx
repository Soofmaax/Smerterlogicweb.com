import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
  cta: string;
};

const plans: Plan[] = [
  {
    name: "Site Vitrine",
    price: "1800€ TTC",
    cta: "Démarrer",
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
    price: "3200€ TTC",
    cta: "Choisir Business",
    recommended: true,
    features: [
      "5 à 10 pages",
      "Galerie / portfolio lazy‑loading optimisé",
      "Blog avec catégories",
      "Espace actus / promotions",
      "Intégration Analytics + Search Console",
      "Optimisation conversions (CTA stratégiques)",
      "Support prioritaire 3 mois",
      "Sauvegardes automatiques hebdomadaires",
    ],
  },
  {
    name: "Site Premium",
    price: "5500€ TTC",
    cta: "Choisir Premium",
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
  return (
    <section id="tarifs" className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Offres et tarifs</h2>
        <p className="mt-2 text-foreground/70">
          Des formules claires pour artisans et PME — performances, SEO et conversions au cœur.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "relative rounded-[28px] border bg-card p-6 transition duration-300",
              "hover:-translate-y-2 hover:shadow-xl card-elevated"
            )}
          >
            {plan.recommended ? (
              <div className="absolute -top-3 right-4">
                <span className="inline-flex animate-pulse items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                  Le plus choisi
                </span>
              </div>
            ) : null}

            <h3 className="font-heading text-xl font-semibold">{plan.name}</h3>
            <div className="mt-2 text-2xl font-bold">{plan.price}</div>

            <ul className="mt-4 space-y-2">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Button className="w-full rounded-full" asChild>
                <a href="/contact">{plan.cta}</a>
              </Button>
            </div>

            {/* Animated border gradient on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 hover:opacity-100"
                 style={{ maskImage: "radial-gradient(white, transparent 75%)" }}>
              <div className="absolute inset-0 rounded-[28px]"
                   style={{
                     background: "conic-gradient(from 180deg, rgba(24,99,220,0.3), transparent 60%, rgba(24,99,220,0.3))",
                     WebkitMaskImage: "linear-gradient(#000, #000)", maskComposite: "exclude" as any
                   }} />
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-foreground/70">
        Important: ces tarifs s’appliquent si vous disposez déjà de votre identité visuelle (logo, charte graphique,
        contenus). Si vous avez besoin d’aide pour la création graphique, je peux vous recommander des graphistes
        partenaires compétents et abordables.
      </p>
    </section>
  );
}