import * as React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export function Inclusions() {
  const inclus = [
    "Site statique performant (Core Web Vitals)",
    "Design adapté à votre charte existante",
    "SEO on‑page (titres, méta, schémas)",
    "Formulaires sécurisés (anti‑spam)",
    "Optimisation images (WebP, lazy‑loading)",
    "Hébergement + nom de domaine 1 an offerts",
    "Formation à la mise à jour de contenus",
    "Intégration Google Analytics & Search Console",
  ];
  const options = [
    "Création graphique complète (logo, charte…)",
    "Rédaction de contenus de A à Z",
    "Photographie professionnelle",
    "Campagnes publicitaires",
    "Intégrations API complexes (CRM, etc.)",
    "Maintenance au‑delà de la 1ère année",
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Ce qui est inclus / en option</h2>
        <p className="mt-2 text-foreground/70">Transparence totale dès le départ.</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-heading text-lg font-semibold">Inclus</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {inclus.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-heading text-lg font-semibold">En option / payant</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {options.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <XCircle className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}