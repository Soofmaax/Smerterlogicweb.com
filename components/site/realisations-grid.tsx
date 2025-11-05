"use client";

import * as React from "react";
import Image from "next/image";

type Item = {
  title: string;
  subtitle: string;
  href?: string;
  img?: string;
};

const items: Item[] = [
  { title: "BMS Ventouse", subtitle: "bmsventouse.fr", img: "", href: "https://bmsventouse.fr" },
  { title: "Plomberie Martin", subtitle: "Plombier à Paris", img: "", href: "" },
  { title: "Boulangerie Les Saveurs", subtitle: "Boulangerie à Lyon", img: "", href: "" },
  { title: "Menuiserie Dubois", subtitle: "Menuiserie à Nantes", img: "", href: "" },
];

export function RealisationsGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Mes Réalisations</h2>
        <p className="mt-2 text-foreground/70">Quelques exemples représentatifs par secteur (captures à venir).</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((it, i) => (
          <article key={`${it.title}-${i}`} className="rounded-2xl border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
              {it.img ? (
                <Image src={it.img} alt={it.title} fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">Bientôt disponible</div>
              )}
            </div>
            <div className="mt-3">
              <div className="font-heading text-sm font-semibold">{it.title}</div>
              <div className="text-xs text-muted-foreground">{it.subtitle}</div>
            </div>
            <div className="mt-3">
              {it.href ? (
                <a href={it.href} target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-primary">
                  Voir le site
                </a>
              ) : (
                <span className="text-xs text-muted-foreground">Lien à venir</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}