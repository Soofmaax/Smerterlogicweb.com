import Link from "next/link";

export function UrgencyBanner() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-red-600 text-white">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="flex items-center justify-center gap-3 py-2 text-sm">
          <span className="font-medium">
            ⚠️ Plus que 2 créneaux disponibles ce mois-ci. Réservez votre audit gratuit !
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-white ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            Réserver maintenant
          </Link>
        </div>
      </div>
    </div>
  );
}