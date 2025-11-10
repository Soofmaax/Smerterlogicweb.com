"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { associationsFR, type AssociationItem } from "@/data/associations";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

function AssCard({ a, i }: { a: AssociationItem; i: number }) {
  const badge =
    a.helpType === "Site offert"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300"
      : "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300";

  return (
    <Reveal className="reveal-fade-up">
      <article
        className="rounded-[20px] card-elevated border bg-card p-5"
        style={{ transitionDelay: `${i * 90}ms` }}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border bg-accent">
            {a.logo ? (
              <Image src={a.logo} alt={a.name} fill sizes="48px" style={{ objectFit: "cover" }} />
            ) : (
              <div className="grid h-full w-full place-items-center font-heading text-base">
                {a.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold">{a.name}</h3>
            <div className={cn("mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] ring-1", badge)}>
              {a.helpType}
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-foreground/80">{a.mission}</p>
        {a.quote ? <p className="mt-2 text-sm italic text-foreground/70">“{a.quote}”</p> : null}
        <div className="mt-3">
          {a.url ? (
            <Link href={a.url} target="_blank" rel="noreferrer" className="link-underline link-underline-strong text-sm text-primary">
              Voir le site
            </Link>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}

export function AssociationsGrid({ items = associationsFR }: { items?: AssociationItem[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-0">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <AssCard key={a.id} a={a} i={i} />
        ))}
      </div>
    </section>
  );
}