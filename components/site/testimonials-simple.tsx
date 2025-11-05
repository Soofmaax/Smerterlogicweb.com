"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const data: Testimonial[] = [
  {
    quote:
      "Depuis que j'ai mon nouveau site, je reçois 3 à 4 demandes de devis par semaine via Google.",
    author: "Julien",
    role: "Plombier à Lyon",
  },
  {
    quote:
      "Site clair et rapide. Les clients trouvent facilement nos horaires et nous appellent directement.",
    author: "Marie",
    role: "Boulangerie à Paris",
  },
  {
    quote:
      "Mise en ligne fluide, pas de prise de tête côté technique. Je me concentre sur mes chantiers.",
    author: "Thomas",
    role: "Menuisier à Nantes",
  },
];

function Avatar({ name }: { name: string }) {
  const initial = (name || "?").charAt(0).toUpperCase();
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-1 ring-black/5">
      {initial}
    </div>
  );
}

export function TestimonialsSimple() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Ce Que Disent Mes Clients</h2>
        <p className="mt-2 text-foreground/70">Des retours concrets sur l’impact business.</p>
      </div>

      <Reveal className="reveal-fade-up">
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data.map((t, i) => (
            <figure key={i} className="rounded-2xl border bg-card p-5" style={{ transitionDelay: `${i * 150}ms` }}>
              <blockquote className="text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <Avatar name={t.author} />
                <div className="text-sm">
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}