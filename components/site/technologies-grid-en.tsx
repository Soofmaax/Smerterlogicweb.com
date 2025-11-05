"use client";

import * as React from "react";
import { Code2, Cpu, Cloud, Image, Database, Settings } from "lucide-react";

export function TechnologiesGridEN() {
  const techs = [
    { label: "Semantic HTML5", Icon: Code2 },
    { label: "CSS3 (Tailwind)", Icon: Settings },
    { label: "Modern JavaScript", Icon: Cpu },
    { label: "React / Next.js", Icon: Code2 },
    { label: "Static site generators (Astro/Eleventy)", Icon: Cloud },
    { label: "Image optimisation (WebP/LQIP)", Icon: Image },
    { label: "CDN & edge", Icon: Cloud },
    { label: "Headless CMS (optional)", Icon: Database },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Modern, High‑Performance Technologies</h2>
        <p className="mt-2 text-foreground/70">
          A fast, reliable, maintainable stack to serve your business goals.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {techs.map((t, i) => (
          <div
            key={t.label}
            className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-foreground">
              <t.Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium">{t.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}