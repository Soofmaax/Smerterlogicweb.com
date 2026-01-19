"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type BookingButtonProps = {
  label?: string;
  size?: "default" | "sm" | "lg";
  className?: string;
  // bookingUrl is kept for backward compatibility but no longer used
  bookingUrl?: string;
};

/**
 * BookingButton no longer opens a calendar or schedules a call.
 * It now simply redirects to the contact page so people can send
 * their site and email for an asynchronous audit.
 */
export function BookingButton({
  label = "Demander un audit gratuit",
  size = "lg",
  className,
}: BookingButtonProps) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const href = isEn ? "/en/contact" : "/contact";

  const onClick = React.useCallback(() => {
    router.push(href);
  }, [router, href]);

  return (
    <Button
      size={size}
      variant="cta"
      className={`rounded-full ${className || ""}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}