"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LightboxProps {
  open: boolean;
  onClose: () => void;
  items: React.ReactNode[];
  index: number;
  onIndexChange?: (i: number) => void;
  ariaLabel?: string;
}

export function Lightbox({
  open,
  onClose,
  items,
  index,
  onIndexChange,
  ariaLabel = "Lightbox",
}: LightboxProps) {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const setIndex = React.useCallback(
    (i: number) => {
      if (!onIndexChange) return;
      const next = (i + items.length) % items.length;
      onIndexChange(next);
    },
    [items.length, onIndexChange]
  );

  React.useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex(index + 1);
      if (e.key === "ArrowLeft") setIndex(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, setIndex, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl">
        <div className="rounded-2xl bg-card p-3 shadow-xl ring-1 ring-black/10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-background">
            <div className="absolute inset-0">{items[index]}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            onClick={() => setIndex(index - 1)}
          >
            Prev
          </button>
          <div className="inline-flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-2.5 w-2.5 rounded-full ring-1 ring-black/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                  i === index ? "bg-primary" : "bg-foreground/30 hover:bg-foreground/50"
                )}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => setIndex(index + 1)}
            >
              Next
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}