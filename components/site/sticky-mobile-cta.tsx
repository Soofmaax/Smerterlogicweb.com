"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyMobileCTA() {
  const [visible, setVisible] = React.useState(true);
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const isContactPage = pathname.includes("/contact");
  const isHome = isEn ? pathname === "/en" || pathname === "/en/" : pathname === "/";

  // Primary href: always send to contact page to collect site + email
  const href = isEn ? "/en/contact" : "/contact";
  const isInternal = true;

  // Label localized, aligned with async audit by email
  const label = isEn ? "Request a free audit" : "Envoyer mon site pour audit gratuit";

  React.useEffect(() => {
    if (isContactPage) {
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
  }, [isContactPage]);

  if (!visible || isContactPage) return null;

  // Full-width bottom-fixed CTA on mobile
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="mx-auto w-full max-w-5xl px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2">
        {isInternal ? (
          <Link
            href={href}
            className="block w-full rounded-full bg-gradient-to-r from-primary to-[hsl(323_90%_58%)] px-5 py-3 text-center text-base font-semibold text-primary-foreground shadow-lg transition hover:brightness-[1.05] active:scale-[0.99] btn-gradient-shift"
          >
            {label}
          </Link>
        ) : (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block w-full rounded-full bg-gradient-to-r from-primary to-[hsl(323_90%_58%)] px-5 py-3 text-center text-base font-semibold text-primary-foreground shadow-lg transition hover:brightness-[1.05] active:scale-[0.99] btn-gradient-shift"
          >
            {label}
          </a>
        )}
      </div>
    </div>
  );
}