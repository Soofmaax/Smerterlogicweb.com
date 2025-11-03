"use client";

import * as React from "react";

export function Modal({
  open,
  onClose,
  ariaLabel = "Dialog",
  children,
}: {
  open: boolean;
  onClose: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl rounded-2xl border bg-card p-4 shadow-xl ring-1 ring-black/10">
        {children}
      </div>
    </div>
  );
}