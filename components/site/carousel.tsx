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
  centerEmphasis?: boolean; // highlight the active (center) slide
}

export function Carousel({
  items,
  orientation = "horizontal",
  className,
  autoplay = false,
  intervalMs = 4000,
  ariaLabel = "carousel",
  centerEmphasis = false,
}: CarouselProps) {
  if (orientation === "horizontal") {
    return (
      <HorizontalCarousel
        items={items}
        className={className}
        autoplay={autoplay}
        intervalMs={intervalMs}
        ariaLabel={ariaLabel}
        centerEmphasis={centerEmphasis}
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
  centerEmphasis,
}: {
  items: React.ReactNode[];
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  ariaLabel?: string;
  centerEmphasis?: boolean;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [inView, setInView] = React.useState(true);
  const [announce, setAnnounce] = React.useState("");

  const scrollToIndex = React.useCallback((i: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const children = Array.from(vp.children) as HTMLElement[];
    const target = children[i] as HTMLElement | undefined;
    if (!target) return;
    vp.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    setAnnounce(`Slide ${index + 1} sur ${items.length}`);
  }, [index, items.length]);

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

  // autoplay (paused when out of view)
  React.useEffect(() => {
    if (!autoplay) return;
    const duration = Math.max(2000, intervalMs || 4000);
    const id = setInterval(() => {
      if (!paused && inView) next();
    }, duration);
    return () => clearInterval(id);
  }, [autoplay, intervalMs, paused, inView, next]);

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

  // IntersectionObserver to pause autoplay when offscreen
  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setInView(e.isIntersecting);
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Determine current center index on scroll to enable emphasis
  React.useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onScroll = () => {
      const children = Array.from(vp.children) as HTMLElement[];
      const center = vp.scrollLeft + vp.clientWidth / 2;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      children.forEach((child, i) => {
        const mid = child.offsetLeft + child.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    onScroll(); // compute initial index based on current layout
    vp.addEventListener("scroll", onScroll, { passive: true });
    return () => vp.removeEventListener("scroll", onScroll);
  }, [items.length]);

  // touch swipe
  React.useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    let startX = 0;
    let startY = 0;
    let dragging = false;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      dragging = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      // if horizontal swipe dominates
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 24) {
        e.preventDefault();
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!dragging) return;
      dragging = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const threshold = 48; // px
      if (Math.abs(dx) > threshold) {
        if (dx < 0) next();
        else prev();
      }
    };

    vp.addEventListener("touchstart", onTouchStart, { passive: true });
    vp.addEventListener("touchmove", onTouchMove, { passive: false });
    vp.addEventListener("touchend", onTouchEnd);

    return () => {
      vp.removeEventListener("touchstart", onTouchStart);
      vp.removeEventListener("touchmove", onTouchMove);
      vp.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  return (
    <div ref={rootRef} className={cn("relative", className)} aria-label={ariaLabel}>
      {/* SR announcement for slide changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">{announce}</div>
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
            className={cn(
              "snap-start shrink-0 basis-full md:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.666rem)] transition-all duration-300",
              centerEmphasis
                ? i === index
                  ? "scale-[1.02] opacity-100 z-10"
                  : "scale-[0.96] opacity-80"
                : ""
            )}
            style={{ willChange: "transform" }}
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