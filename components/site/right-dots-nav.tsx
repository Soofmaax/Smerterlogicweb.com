"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Section = { id: string; label: string };

export function RightDotsNav({
  sections,
  className,
  offset = 0,
  ariaLabel = "Navigation des sections",
}: {
  sections: Section[];
  className?: string;
  offset?: number;
  ariaLabel?: string;
}) {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: null,
        // Consider section visible when 40% in viewport
        threshold: [0.4],
        rootMargin: `-${offset}px 0px 0px 0px`,
      }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections, offset]);

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "fixed right-4 top-1/2 z-[70] hidden -translate-y-1/2 md:block",
        className
      )}
    >
      <ul className="flex flex-col items-center gap-3">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              title={s.label}
              aria-label={s.label}
              className={cn(
                "block h-2.5 w-2.5 rounded-full ring-1 ring-black/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                active === s.id
                  ? "bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]"
                  : "bg-foreground/30 hover:bg-foreground/50"
              )}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}