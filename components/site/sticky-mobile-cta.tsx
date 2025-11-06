"use client";

import * as React from "react";
import Link from "next/link";

export function StickyMobileCTA() {
  const [visible, setVisible] = React.useState(true);

  // Compute primary href: phone > booking > /contact
  const rawPhone = process.env.NEXT_PUBLIC_PHONE || "";
  const rawBooking = process.env.NEXT_PUBLIC_BOOKING_URL || "";
  const sanitizePhone = (p: string) => p.replace(/[^+\d]/g, "");
  const href = rawPhone ? `tel:${sanitizePhone(rawPhone)}` : (rawBooking || "/contact");
  const isInternal = href.startsWith("/");

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

  // Full-width bottom-fixed CTA on mobile
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="mx-auto w-full max-w-5xl px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2">
        {isInternal ? (
          <Link
            href={href}
            className="block w-full rounded-full bg-green-600 px-5 py-3 text-center text-base font-semibold text-white shadow-lg transition hover:bg-green-700 active:scale-[0.99]"
          >
            Appelez-moi pour un devis gratuit
          </Link>
        ) : (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block w-full rounded-full bg-green-600 px-5 py-3 text-center text-base font-semibold text-white shadow-lg transition hover:bg-green-700 active:scale-[0.99]"
          >
            Appelez-moi pour un devis gratuit
          </a>
        )}
      </div>
    </div>
  );
}