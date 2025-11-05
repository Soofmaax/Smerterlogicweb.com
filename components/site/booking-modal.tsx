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
  // Fallback demo if not configured
  return url || "https://cal.com/your-handle/15min";
}

export function BookingButton({
  label = "Réserver mon audit gratuit (15 min)",
  bookingUrl,
  size = "lg",
  className,
}: BookingButtonProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        size={size}
        variant="cta"
        className={`rounded-full ${className || ""}`}
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>
      <BookingModal open={open} onClose={() => setOpen(false)} bookingUrl={getBookingUrl(bookingUrl)} />
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
  // lightweight focus trap for iframe modal is handled by Modal overlay close
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
        <iframe
          src={`${bookingUrl}${bookingUrl.includes("?") ? "&" : "?"}embed=true`}
          title="Prise de rendez‑vous"
          className="h-[70vh] w-full rounded-xl"
          loading="lazy"
        />
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Propulsé par Calendly/Cal.com — aucune donnée sensible n’est stockée ici.
      </p>
    </Modal>
  );
}