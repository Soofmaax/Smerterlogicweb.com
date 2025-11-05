"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setShow(y > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  if (!show) return null;

  return (
    <button
      type="button"
      aria-label="Revenir en haut"
      onClick={onClick}
      className="fixed bottom-20 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border bg-card text-foreground shadow-md transition hover:translate-y-[-2px] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:bottom-6 md:right-6"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}