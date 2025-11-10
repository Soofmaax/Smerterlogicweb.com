"use client";

import * as React from "react";
import { Carousel } from "@/components/site/carousel";
import { Lightbox } from "@/components/site/lightbox";
import { cn } from "@/lib/utils";

export interface ShowcaseItem {
  title: string;
  subtitle: string;
}

export function ProjectsShowcase({
  items,
  locale = "fr",
  className,
  intervalMs = 4200,
}: {
  items: ShowcaseItem[];
  locale?: "fr" | "en";
  className?: string;
  intervalMs?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const labelOpen = locale === "fr" ? "Voir en grand" : "View large";

  const slideCard = (item: ShowcaseItem, i: number, dense = true) => (
    <div className="rounded-[28px] border bg-card p-6 card-elevated" key={`${item.title}-${i}`}>
      <div className={cn("relative mx-auto w-full max-w-4xl", dense ? "h-56" : "h-[60vh]")}>
        {/* browser */}
        <div className="absolute inset-x-4 top-0 h-40 rounded-2xl border bg-gradient-to-br from-[#22232a] via-[#1c1e24] to-[#171921] shadow-sm">
          <div className="flex items-center gap-1 border-b border-white/10 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <div className="ml-3 h-4 flex-1 rounded bg-white/10" />
          </div>
          <div className="p-4">
            <div className="h-3 w-2/3 rounded bg-white/10" />
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="h-16 rounded bg-white/10" />
              <div className="h-16 rounded bg-white/10" />
              <div className="h-16 rounded bg-white/10" />
            </div>
          </div>
        </div>
        {/* tablet */}
        <div className="absolute left-6 top-16 h-28 w-52 rounded-2xl border bg-gradient-to-br from-[#22232a] via-[#1c1e24] to-[#171921] shadow">
          <div className="m-3 h-3 w-1/2 rounded bg-white/10" />
          <div className="mx-3 mt-3 h-14 rounded bg-white/10" />
        </div>
        {/* mobile */}
        <div className="absolute right-8 top-10 h-28 w-16 rounded-2xl border bg-gradient-to-br from-[#22232a] via-[#1c1e24] to-[#171921] shadow">
          <div className="m-2 h-2 w-10 rounded bg-white/10" />
          <div className="mx-2 mt-2 h-16 rounded bg-white/10" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2">
        <div className="text-center md:text-left">
          <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
          <p className="mt-1 text-sm text-foreground/70">{item.subtitle}</p>
        </div>
        {dense && (
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label={`${labelOpen}: ${item.title}`}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            {labelOpen}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={className}>
      <Carousel
        items={items.map((it, i) => slideCard(it, i, true))}
        orientation="horizontal"
        autoplay
        intervalMs={intervalMs}
        ariaLabel={locale === "fr" ? "Showcase réalisations" : "Showcase projects"}
      />
      <Lightbox
        open={open}
        onClose={() => setOpen(false)}
        index={index}
        onIndexChange={setIndex}
        items={items.map((it, i) => slideCard(it, i, false))}
        ariaLabel={locale === "fr" ? "Agrandissement showcase" : "Showcase enlarged"}
      />
    </div>
  );
}