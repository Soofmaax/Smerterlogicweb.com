"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ElementTag = keyof JSX.IntrinsicElements;

export function Reveal<T extends ElementTag = "div">({
  as,
  className,
  children,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.2,
  once = true,
}: {
  as?: T;
  className?: string;
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}) {
  const Comp = (as ?? "div") as any;
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { root: null, rootMargin, threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, threshold, once, visible]);

  return (
    <Comp
      ref={ref as any}
      className={cn(className, visible && "in-view")}
    >
      {children}
    </Comp>
  );
}