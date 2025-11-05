"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServicesOffers() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Choisissez la formule adaptée</h2>
        <p className="mt-2 text-foreground/70">Du site vitrine simple au site business complet — pensé pour votre activité.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <OfferCard
          name="Site Vitrine"
          price="1800€"
          recommended={false}
          forWho="Idéal pour artisans qui débutent en ligne, commerces locaux, indépendants."
          cases={[
            "Plombier qui veut être trouvé sur Google",
            "Boulangerie qui veut montrer ses produits",
            "Menuisier qui veut présenter ses réalisations",
          ]}
          includes={[
            "3 à 5 pages claires (Accueil, Services, Réalisations, À propos, Contact)",
            "Formulaire pour recevoir des demandes de devis",
            "Visible sur Google dès le lancement",
            "Rapide sur téléphone et ordinateur",
            "Adresse et horaires d'ouverture bien visibles",
          ]}
          quote="“Le Site Vitrine nous a permis d’être contactés toutes les semaines.”"
        />
        <OfferCard
          name="Site Business"
          price="3200€"
          recommended
          forWho="Pour artisans établis, commerces avec galerie photos, entreprises qui veulent générer plus de contacts."
          cases={[
            "Électricien avec 20 ans d'expérience et beaucoup de réalisations",
            "Restaurant qui veut afficher son menu",
            "Entreprise du bâtiment qui gère plusieurs demandes par semaine",
          ]}
          includes={[
            "5 à 10 pages",
            "Galerie photos illimitée et optimisée",
            "Blog pour partager votre expertise",
            "Espace actualités / promotions",
            "Suivi des visiteurs (Analytics simplifié)",
            "Optimisation avancée pour être premier sur Google",
          ]}
          quote="“Nous avons multiplié les demandes de devis grâce à la galerie et au blog.”"
        />
        <OfferCard
          name="Site Premium"
          price="5500€"
          recommended={false}
          forWho="TPE/PME qui veulent un outil de vente complet et automatisé."
          cases={[
            "Entreprise avec plusieurs services",
            "Artisan qui veut prendre des réservations en ligne",
            "Commerce qui souhaite vendre en ligne",
          ]}
          includes={[
            "Pages illimitées",
            "Prise de rendez‑vous en ligne",
            "Intégrations avancées (calendrier, CRM, facturation)",
            "Espace client sécurisé",
            "Multilingue si besoin",
            "3 mois de suivi marketing inclus",
          ]}
          quote="“Un vrai gain de temps: les rendez‑vous et demandes sont automatisés.”"
        />
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Garanties: satisfait ou remboursé 30 jours — support prioritaire — le code source vous appartient.
      </p>
    </section>
  );
}

function OfferCard({
  name,
  price,
  forWho,
  cases,
  includes,
  recommended,
  quote,
}: {
  name: string;
  price: string;
  forWho: string;
  cases: string[];
  includes: string[];
  recommended?: boolean;
  quote?: string;
}) {
  return (
    <article
      className={cn(
        "relative rounded-[24px] border bg-card p-6 transition duration-300 card-elevated pricing-animated offer-lift",
        recommended ? "ring-2 ring-primary border-primary shadow-xl md:scale-[1.02]" : ""
      )}
    >
      {recommended ? (
        <div className="absolute -top-3 left-4">
          <span className="inline-flex animate-pulse items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
            <Star className="h-3.5 w-3.5" /> RECOMMANDÉ
          </span>
        </div>
      ) : null}

      <h3 className="font-heading text-xl font-semibold">{name}</h3>
      <div className="mt-1 text-xl font-bold">{price}</div>

      <div className="mt-3 text-sm text-foreground/80">
        <div className="font-semibold">Pour qui</div>
        <p>{forWho}</p>
      </div>

      <div className="mt-3 text-sm text-foreground/80">
        <div className="font-semibold">Cas d’usage concrets</div>
        <ul className="mt-1 list-disc pl-5">
          {cases.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3 text-sm text-foreground/80">
        <div className="font-semibold">Ce que ça inclut</div>
        <ul className="mt-1 space-y-1.5">
          {includes.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {quote ? <p className="mt-4 text-sm italic text-foreground/70">{quote}</p> : null}

      <div className="mt-5">
        <Button className="w-full rounded-full" asChild>
          <Link href="/contact">Choisir cette formule</Link>
        </Button>
      </div>
    </article>
  );
}