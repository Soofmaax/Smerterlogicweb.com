"use client";

import * as React from "react";
import { Carousel } from "@/components/site/carousel";

export function TestimonialsRail() {
  const items = [
    {
      quote: "Notre site charge en moins d’une seconde et nos demandes de devis ont augmenté.",
      author: "Atelier Martin — Métallerie",
    },
    {
      quote: "Mise en ligne rapide, clair pour nos clients, et facile à mettre à jour.",
      author: "Boulangerie Les Saveurs",
    },
    {
      quote: "Excellent accompagnement et résultats visibles sur Google en quelques semaines.",
      author: "Plomberie Du Sud",
    },
    {
      quote: "Un site moderne, performant, et un support réactif — rien à redire.",
      author: "Menuiserie Dubois",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Témoignages et Résultats</h2>
        <p className="mt-2 text-foreground/70">Quelques retours de clients sur les résultats obtenus.</p>
      </div>

      <div className="rounded-[28px] border bg-card p-6">
        <Carousel
          orientation="horizontal"
          autoplay
          intervalMs={5000}
          ariaLabel="Témoignages clients"
          items={items.map((t, i) => (
            <figure key={i} className="flex h-40 flex-col justify-center rounded-2xl border bg-muted/40 p-6 text-center">
              <blockquote className="text-balance text-lg text-foreground/90">“{t.quote}”</blockquote>
              <figcaption className="mt-2 text-sm text-muted-foreground">— {t.author}</figcaption>
            </figure>
          ))}
        />
      </div>
    </section>
  );
}