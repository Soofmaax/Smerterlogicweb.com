"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";
import { MessageSquare, FileText, Code, Rocket } from "lucide-react";

const steps = [
  { title: "Audit gratuit", subtitle: "48h", desc: "On discute de vos besoins, j'analyse votre situation.", Icon: MessageSquare },
  { title: "Devis personnalisé", subtitle: "Tarif fixe", desc: "Proposition claire, sans surprise.", Icon: FileText },
  { title: "Création", subtitle: "2–4 semaines", desc: "Je vous tiens informé, vous validez à chaque étape.", Icon: Code },
  { title: "Livraison & formation", subtitle: "Incluse", desc: "Site en ligne + formation à la gestion.", Icon: Rocket },
];

export function ServicesTimelineSimple() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Comment On Travaille Ensemble</h2>
        <p className="mt-2 text-foreground/70">Un processus simple et transparent.</p>
      </div>

      <div className="relative hidden md:block">
        {/* base line */}
        <div className="absolute left-0 right-0 top-[64px] h-1 rounded bg-foreground/10" />
        <div className="grid grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} className="reveal-fade-up">
              <article className="relative rounded-2xl border bg-card p-5">
                <div className="pointer-events-none absolute left-0 top-[64px] h-1 w-0 rounded bg-primary transition-[width] duration-700 ease-out group-[.in-view]:w-full" />
                <div className="absolute left-1/2 top-[56px] h-4 w-4 -translate-x-1/2 rounded-full bg-foreground/30 transition-transform duration-500 ease-out group-[.in-view]:scale-110 group-[.in-view]:bg-primary" />
                <header className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                    <s.Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{i + 1}. {s.title}</h3>
                    <div className="text-xs text-muted-foreground">{s.subtitle}</div>
                  </div>
                </header>
                <p className="mt-3 text-sm text-foreground/80">{s.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile vertical */}
      <div className="grid gap-4 md:hidden">
        {steps.map((s, i) => (
          <Reveal key={s.title} className="reveal-fade-up">
            <article className="relative rounded-2xl border bg-card p-5">
              <header className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                  <s.Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold">{i + 1}. {s.title}</h3>
                  <div className="text-xs text-muted-foreground">{s.subtitle}</div>
                </div>
              </header>
              <p className="mt-3 text-sm text-foreground/80">{s.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}