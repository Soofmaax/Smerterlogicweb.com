"use client";

import * as React from "react";
import { Modal } from "@/components/site/modal";
import { Button } from "@/components/ui/button";

type BookingButtonProps = {
  label?: string;
  bookingUrl?: string; // override env if provided
  size?: "default" | "sm" | "lg";
  className?: string;
};

// Centralize env access
function getBookingUrl(override?: string) {
  const url = override || process.env.NEXT_PUBLIC_BOOKING_URL || "";
  // Fallback demo if not configured (Cal.com has a generous free tier; Calendly aussi)
  return url || "https://cal.com/your-handle/15min";
}

// Build an embeddable URL depending on provider; otherwise return null to open in new tab
function buildEmbedUrl(raw: string): string | null {
  try {
    const u = new URL(raw);
    const hostname = u.hostname.toLowerCase();

    // Cal.com inline: add ?embed=true — only allow cal.com or its subdomains
    if (hostname === "cal.com" || hostname.endsWith(".cal.com")) {
      if (!u.searchParams.has("embed")) u.searchParams.set("embed", "true");
      return u.toString();
    }

    // Calendly inline: add ?embed_domain=<host>&embed_type=Inline — only allow calendly.com or its subdomains
    if (hostname === "calendly.com" || hostname.endsWith(".calendly.com")) {
      if (!u.searchParams.has("embed_domain")) {
        const domain = typeof window !== "undefined" ? window.location.hostname : "localhost";
        u.searchParams.set("embed_domain", domain);
      }
      if (!u.searchParams.has("embed_type")) u.searchParams.set("embed_type", "Inline");
      return u.toString();
    }

    // Google Forms share links are embeddable as-is (often already have embedded=true)
    if ((hostname === "docs.google.com" || hostname.endsWith(".docs.google.com")) && u.pathname.includes("/forms/")) {
      if (!u.searchParams.has("embedded")) u.searchParams.set("embedded", "true");
      return u.toString();
    }

    // For anything else (mailto:, tel:, custom pages), do not try to embed
    return null;
  } catch {
    return null;
  }
}

export function BookingButton({
  label = "Réserver mon audit gratuit (15 min)",
  bookingUrl,
  size = "lg",
  className,
}: BookingButtonProps) {
  const [open, setOpen] = React.useState(false);
  const url = getBookingUrl(bookingUrl);
  const embeddable = buildEmbedUrl(url) !== null;

  const onClick = () => {
    if (embeddable) {
      setOpen(true);
    } else {
      // Fall back to opening the link directly (free and universal)
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <Button
        size={size}
        variant="cta"
        className={`rounded-full ${className || ""}`}
        onClick={onClick}
      >
        {label}
      </Button>
      {embeddable && (
        <BookingModal open={open} onClose={() => setOpen(false)} bookingUrl={url} />
      )}
    </>
  );
}

export function BookingModal({
  open,
  onClose,
  bookingUrl,
}: {
  open: boolean;
  onClose: () => void;
  bookingUrl: string;
}) {
  const [embedUrl, setEmbedUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    setEmbedUrl(buildEmbedUrl(bookingUrl));
  }, [bookingUrl]);

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Prendre un rendez‑vous">
      <div className="flex items-center justify-between gap-3 px-2 pb-2">
        <div className="text-sm font-medium">Audit gratuit — 15 minutes</div>
        <button
          type="button"
          className="rounded-full border px-3 py-1 text-xs hover:bg-accent"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
      <div className="rounded-xl border">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Prise de rendez‑vous"
            className="h-[70vh] w-full rounded-xl"
            loading="lazy"
          />
        ) : (
          <div className="p-6 text-center text-sm text-muted-foreground">
            Impossible d’intégrer ce lien. <a className="underline" href={bookingUrl} target="_blank" rel="noreferrer">Ouvrir la page de réservation</a>.
          </div>
        )}
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Fonctionne avec Cal.com (gratuit), Calendly (gratuit) ou un Google Form gratuit.
      </p>
    </Modal>
  );
}