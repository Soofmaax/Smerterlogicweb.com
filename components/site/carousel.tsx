"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Orientation = "horizontal" | "vertical";

type Labels = {
  prev: string;
  next: string;
  counter: (i: number, total: number) => string;
  slideAria: (i: number, total: number) => string;
  skip: string;
};

export interface CarouselProps {
  items: React.ReactNode[];
  orientation?: Orientation;
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  ariaLabel?: string;
  centerEmphasis?: boolean; // highlight the active (center) slide
  labels?: Partial<Labels>;
}

const defaultLabels: Labels = {
  prev: "Slide précédente",
  next: "Slide suivante",
  counter: (i, total) => `${i + 1} / ${total}`,
  slideAria: (i, total) => `Slide ${i + 1} sur ${total}`,
  skip: "Passer le carrousel",
};

export function Carousel({
  items,
  orientation = "horizontal",
  className,
  autoplay = false,
  intervalMs = 4000,
  ariaLabel = "carousel",
  centerEmphasis = false,
  labels,
}: CarouselProps) {
  const L = { ...defaultLabels, ...labels };

  if (!items || items.length === 0) {
    return null;
  }

  if (orientation === "horizontal") {
    return (
      <HorizontalCarousel
        items={items}
        className={className}
        autoplay={autoplay}
        intervalMs={intervalMs}
        ariaLabel={ariaLabel}
        centerEmphasis={centerEmphasis}
        labels={L}
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
      labels={L}
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
  labels,
}: {
  items: React.ReactNode[];
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  ariaLabel?: string;
  centerEmphasis?: boolean;
  labels: Labels;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const afterRef = React.useRef<HTMLSpanElement>(null);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [inView, setInView] = React.useState(true);
  const [announce, setAnnounce] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [rowH, setRowH] = React.useState(0);

  const duration = Math.max(2000, intervalMs || 4000);

  const scrollToIndex = React.useCallback((i: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const children = Array.from(vp.children) as HTMLElement[];
    const target = children[i] as HTMLElement | undefined;
    if (!target) return;
    vp.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    setAnnounce(labels.slideAria(index, items.length));
  }, [index, items.length, labels]);

  const prev = React.useCallback(() => {
    const i = index - 1 < 0 ? items.length - 1 : index - 1;
    setIndex(i);
    setProgress(0);
    scrollToIndex(i);
  }, [index, items.length, scrollToIndex]);

  const next = React.useCallback(() => {
    const i = index + 1 >= items.length ? 0 : index + 1;
    setIndex(i);
    setProgress(0);
    scrollToIndex(i);
  }, [index, items.length, scrollToIndex]);

  // sync on resize
  React.useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const children = Array.from(vp.children) as HTMLElement[];
      const max = children.reduce((m, el) => Math.max(m, el.offsetHeight), 0);
      if (max > 0) setRowH(max);
    };
    const onResize = () => {
      scrollToIndex(index);
      measure();
    };
    window.addEventListener("resize", onResize);
    // initial measure
    measure();
    return () => window.removeEventListener("resize", onResize);
  }, [index, scrollToIndex]);

  // autoplay (paused when out of view)
  React.useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      if (!paused && inView) next();
    }, duration);
    return () => clearInterval(id);
  }, [autoplay, duration, paused, inView, next]);

  // autoplay progress (requestAnimationFrame for smoothness)
  React.useEffect(() => {
    if (!autoplay) return;
    let raf = 0;
    let start = performance.now();

    const loop = (t: number) => {
      if (paused || !inView) {
        start = t; // freeze
      } else {
        const elapsed = t - start;
        setProgress(Math.min(1, elapsed / duration));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, paused, inView, duration]);

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

  // Determine current center index on scroll to enable emphasis (throttled via rAF)
  React.useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const children = Array.from(vp.children) as HTMLElement[];
        const center = vp.scrollLeft + vp.clientWidth / 2;
        let best = 0;
        let bestDist = Number.POSITIVE_INFINITY;
        let maxH = 0;
        children.forEach((child, i) => {
          const mid = child.offsetLeft + child.offsetWidth / 2;
          const d = Math.abs(mid - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
          maxH = Math.max(maxH, child.offsetHeight);
        });
        setIndex(best);
        if (maxH > 0) setRowH(maxH);
        ticking = false;
      });
    };
    onScroll(); // compute initial index based on current layout
    vp.addEventListener("scroll", onScroll, { passive: true });
    return () => vp.removeEventListener("scroll", onScroll);
  }, [items.length]);

  // touch swipe + wheel pagination
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

    // Wheel/trackpad pagination (horizontal or vertical gesture)
    let wheelLocked = false;
    const onWheel = (e: WheelEvent) => {
      const dx = e.deltaX;
      const dy = e.deltaY;

      // Only handle horizontal gestures. Let vertical scroll pass through
      // so the user can scroll inside cards/content.
      if (Math.abs(dx) <= Math.abs(dy) || Math.abs(dx) < 10) {
        return; // do not block native vertical scroll
      }

      if (!wheelLocked) {
        wheelLocked = true;
        if (dx > 0) next();
        else prev();
        setTimeout(() => {
          wheelLocked = false;
        }, 320);
      }

      // Prevent horizontal scrolling default to avoid awkward partial snaps
      e.preventDefault();
    };

    vp.addEventListener("touchstart", onTouchStart, { passive: true });
    vp.addEventListener("touchmove", onTouchMove, { passive: false });
    vp.addEventListener("touchend", onTouchEnd);

    const node = rootRef.current;
    if (node) node.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      vp.removeEventListener("touchstart", onTouchStart);
      vp.removeEventListener("touchmove", onTouchMove);
      vp.removeEventListener("touchend", onTouchEnd);
      if (node) node.removeEventListener("wheel", onWheel);
    };
  }, [next, prev]);

  // keyboard navigation
  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "Home") {
        e.preventDefault();
        setIndex(0);
        scrollToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        const last = items.length - 1;
        setIndex(last);
        scrollToIndex(last);
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [items.length, next, prev, scrollToIndex]);

  const total = items.length;

  return (
    <div
      ref={rootRef}
      className={cn("relative group rounded-[20px]", className)}
      aria-label={ariaLabel}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
    >
      {/* Skip link for accessibility */}
      <button
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded focus:bg-card focus:px-3 focus:py-1 focus:shadow"
        onClick={() => afterRef.current?.focus()}
      >
        {labels.skip}
      </button>

      {/* SR announcement for slide changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announce}
      </div>

      {/* Autoplay progress bar */}
      {autoplay && (
        <div className="pointer-events-none absolute inset-x-8 top-2 z-20 h-1 rounded-full bg-foreground/10">
          <div
            className="h-1 rounded-full bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${Math.floor(progress * 100)}%` }}
            aria-hidden
          />
        </div>
      )}

      {/* Visible counter */}
      <div className="absolute right-2 top-2 z-20 rounded-full bg-background/70 px-2 py-0.5 text-xs text-foreground/80 backdrop-blur-sm ring-1 ring-black/5">
        {labels.counter(index, total)}
      </div>

      <div
        ref={viewportRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto no-scrollbar scroll-smooth rounded-[20px] p-1"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((node, i) => (
          <div
            key={i}
            className={cn(
              "snap-start shrink-0 basis-full md:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.666rem)] transition-all duration-300 ease-out",
              centerEmphasis
                ? i === index
                  ? "scale-[1.02] opacity-100 z-10"
                  : "scale-[0.96] opacity-80"
                : ""
            )}
            style={{ willChange: "transform", minHeight: rowH ? `${rowH}px` : undefined }}
            aria-label={labels.slideAria(i, total)}
            onClick={() => {
              setIndex(i);
              scrollToIndex(i);
            }}
          >
            {node}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
        <button
          type="button"
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground shadow ring-1 ring-black/5 backdrop-blur-sm transition hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label={labels.prev}
          onClick={prev}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground shadow ring-1 ring-black/5 backdrop-blur-sm transition hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label={labels.next}
          onClick={next}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Aller à l'élément ${i + 1}`}
            onClick={() => {
              setIndex(i);
              scrollToIndex(i);
            }}
            className={cn(
              "h-2.5 w-2.5 rounded-full ring-1 ring-black/10 transition",
              i === index ? "bg-primary scale-100" : "bg-foreground/30 hover:bg-foreground/50 scale-90"
            )}
          />
        ))}
      </div>

      {/* Focus target for skip */}
      <span ref={afterRef} tabIndex={-1} />
    </div>
  );
}

function VerticalCarousel({
  items,
  className,
  autoplay,
  intervalMs,
  ariaLabel,
  labels,
}: {
  items: React.ReactNode[];
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  ariaLabel?: string;
  labels: Labels;
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
    <div className={cn("relative overflow-hidden", className)} aria-label={ariaLabel} role="region" aria-roledescription="carousel" tabIndex={0}>
      <div
        className="transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${index * 100}%)` }}
      >
        {items.map((node, i) => (
          <div key={i} className="min-h-[6rem] w-full" aria-label={labels.slideAria(i, count)}>
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