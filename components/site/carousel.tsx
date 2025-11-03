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
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const startRef = React.useRef<number>(performance.now());

  const scrollToIndex = React.useCallback((i: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const children = Array.from(vp.children) as HTMLElement[];
    const target = children[i] as HTMLElement | undefined;
    if (!target) return;
    vp.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }, []);

  const resetProgress = React.useCallback(() => {
    startRef.current = performance.now();
    setProgress(0);
  }, []);

  const prev = React.useCallback(() => {
    const i = index - 1 < 0 ? items.length - 1 : index - 1;
    setIndex(i);
    scrollToIndex(i);
    resetProgress();
  }, [index, items.length, scrollToIndex, resetProgress]);

  const next = React.useCallback(() => {
    const i = index + 1 >= items.length ? 0 : index + 1;
    setIndex(i);
    scrollToIndex(i);
    resetProgress();
  }, [index, items.length, scrollToIndex, resetProgress]);

  // sync on resize
  React.useEffect(() => {
    const onResize = () => scrollToIndex(index);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, scrollToIndex]);

  // autoplay
  React.useEffect(() => {
    if (!autoplay) return;
    const duration = Math.max(2000, intervalMs || 4000);
    const id = setInterval(() => {
      if (!paused) next();
    }, duration);
    return () => clearInterval(id);
  }, [autoplay, intervalMs, paused, next]);

  // progress bar animation
  React.useEffect(() => {
    if (!autoplay) {
      setProgress(0);
      return;
    }
    let raf = 0;
    const duration = Math.max(2000, intervalMs || 4000);
    const tick = () => {
      if (!paused) {
        const now = performance.now();
        const p = Math.min(1, (now - startRef.current) / duration);
        setProgress(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, intervalMs, paused, index]);

  // pause on hover/focus
  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);
    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);
    node.addEventListener("focusin", onEnter);
    node.addEventListener("focusout", onLeave);
    return () => {
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
      node.removeEventListener("focusin", onEnter);
      node.removeEventListener("focusout", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("relative", className)} aria-label={ariaLabel}>
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
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow ring-1 ring-black/5 transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="Previous slide"
          onClick={prev}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow ring-1 ring-black/5 transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="Next slide"
          onClick={next}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress bar */}
      {autoplay ? (
        <div className="absolute inset-x-1 bottom-0 h-0.5 rounded bg-foreground/10">
          <div
            className="h-full rounded bg-primary transition-[width] duration-100 ease-linear"
            style={{ width: `${progress * 100}%` }}
            aria-hidden
          />
        </div>
      ) : null}
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