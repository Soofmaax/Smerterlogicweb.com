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

  // Right-hand friendly floating CTA (avoids overlap with chat bubble)
  return (
    <div className="md:hidden fixed bottom-20 right-4 z-40">
      <Button asChild size="sm" className="rounded-full shadow-lg">
        <Link href="/contact">Demander un devis</Link>
      </Button>
    </div>
  );
}