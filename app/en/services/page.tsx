import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrackedLink } from "@/components/site/tracked-link";
import { BookingButton } from "@/components/site/booking-modal";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";
import { QuickLinksEN } from "@/components/site/quick-links-en";

export const metadata = {
  title: "Services — smarterlogicweb.com",
  description:
    "Showcase sites, redesigns, optimisation, ongoing support: web services that are simple, fast and results‑oriented.",
  alternates: {
    canonical: "/en/services",
    languages: {
      "en-US": "/en/services",
      "fr-FR": "/services",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/services",
    title: "Services — smarterlogicweb.com",
    description:
      "Showcase sites, redesigns, optimisation, ongoing support: simple, fast, results‑oriented.",
  },
};

export default function ServicesPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="px-3 py-1">Offer</Badge>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Custom sites — simple, fast, focused on results.
        </h1>
        <p className="mt-4 text-foreground/80">
          Clean interfaces, fast, SEO‑optimised and easy to maintain. You focus on your work — I handle the rest.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div id="vitrine" className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm scroll-mt-28">
          <h3 className="font-heading text-xl font-semibold">Fast showcase site</h3>
          <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
            <li>Next.js + Tailwind CSS</li>
            <li>Core pages: Home, Services, About, Contact</li>
            <li>Technical SEO, Lighthouse performance</li>
            <li>Delivery in 2–3 weeks</li>
          </ul>
        </div>
        <div id="refonte" className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm scroll-mt-28">
          <h3 className="font-heading text-xl font-semibold">Redesign & optimisation</h3>
          <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
            <li>UX, accessibility (WCAG) and performance audits</li>
            <li>Cleaner design, stronger visual hierarchy</li>
            <li>Improved search ranking</li>
            <li>Migration to Next.js when relevant</li>
          </ul>
        </div>
        <div id="accompagnement" className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm scroll-mt-28">
          <h3 className="font-heading text-xl font-semibold">Ongoing support</h3>
          <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
            <li>Updates, content, evolutions</li>
            <li>A/B improvements and conversion tracking</li>
            <li>Priority support</li>
            <li>Flexible monthly retainer</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 justify-center">
        <BookingButton className="rounded-full" size="lg" label="Book my free audit (15 min)" />
        <Button asChild size="lg" className="rounded-full">
          <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Web%20services%20quote" eventName="cta_devis_mailto_services">
            Get my free quote
          </TrackedLink>
        </Button>
        <div className="mt-2">
          <GoogleReviewsBadge />
        </div>
      </div>
    <FinalCTA />
    <QuickLinksEN />
    </section>
  );
}