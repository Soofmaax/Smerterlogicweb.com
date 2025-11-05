"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

function getWhatsappUrl() {
  return process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/33600000000";
}

export function WhatsAppFloat() {
  const href = getWhatsappUrl();
  const pathname = usePathname() || "/";

  // Afficher uniquement sur la homepage (FR et EN), masquer ailleurs
  const isHome = pathname === "/" || pathname === "/en";
  if (!isHome) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        aria-label="Discutons de votre projet sur WhatsApp"
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
          <MessageCircle className="h-4 w-4" />
        </span>
        <span className="whitespace-nowrap">Discutons de votre projet</span>
      </Link>
    </div>
  );
}