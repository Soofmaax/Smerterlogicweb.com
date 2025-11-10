import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Particles } from "@/components/site/particles";
import { PricingOffers } from "@/components/site/pricing-offers";
import { TestimonialsSimple } from "@/components/site/testimonials-simple";
import { projectsFR } from "@/data/projects";

type PageProps = {
  params: { metier: string };
};

const METIERS = ["plombier", "electricien", "boulanger", "coiffeur", "artisan-batiment"] as const;

const LABELS: Record<string, string> = {
  plombier: "Plombier",
  electricien: "Électricien",
  boulanger: "Boulanger",
  coiffeur: "Coiffeur",
  "artisan-batiment": "Artisan du Bâtiment",
};

const BENEFICES: Record<string, string[]> = {
  plombier: ["Urgences 24/7", "Formulaire de devis rapide", "SEO local: fuites, débouchage"],
  electricien: ["Dépannage express", "Mise en conformité", "SEO local: électricien + ville"],
  boulanger: ["Menu & horaires visibles", "Google Maps", "Avis clients mis en avant"],
  coiffeur: ["Prise de RDV facile", "Galerie avant/après", "Mobile‑first"],
  "artisan-batiment": ["Chantiers en avant", "Demande de devis simple", "Fiches services SEO"],
};

const CASES_BY_METIER: Record<string, string[]> = {
  plombier: ["plomberie-lyon"],
  electricien: ["electricien-bordeaux"],
  boulanger: ["boulangerie-paris"],
  coiffeur: ["restaurant-nice"], // retail local proche de l'usage
  "artisan-batiment": ["menuiserie-nantes", "electricien-bordeaux"],
};

function extractAfter(testimonial?: string): string | null {
  if (!testimonial) return null;
  const fr = testimonial.match(/Après:\s*(.+?)(?:\s+gr[aâ]ce.+)?$/i);
  if (fr && fr[1]) return fr[1].trim();
  const en = testimonial.match(/After:\s*(.+?)(?:\s+thanks.+)?$/i);
  if (en && en[1]) return en[1].trim();
  return null;
}

export function generateStaticParams() {
  return METIERS.map((m) => ({ metier: m }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const label = LABELS[params.metier] || params.metier;
  const title = `Création de Site Web pour ${label} : Plus de Devis Qualifiés`;
  const desc = `Sites ${label.toLowerCase()} rapides, SEO et conversion. Obtenez plus de demandes qualifiées en 90 jours.`;
  return {
    title: `${title} — smarterlogicweb.com`,
    description: desc,
    alternates: {
      canonical: `/site-web/${params.metier}`,
    },
    openGraph: {
      url: `https://smarterlogicweb.com/site-web/${params.metier}`,
      title: `${title} — smarterlogicweb.com`,
      description: desc,
    },
  };
}

export default function MetierPage({ params }: PageProps) {
  const metier = params.metier;
  const label = LABELS[metier] || metier;
  const caseIds = CASES_BY_METIER[metier] || [];
  const relevant = projectsFR.cases.filter((c) => caseIds.includes(c.id)).slice(0, 3);
  const benefs = BENEFICES[metier] || [];

  const otherLinks = (Object.keys(LABELS) as string[])
    .filter((m) => m !== metier)
    .map((m) => ({ slug: m, label: LABELS[m] || m }));

  return (
    <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* Hero background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-foreground/15 bg-card px-3 py-1 text-sm text-foreground/80">
          Local SEO
        </span>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">
          Création de Site Web pour {label} : Plus de Devis Qualifiés
        </h1>
        <p className="mt-4 text-foreground/80">
          Site rapide, référencement local, appels à l’action pertinents — conçu pour générer des devis pour votre
          activité de {label.toLowerCase()}.
        </p>
        {benefs.length > 0 && (
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            {benefs.map((b) => (
              <li key={b} className="rounded-full border border-foreground/15 bg-card px-3 py-1 text-foreground/80">
                {b}
              </li>
            ))}
          </ul>
        )}
        {otherLinks.length > 0 && (
          <div className="mt-5 text-sm text-foreground/70">
            Autres métiers:{" "}
            {otherLinks.map((o, i) => (
              <React.Fragment key={o.slug}>
                <Link className="link-underline link-underline-strong" href={`/site-web/${o.slug}`}>{o.label}</Link>
                {i < otherLinks.length - 1 ? " · " : ""}
              </React.Fragment>
            ))}
          </div>
        )}
      </section>

      {/* Offres réutilisées */}
      <section className="mt-10">
        <PricingOffers />
      </section>

      {/* Cas clients ciblés */}
      {relevant.length > 0 && (
        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Cas clients — {label}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {relevant.map((c) => {
              const after = extractAfter(c.testimonialFull) ||
                (c.kpis && c.kpis.length ? `${c.kpis[0].value} ${c.kpis[0].label.toLowerCase()}` : null);
              const author = c.review?.author || "Client";
              const role = c.title || "";
              const photo = c.clientPhoto || `https://i.pravatar.cc/120?u=${c.id}`;
              return (
                <figure key={c.id} className="rounded-2xl border bg-card p-5">
                  {after && <div className="mb-2 text-2xl font-extrabold text-emerald-600">{after}</div>}
                  <blockquote className="text-foreground/90">{c.testimonialFull}</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo}
                      alt={author}
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="text-sm">
                      <div className="font-semibold">{author}</div>
                      <div className="text-muted-foreground">{role}</div>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {/* Témoignages globaux */}
      <section className="mt-10">
        <TestimonialsSimple />
      </section>
    </div>
  );
}