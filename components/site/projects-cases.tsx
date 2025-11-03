"use client";

import * as React from "react";
import { Carousel } from "@/components/site/carousel";
import { Lightbox } from "@/components/site/lightbox";
import { Modal } from "@/components/site/modal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CaseItem, KPI } from "@/data/projects";

export function ProjectsCases({
  items,
  locale = "fr",
  intervalMs = 4500,
  className,
}: {
  items: CaseItem[];
  locale?: "fr" | "en";
  intervalMs?: number;
  className?: string;
}) {
  const [zoomOpen, setZoomOpen] = React.useState(false);
  const [zoomIndex, setZoomIndex] = React.useState(0);

  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [detailsIndex, setDetailsIndex] = React.useState(0);

  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  const renderImage = (src: string | null, alt: string) => {
    if (!src) {
      return (
        <div className="h-full w-full bg-gradient-to-br from-[#22232a] via-[#1c1e24] to-[#171921]" aria-label={alt} />
      );
    }
    return (
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    );
  };

  const slideCard = (item: CaseItem, index: number) => (
    <article key={item.id} id={item.id} className="flex scroll-mt-28 flex-col rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {item.tags.map((t) => (
          <Badge key={t} variant="outline">
            {t}
          </Badge>
        ))}
      </div>
      <h3 className="mt-3 font-heading text-xl font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm text-foreground/80">{item.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          onClick={() => {
            setZoomIndex(index);
            setZoomOpen(true);
          }}
        >
          {t("Zoom", "Zoom")}
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          onClick={() => {
            setDetailsIndex(index);
            setDetailsOpen(true);
          }}
        >
          {t("Détails", "Details")}
        </button>
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {t("Voir le site", "Visit site")}
          </a>
        ) : null}
      </div>
    </article>
  );

  const zoomSlides = items.map((it) => {
    const hasImages = Array.isArray(it.images) && it.images.length > 0;
    return (
      <div className="absolute inset-0">
        <div className="h-full w-full">
          {hasImages ? (
            renderImage(it.images![0]!, `${it.title} preview`)
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#22232a] via-[#1c1e24] to-[#171921]" />
          )}
        </div>
      </div>
    );
  });

  const details = items[detailsIndex];

  return (
    <div className={className}>
      <Carousel
        items={items.map(slideCard)}
        orientation="horizontal"
        autoplay
        intervalMs={intervalMs}
        ariaLabel={t("Études de cas", "Case studies")}
      />

      <Lightbox
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        items={zoomSlides}
        index={zoomIndex}
        onIndexChange={setZoomIndex}
        ariaLabel={t("Zoom études de cas", "Cases zoom")}
      />

      <Modal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        ariaLabel={t("Détails projet", "Project details")}
      >
        {details && (
          <div>
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-heading text-xl font-semibold">{details.title}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {details.tags.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                {details.url ? (
                  <a
                    href={details.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    {t("Voir le site", "Visit site")}
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => setDetailsOpen(false)}
                  className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  {t("Fermer", "Close")}
                </button>
              </div>
            </header>

            <div className="mt-4 text-sm text-foreground/80">
              {details.description}
            </div>

            {details.kpis && details.kpis.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {details.kpis.map((k, i) => (
                  <div key={i} className="rounded-[16px] border bg-muted/40 p-3 text-center">
                    <div className="text-sm text-muted-foreground">{k.label}</div>
                    <div className="mt-1 text-lg font-semibold">{k.value}</div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-background">
                {renderImage(details.images?.[0] ?? null, `${details.title} preview`)}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}