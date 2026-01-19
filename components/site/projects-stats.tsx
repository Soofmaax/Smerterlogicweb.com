"use client";

import * as React from "react";

export function ProjectsStats() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card
          title="Types de projets"
          text="Sites vitrines pour TPE, indépendants et petites structures B2B."
        />
        <Card
          title="Secteurs"
          text="Services, logistique, associatif et projets locaux."
        />
        <Card
          title="Priorités"
          text="Clarté, performance, SEO local et simplicité au quotidien."
        />
      </div>
    </section>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5 text-center">
      <div className="font-heading text-base font-semibold">{title}</div>
      <div className="mt-2 text-sm text-muted-foreground">{text}</div>
    </div>
  );
}