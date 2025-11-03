"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Orientation = "horizontal" | "vertical";

export interface CarouselProps {
  items: React.ReactNode[];
  orientation?: Orientation;
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  ariaLabel?: string;
}

export function Carousel({
  items,
  orientation = "horizontal",
  className,
  autoplay = false,
  intervalMs = 4000,
  ariaLabel = "carousel",
}: CarouselProps) {
  if (orientation === "horizontal") {
    return (
      <HorizontalCarousel
        items={items}
        className={className}
        autoplay={autoplay}
        intervalMs={intervalMs}
        ariaLabel={ariaLabel}
      />
    );
  }
  return (
    <VerticalCarousel
      items={items}
      className={className}
      autoplay={autoplay}
      intervalMs={intervalMs}
      ariaLabel={ariaLabel}
    />
  );
}

function HorizontalCarousel({
  items,
  className,
  autoplay,
  intervalMs,
  ariaLabel,
}: {
  items: React.ReactNode[];
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  ariaLabel?: string;
}) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);

  const scrollToIndex = React.useCallback(
    (i: number) => {
      const vp = viewportRef.current;
      if (!vp) return;
      const children = Array.from(vp.children) as HTMLElement[];
      const target = children[i] as HTMLElement | undefined;
      if (!target) return;
      vp.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    },
    [viewportRef]
  );

  const prev = React.useCallback(() => {
    const i = index - 1 < 0 ? items.length - 1 : index - 1;
    setIndex(i);
    scrollToIndex(i);
  }, [index, items.length, scrollToIndex]);

  const next = React.useCallback(() => {
    const i = index + 1 >= items.length ? 0 : index + 1;
    setIndex(i);
    scrollToIndex(i);
  }, [index, items.length, scrollToIndex]);

  // sync on resize
  React.useEffect(() => {
    const onResize = () => scrollToIndex(index);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, scrollToIndex]);

  // autoplay
  React.useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      next();
    }, Math.max(2000, intervalMs || 4000));
    return () => clearInterval(id);
  }, [autoplay, intervalMs, next]);

  return (
    <div className={cn("relative", className)} aria-label={ariaLabel}>
      <div
        ref={viewportRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth rounded-[20px] p-1 [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ scrollSnapType: "x mandatory" }}
        role="region"
        aria-roledescription="carousel"
      >
        {/* hide scrollbar (Webkit) */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {items.map((node, i) => (
          <div
            key={i}
            className="snap-start shrink-0 basis-full md:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.666rem)]"
            aria-label={`slide ${i + 1} of ${items.length}`}
          >
            {node}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
        <button
          type="button"
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow ring-1 ring-black/5 transition hover:bg-accent"
          aria-label="Previous slide"
          onClick={prev}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow ring-1 ring-black/5 transition hover:bg-accent"
          aria-label="Next slide"
          onClick={next}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function VerticalCarousel({
  items,
  className,
  autoplay,
  intervalMs,
  ariaLabel,
}: {
  items: React.ReactNode[];
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  ariaLabel?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const count = items.length;

  React.useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, Math.max(2000, intervalMs || 4000));
    return () => clearInterval(id);
  }, [autoplay, intervalMs, count]);

  return (
    <div className={cn("relative overflow-hidden", className)} aria-label={ariaLabel} role="region" aria-roledescription="carousel">
      <div
        className="transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${index * 100}%)` }}
      >
        {items.map((node, i) => (
          <div key={i} className="min-h-[6rem] w-full">
            {node}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to item ${i + 1}`}
            className={cn(
              "h-2.5 w-2.5 rounded-full ring-1 ring-black/10 transition",
              i === index ? "bg-primary" : "bg-foreground/20 hover:bg-foreground/40"
            )}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}