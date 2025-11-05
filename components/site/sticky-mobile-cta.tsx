"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StickyMobileCTA() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    // Hide on /contact page
    if (typeof window === "undefined") return;
    if (window.location.pathname.includes("/contact")) {
      setVisible(false);
      return;
    }

    // Hide when footer is visible
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setVisible(!entry.isIntersecting);
      },
      { root: null, threshold: 0.01 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <div className="text-sm text-foreground/80">
          Une question ? Réponse sous 24h.
        </div>
        <Button asChild size="sm" className="rounded-full">
          <Link href="/contact">Demander un devis</Link>
        </Button>
      </div>
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </div>
  );
}