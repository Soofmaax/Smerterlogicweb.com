import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Particles } from "@/components/site/particles";
import { TestimonialsSimpleEN } from "@/components/site/testimonials-simple-en";

type PageProps = {
  params: { trade: string };
};

const TRADES = ["plumber", "electrician", "baker", "hairdresser", "general-contractor"] as const;

const LABELS: Record<string, string> = {
  plumber: "Plumber",
  electrician: "Electrician",
  baker: "Baker",
  hairdresser: "Hairdresser",
  "general-contractor": "General Contractor",
};

const BENEFITS: Record<string, string[]> = {
  plumber: ["24/7 emergencies", "Quick quote form", "Local SEO: leaks, unclogging"],
  electrician: ["Fast troubleshooting", "Compliance upgrades", "Local SEO: electrician + city"],
  baker: ["Menu & hours visible", "Google Maps", "Customer reviews highlighted"],
  hairdresser: ["Easy booking", "Before/after gallery", "Mobile‑first"],
  "general-contractor": ["Project showcase", "Simple quote requests", "Service pages (SEO)"],
};

export function generateStaticParams() {
  return TRADES.map((t) => ({ trade: t }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const label = LABELS[params.trade] || params.trade;
  const title = `Website for ${label}: Get More Qualified Leads`;
  const desc = `Fast ${label.toLowerCase()} websites with local SEO and conversion in mind. Get more qualified inquiries in 90 days.`;
  return {
    title: `${title} — smarterlogicweb.com`,
    description: desc,
    alternates: {
      canonical: `/en/website/${params.trade}`,
    },
    openGraph: {
      url: `https://smarterlogicweb.com/en/website/${params.trade}`,
      title: `${title} — smarterlogicweb.com`,
      description: desc,
    },
  };
}

export default function TradePageEN({ params }: PageProps) {
  const trade = params.trade;
  const label = LABELS[trade] || trade;
  const benefits = BENEFITS[trade] || [];

  const otherLinks = (Object.keys(LABELS) as string[])
    .filter((t) => t !== trade)
    .map((t) => ({ slug: t, label: LABELS[t] || t }));

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
          Website for {label}: Get More Qualified Leads
        </h1>
        <p className="mt-4 text-foreground/80">
          Fast site, local SEO and clear calls to action — designed to generate inquiries for your {label.toLowerCase()} business.
        </p>
        {benefits.length > 0 && (
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            {benefits.map((b) => (
              <li key={b} className="rounded-full border border-foreground/15 bg-card px-3 py-1 text-foreground/80">
                {b}
              </li>
            ))}
          </ul>
        )}
        {otherLinks.length > 0 && (
          <div className="mt-5 text-sm text-foreground/70">
            Other trades:{" "}
            {otherLinks.map((o, i) => (
              <React.Fragment key={o.slug}>
                <Link className="link-underline" href={`/en/website/${o.slug}`}>{o.label}</Link>
                {i < otherLinks.length - 1 ? " · " : ""}
              </React.Fragment>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials (EN) */}
      <section className="mt-10">
        <TestimonialsSimpleEN />
      </section>
    </div>
  );
}