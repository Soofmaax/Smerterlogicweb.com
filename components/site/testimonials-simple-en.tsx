"use client";

import * as React from "react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const data: Testimonial[] = [
  {
    quote:
      "Since the new website, I get 3–4 quote requests per week from Google.",
    author: "Julie",
    role: "Florist in Nantes",
  },
  {
    quote:
      "A site that finally looks like us and that I can update easily!",
    author: "Marc",
    role: "Electrician in Bordeaux",
  },
  {
    quote:
      "Fast website, modern design, and above all: visible on Google. Exactly what I needed.",
    author: "Sophie",
    role: "Café owner in Paris",
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

export function TestimonialsSimpleEN() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">What My Clients Say</h2>
        <p className="mt-2 text-foreground/70">Short, concrete feedback on business impact.</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {data.map((t, i) => (
          <figure key={i} className="rounded-2xl border bg-card p-5">
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
    </section>
  );
}