"use client";

import Link from "next/link";

type Props = {
  className?: string;
  title?: string;
};

export function QuickLinks({ className, title = "Pour approfondir" }: Props) {
  return (
    <section className={["mx-auto w-full max-w-3xl px-6 py-8", className].filter(Boolean).join(" ")}>
      <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-foreground/80">
          Maintenance, coûts et garanties — liens rapides :
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <Link href="/blog/cout-maintenance-site-web" className="text-primary hover:underline">
            Coût de la maintenance
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/blog/forfait-maintenance-site-vitrine" className="text-primary hover:underline">
            Contenu d’un forfait
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/blog/frais-caches-site-internet" className="text-primary hover:underline">
            Frais cachés après la livraison
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/tarifs-2025" className="text-primary hover:underline">
            Tarifs 2025
          </Link>
        </div>
      </div>
    </section>
  );
}