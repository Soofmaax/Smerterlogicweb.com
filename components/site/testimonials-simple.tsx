/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";
import { projectsFR } from "@/data/projects";

function extractAfter(testimonial: string | undefined): string | null {
  if (!testimonial) return null;
  const fr = testimonial.match(/Après:\s*(.+?)(?:\s+gr[aâ]ce.+)?$/i);
  if (fr && fr[1]) return fr[1].trim();
  const en = testimonial.match(/After:\s*(.+?)(?:\s+thanks.+)?$/i);
  if (en && en[1]) return en[1].trim();
  return null;
}

export function TestimonialsSimple() {
  const cases = projectsFR.cases.slice(0, 3);
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Ce Que Disent Mes Clients</h2>
        <p className="mt-2 text-foreground/70">Des retours concrets sur l’impact business.</p>
      </div>

      <Reveal className="reveal-fade-up">
        <div className="mt-6 grid items-stretch gap-4 md:grid-cols-3">
          {cases.map((c, i) => {
            const after = extractAfter(c.testimonialFull) ||
              (c.kpis && c.kpis.length
                ? `${c.kpis[0].value} ${c.kpis[0].label.toLowerCase()}`
                : null);
            const author = c.review?.author || "Client";
            const role = c.title || "";
            const photo = c.clientPhoto || `https://i.pravatar.cc/120?u=${c.id}`;
            return (
              <figure key={c.id} className="rounded-2xl border bg-card p-5 h-full flex flex-col" style={{ transitionDelay: `${i * 150}ms` }}>
                {after && (
                  <div className="mb-2 text-2xl font-extrabold text-emerald-600">
                    {after}
                  </div>
                )}
                <blockquote className="text-foreground/90">
                  {c.testimonialFull}
                </blockquote>
                <figcaption className="mt-auto pt-4 flex items-center gap-3">
                  <img
                    src={photo}
                    alt={author}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="text-sm">
                    <div className="font-semibold">{author}</div>
                    <div className="text-muted-foreground">{role}</div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}