"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { associationsFR, type AssociationItem } from "@/data/associations";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

function AssCard({ a, i }: { a: AssociationItem; i: number }) {
  const hasHelp = !!a.helpType;
  const badge =
    a.helpType === "Site offert"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300"
      : "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300";

  return (
    &lt;Reveal className="reveal-fade-up"&gt;
      &lt;article
        className="rounded-[20px] card-elevated border bg-card p-5 h-full flex flex-col"
        style={{ transitionDelay: `${i * 90}ms` }}
      &gt;
        &lt;div className="flex items-center gap-3"&gt;
          &lt;div className="relative h-12 w-12 overflow-hidden rounded-full border bg-accent"&gt;
            {a.logo ? (
              &lt;Image src={a.logo} alt={a.name} fill sizes="48px" style={{ objectFit: "cover" }} /&gt;
            ) : (
              &lt;div className="grid h-full w-full place-items-center font-heading text-base"&gt;
                {a.name.charAt(0)}
              &lt;/div&gt;
            )}
          &lt;/div&gt;
          &lt;div&gt;
            &lt;h3 className="font-heading text-base font-semibold"&gt;{a.name}&lt;/h3&gt;
            {hasHelp ? (
              &lt;div className={cn("mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] ring-1", badge)}&gt;
                {a.helpType}
              &lt;/div&gt;
            ) : null}
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;p className="mt-3 text-sm text-foreground/80"&gt;{a.mission}&lt;/p&gt;
        {a.quote ? &lt;p className="mt-2 text-sm italic text-foreground/70"&gt;“{a.quote}”&lt;/p&gt; : null}
        &lt;div className="mt-auto pt-3"&gt;
          {a.url ? (
            &lt;Link href={a.url} target="_blank" rel="noreferrer" className="link-underline link-underline-strong text-sm text-primary"&gt;
              Voir le site
            &lt;/Link&gt;
          ) : (
            &lt;span className="text-xs text-muted-foreground"&gt;Site en préparation&lt;/span&gt;
          )}
        &lt;/div&gt;
      &lt;/article&gt;
    &lt;/Reveal&gt;
  );
}

export function AssociationsGrid({ items = associationsFR }: { items?: AssociationItem[] }) {
  if (!items.length) {
    return null;
  }
  return (
    &lt;section className="mx-auto w-full max-w-6xl px-0"&gt;
      &lt;div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"&gt;
        {items.map((a, i) => (
          &lt;AssCard key={a.id} a={a} i={i} /&gt;
        ))}
      &lt;/div&gt;
    &lt;/section&gt;
  );
}