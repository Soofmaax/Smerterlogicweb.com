"use client";

import * as React from "react";
import Image from "next/image";

type Item = {
  title: string;
  subtitle: string;
  href?: string;
  img?: string;
  status?: "live" | "soon";
  domain?: string;
};

const items: Item[] = [
  { title: "BMS Ventouse", subtitle: "bmsventouse.fr", img: "", href: "https://bmsventouse.fr", status: "live", domain: "bmsventouse.fr" },
  { title: "Plomberie Martin", subtitle: "Plombier à Paris", img: "", href: "", status: "soon" },
  { title: "Boulangerie Les Saveurs", subtitle: "Boulangerie à Lyon", img: "", href: "", status: "soon" },
  { title: "Menuiserie Dubois", subtitle: "Menuiserie à Nantes", img: "", href: "", status: "soon" },
];

export function RealisationsGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Mes Réalisations</h2>
        <p className="mt-2 text-foreground/70">Quelques exemples représentatifs par secteur (captures à venir).</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((it, i) => {
          const isSoon = it.status === "soon" || !it.href;
          return (
            <article
              key={`${it.title}-${i}`}
              className={`relative rounded-2xl border bg-card p-3 ${isSoon ? "opacity-95" : ""}`}
            >
              {/* Status badge */}
              <div className="pointer-events-none absolute right-3 top-3">
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${isSoon ? "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300"}`}>
                  {isSoon ? "En cours" : "En ligne"}
                </span>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                {it.img ? (
                  <Image src={it.img} alt={it.title} fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">
                    {isSoon ? "Bientôt disponible" : "Aperçu"}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <div className="font-heading text-sm font-semibold">{it.title}</div>
                <div className="text-xs text-muted-foreground">{it.subtitle}</div>
              </div>
              <div className="mt-3">
                {!isSoon && it.href ? (
                  <a href={it.href} target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-primary">
                    Voir le site
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {it.domain ? `Bientôt en ligne — ${it.domain}` : "Bientôt en ligne"}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}