"use client";

import * as React from "react";
import Link from "next/link";
import { Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Carousel } from "@/components/site/carousel";
import { BookingButton } from "@/components/site/booking-modal";
import { OFFERS_FR } from "@/data/pricing";

export function ServicesOffers() {
  const slides = OFFERS_FR.map((o) => (
    <OfferCard
      key={o.name}
      name={o.name}
      price={o.price}
      recommended={o.recommended}
      forWho={o.forWho}
      cases={o.cases}
      includes={o.includes}
      quote={o.quote}
    />
  ));

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Choisissez la formule adaptée</h2>
        <p className="mt-2 text-foreground/70">Du site vitrine simple au site business complet — pensé pour votre activité.</p>
      </div>

      {/* Carousel des offres, avec emphase sur la carte centrale */}
      <Carousel items={slides} ariaLabel="Offres de services" centerEmphasis />

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
        "pricing-spin relative rounded-[24px] border bg-card p-6 transition duration-300 card-elevated pricing-animated offer-lift",
        recommended ? "ring-2 ring-amber-400 border-amber-300 shadow-xl md:scale-[1.02]" : ""
      )}
    >
      <div className="spin-inner">
        {/* Titre + badge recommandé aligné à droite */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-heading text-xl font-semibold">{name}</h3>
          {recommended ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/95 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow">
              <Star className="h-3.5 w-3.5" /> Recommandé
            </span>
          ) : null}
        </div>

        <div className="mt-1 text-xl font-bold">{price}</div>

        <div className="mt-3 text-sm text-foreground/80">
          <div className="font-semibold">Pour qui</div>
          <p>{forWho}</p>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {/* Secteurs (badges) */}
          {name === "Site Vitrine" ? (
            <>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300">Artisanat</span>
              <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-semibold text-purple-700 ring-1 ring-purple-200 dark:bg-purple-400/10 dark:text-purple-300">Commerces</span>
              <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-[10px] font-semibold text-sky-700 ring-1 ring-sky-200 dark:bg-sky-400/10 dark:text-sky-300">Indépendants</span>
            </>
          ) : name === "Site Business" ? (
            <>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300">Bâtiment</span>
              <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-semibold text-rose-700 ring-1 ring-rose-200 dark:bg-rose-400/10 dark:text-rose-300">Restauration</span>
              <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300">Services</span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300">Réservations</span>
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-400/10 dark:text-indigo-300">Intégrations</span>
              <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-400/10 dark:text-slate-300">Espace client</span>
            </>
          )}
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
          <BookingButton className="w-full h-11 text-base rounded-full" label="Réserver mon audit gratuit (15 min)" />
        </div>
      </div>
    </article>
  );
}