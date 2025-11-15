"use client";

import * as React from "react";
import { Lightbox } from "./lightbox";

type BinderProps = {
  rootId: string;
  ariaLabel?: string;
};

type Slide = {
  src: string;
  alt?: string;
  title?: string;
};

export function BlogLightboxBinder({ rootId, ariaLabel = "Lightbox" }: BinderProps) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [slides, setSlides] = React.useState<Slide[]>([]);

  React.useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    // Collect images within the article content
    const imgs = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
    const collected: Slide[] = imgs.map((img) => ({
      src: img.currentSrc || img.src,
      alt: img.getAttribute("alt") || undefined,
      title: img.getAttribute("title") || undefined,
    }));

    setSlides(collected);

    // Mark images as interactive
    imgs.forEach((img) => {
      img.style.cursor = "zoom-in";
    });

    // Click delegation to open lightbox
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const img = target && target.closest("img");
      if (!img) return;
      e.preventDefault();
      e.stopPropagation();
      const idx = imgs.indexOf(img as HTMLImageElement);
      if (idx >= 0) {
        setIndex(idx);
        setOpen(true);
      }
    };

    root.addEventListener("click", onClick);
    return () => {
      root.removeEventListener("click", onClick);
    };
  }, [rootId]);

  if (!slides.length) return null;

  const items = slides.map((s, i) => {
    const caption = s.title || s.alt || "";
    return (
      <figure key={`${i}-${s.src}`} className="relative h-full w-full flex items-center justify-center">
        <img
          src={s.src}
          alt={s.alt || ""}
          className="max-h-full max-w-full object-contain"
          decoding="async"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {caption ? (
          <figcaption className="absolute bottom-3 left-0 right-0 px-4 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  });

  return (
    <Lightbox
      open={open}
      onClose={() => setOpen(false)}
      items={items}
      index={index}
      onIndexChange={(i) => setIndex(i)}
      ariaLabel={ariaLabel}
    />
  );
}