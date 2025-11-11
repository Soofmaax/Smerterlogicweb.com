"use client";

import * as React from "react";
import { Brush, Server, Shuffle, GraduationCap } from "lucide-react";
import { EXTRAS_FR } from "@/data/pricing";

type Extra = {
  title: string;
  price: string;
  desc: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const ICONS = {
  brush: Brush,
  server: Server,
  shuffle: Shuffle,
  graduationCap: GraduationCap,
} as const;

const extras: Extra[] = EXTRAS_FR.map((e) => ({
  title: e.title,
  price: e.price,
  desc: e.desc,
  Icon: ICONS[e.iconKey],
}));

export function ServicesExtras() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Services complémentaires</h2>
        <p className="mt-2 text-foreground/70">Des options utiles pour aller plus loin, quand vous en avez besoin.</p>
      </div>

      <div className="grid items-stretch gap-4 sm:grid-cols-2 md:grid-cols-4">
        {extras.map((e) => (
          <FlipCard key={e.title} extra={e} />
        ))}
      </div>
    </section>
  );
}

function FlipCard({ extra }: { extra: Extra }) {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div
      className="flip-card"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="flip-inner rounded-[20px] card-elevated border bg-card p-5 h-full flex flex-col" data-flipped={flipped}>
        <div className="flip-face">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <extra.Icon className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-lg font-semibold">{extra.title}</h3>
          </div>
          <div className="mt-2 text-sm text-foreground/80">{extra.price}</div>
          <p className="mt-2 text-sm text-foreground/70">Survolez ou touchez pour en savoir plus.</p>
        </div>

        <div className="flip-face flip-back">
          <h4 className="font-heading text-base font-semibold">{extra.title}</h4>
          <p className="mt-2 text-sm text-foreground/80">{extra.desc}</p>
          <p className="mt-2 text-xs text-muted-foreground">Tarifs indicatifs, selon périmètre exact.</p>
        </div>
      </div>
    </div>
  );
}