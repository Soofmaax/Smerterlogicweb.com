"use client";

import * as React from "react";
import { Brush, Server, Shuffle, GraduationCap } from "lucide-react";

type Extra = {
  title: string;
  price: string;
  desc: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const extras: Extra[] = [
  {
    title: "Adaptation graphique",
    price: "À partir de 150€",
    desc: "Cartes de visite, flyers, QR codes, signature email — selon votre charte.",
    Icon: Brush,
  },
  {
    title: "Maintenance & hébergement",
    price: "Dès 8€/mois",
    desc: "Mises à jour, sauvegardes, corrections, hébergement performant en option.",
    Icon: Server,
  },
  {
    title: "Migration Wix/WordPress",
    price: "Sur devis",
    desc: "Reprise de contenu, nettoyage, optimisation performance & SEO.",
    Icon: Shuffle,
  },
  {
    title: "Formation personnalisée",
    price: "60€/h",
    desc: "Apprenez à mettre à jour vos contenus en toute autonomie.",
    Icon: GraduationCap,
  },
];

export function ServicesExtras() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Services complémentaires</h2>
        <p className="mt-2 text-foreground/70">Des options utiles pour aller plus loin, quand vous en avez besoin.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
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
      <div className="flip-inner rounded-[20px] card-elevated border bg-card p-5" data-flipped={flipped}>
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