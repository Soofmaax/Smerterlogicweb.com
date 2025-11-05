"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";
import { HandHeart, Github, BookOpen, MapPin } from "lucide-react";

const steps = [
  {
    title: "Tarifs solidaires",
    subtitle: "Jusqu’à −50%",
    desc: "Réductions jusqu’à 50% pour les associations d’intérêt général.",
    Icon: HandHeart,
  },
  {
    title: "Open source",
    subtitle: "Contributions",
    desc: "Participation à des projets libres et accessibles sur le web.",
    Icon: Github,
  },
  {
    title: "Partage de connaissances",
    subtitle: "Blog & conseils",
    desc: "Articles, guides et réponses gratuites aux questions fréquentes.",
    Icon: BookOpen,
  },
  {
    title: "Local first",
    subtitle: "Proximité",
    desc: "Priorité aux entreprises locales et circuits courts.",
    Icon: MapPin,
  },
];

export function EngagementTimeline() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="h2-underline inline-block font-heading text-3xl font-semibold md:text-4xl">Ce Que Je Fais Concrètement</h2>
      </div>

      <div className="relative hidden md:block">
        <div className="absolute left-0 right-0 top-[64px] h-1 rounded bg-foreground/10" />
        <div className="grid grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} className="reveal-fade-up">
              <article className="relative rounded-2xl border bg-card p-5">
                <div className="pointer-events-none absolute left-0 top-[64px] h-1 w-0 rounded bg-primary transition-[width] duration-700 ease-out group-[.in-view]:w-full" />
                <div className="absolute left-1/2 top-[56px] h-4 w-4 -translate-x-1/2 rounded-full bg-foreground/30 transition-transform duration-700 ease-out group-[.in-view]:scale-110 group-[.in-view]:bg-primary" />
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