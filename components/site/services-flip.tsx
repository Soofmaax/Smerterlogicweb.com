"use client";

import * as React from "react";
import { Cloud, Shield, Headphones, Layers, Smartphone, Wifi, ChevronRight } from "lucide-react";

type Service = {
  title: string;
  bullets: string[];
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const services: Service[] = [
  { title: "Cloud Services", Icon: Cloud, bullets: ["Intégration CDN", "Déploiement edge", "SSL/TLS auto", "Logs & monitoring"] },
  { title: "Cyber Security", Icon: Shield, bullets: ["Headers CSP/HSTS", "Audit basique A11y/SEO", "Form protection", "Best practices OWASP"] },
  { title: "IT Support", Icon: Headphones, bullets: ["Support prioritaire", "Guides & formation", "Mises à jour", "Résolution incidents"] },
  { title: "Microsoft Solutions", Icon: Layers, bullets: ["Intégrations Office 365", "OneDrive/SharePoint", "Authentification", "Automatisations"] },
  { title: "Mobile + Utilities", Icon: Smartphone, bullets: ["Responsive haut niveau", "PWA en option", "Icônes & manifest", "Optimisation tactile"] },
  { title: "Network + Comms", Icon: Wifi, bullets: ["Formulaires fiables", "Email transactionnel", "Réglages DNS", "Suivi analytics"] },
];

export function ServicesFlip3D() {
  const [flipped, setFlipped] = React.useState<Record<number, boolean>>({});
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onToggle = (i: number) => {
    setFlipped((f) => ({ ...f, [i]: !f[i] }));
  };

  // optional tilt for pointer fine
  const pointerFine =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(any-pointer: fine)").matches;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pointerFine || prefersReduced) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -10; // rotateX
    const ry = (px - 0.5) * 10; // rotateY
    card.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    card.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Services “flip 3D” interactifs</h2>
        <p className="mt-2 text-foreground/70">Touchez/cliquer une carte pour voir les détails. Sur desktop, un léger tilt réagit au pointeur.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="flip-card card-elevated rounded-[20px] border bg-card p-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flip-inner" data-flipped={!!flipped[i]} style={{ transform: "rotateY(0)" }}>
              {/* Front */}
              <button
                type="button"
                onClick={() => onToggle(i)}
                className="flip-face relative block h-full w-full rounded-[20px] p-5 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                    <s.Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-foreground/70">Cliquez pour voir plus de détails.</p>
                <span className="pointer-events-none absolute bottom-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-foreground">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </button>

              {/* Back */}
              <button
                type="button"
                onClick={() => onToggle(i)}
                className="flip-face flip-back absolute inset-0 rounded-[20px] p-5 text-left"
              >
                <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-foreground/80">{b}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <a href="/services" className="link-underline text-sm text-primary">En savoir plus</a>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}