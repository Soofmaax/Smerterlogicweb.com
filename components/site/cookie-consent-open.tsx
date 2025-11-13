"use client";

import * as React from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
  label?: string;
};

export function CookieConsentOpenButton({ className, children, label }: Props) {
  const onClick = React.useCallback(() => {
    if (typeof window !== "undefined" && (window as any).cookieConsentOpen) {
      (window as any).cookieConsentOpen();
    } else {
      // Fallback: dispatch a custom event the banner listens to
      try {
        window.dispatchEvent(new Event("cookie-consent:open"));
      } catch {
        /* no-op */
      }
    }
  }, []);

  return (
    <button
      className={className ?? "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground shadow-sm transition hover:opacity-90"}
      onClick={onClick}
      type="button"
    >
      {children ?? (label ?? "Gérer mes préférences")}
    </button>
  );
}