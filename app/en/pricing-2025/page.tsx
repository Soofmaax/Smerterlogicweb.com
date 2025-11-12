import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Particles } from "@/components/site/particles";
import { PricingOffersEN } from "@/components/site/pricing-offers-en";
import { ServicesCompareEN } from "@/components/site/services-compare-en";
import { FAQServicesEN } from "@/components/site/faq-services-en";
import { BookingButton } from "@/components/site/booking-modal";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";
import { Guarantee } from "@/components/site/guarantee";
import { FinalCTA } from "@/components/site/final-cta";
import { StickyMobileCTA } from "@/components/site/sticky-mobile-cta";
import { EVOLUTION_MONTHLY_EUR } from "@/data/pricing";
import { PdfDownloadButton } from "@/components/site/pdf-download-button";

export const metadata = {
  title: "Pricing 2025 — smarterlogicweb.com",
  description:
    "Static websites for professional services (lawyers, accountants, architects). No mandatory technical maintenance, guaranteed performance, SEO and delivery timelines.",
  alternates: {
    canonical: "/en/pricing-2025",
    languages: {
      "en-US": "/en/pricing-2025",
      "fr-FR": "/tarifs-2025",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/pricing-2025",
    title: "Pricing 2025 — smarterlogicweb.com",
    description:
      "Static websites for professional services (lawyers, accountants, architects). No mandatory maintenance, performance and SEO at the core.",
  },
};

export default function Pricing2025ENPage() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="px-3 py-1">Pricing 2025</Badge>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">
          Static sites for Professional Services
        </h1>
        <p className="mt-4 text-foreground/80">
          Lawyers, accountants, architects — fast, secure sites with SEO and conversion. No mandatory technical
          maintenance.
        </p>
      </section>

      {/* Our difference — WordPress vs Static */}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">Our difference</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border bg-card p-6 card-elevated">
            <h3 className="font-heading text-lg font-semibold">Classic WordPress</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
              <li>Build: €1,500</li>
              <li>Maintenance (3 years): €1,800 (€290–€600/year)</li>
              <li className="font-semibold">Total 3 years: €3,300</li>
            </ul>
          </article>
          <article className="rounded-2xl border bg-card p-6 card-elevated">
            <h3 className="font-heading text-lg font-semibold">Our professional static site</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
              <li>Build: €2,490</li>
              <li>Maintenance: €0 (no mandatory updates)</li>
              <li className="font-semibold">Total 3 years: €2,490</li>
            </ul>
            <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-400 font-medium">Save €810 and get a faster, more secure site.</p>
          </article>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Static sites = no database, no plugins, no CMS to maintain. Intrinsic security and long‑term reliability.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Learn more:{" "}
          <Link href="/en/blog/cout-maintenance-site-web" className="text-primary hover:underline">maintenance cost</Link>
          {" · "}
          <Link href="/en/blog/contenu-forfait-maintenance-site-web" className="text-primary hover:underline">maintenance plan contents</Link>
          {" · "}
          <Link href="/en/blog/frais-caches-site-internet" className="text-primary hover:underline">hidden costs after delivery</Link>.
        </p>
      </section>

      {/* Offers & pricing */}
      <section id="pricing" className="mt-10">
        <PricingOffersEN />
        <div className="mt-6 rounded-2xl border bg-card p-6 card-elevated">
          <h3 className="font-heading text-lg font-semibold">Get the pricing grid PDF by email</h3>
          <p className="mt-1 text-sm text-foreground/80">
            Download the 2025 Pricing Grid and receive it by email to share internally.
          </p>
          <div className="mt-3">
            <PdfDownloadButton slug="grille-tarifs-2025" label="Receive the 2025 Pricing Grid (PDF)" />
          </div>
        </div>
      </section>

      {/* Evolution plan */}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">Optional: Evolution plan</h2>
        <div className="mt-4 rounded-2xl border bg-card p-6 card-elevated">
          <p className="text-sm text-foreground/80">
            €{EVOLUTION_MONTHLY_EUR}/month, no commitment — 1h of changes per month (text, images, sections), hours roll
            over for 3 months, priority support, monitoring (uptime, speed), and preferential rates (−30% redesign, −25%
            features, SEO article €99).
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Included for 6 months with the Premium plan. Available after site delivery (SEPA auto‑debit).
          </p>
        </div>
      </section>

      {/* Payment terms */}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">Payment terms</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border bg-card p-6 card-elevated">
            <h3 className="font-heading text-lg font-semibold">Essential — €1,490 incl. VAT</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80">
              <li>50% at signature — €745</li>
              <li>50% at delivery — €745</li>
            </ul>
          </article>
          <article className="rounded-2xl border bg-card p-6 card-elevated">
            <h3 className="font-heading text-lg font-semibold">Professional — €2,490 incl. VAT</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80">
              <li>50% at signature — €1,245</li>
              <li>30% at mockup validation — €747</li>
              <li>20% at delivery — €498</li>
            </ul>
          </article>
          <article className="rounded-2xl border bg-card p-6 card-elevated">
            <h3 className="font-heading text-lg font-semibold">Premium — €4,990 incl. VAT</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80">
              <li>40% at signature — €1,996</li>
              <li>30% at mockup validation — €1,497</li>
              <li>20% at mid‑testing — €998</li>
              <li>10% at delivery — €499</li>
            </ul>
          </article>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          No payment beyond 4 installments. Prices incl. VAT — VAT non‑applicable (art. 293 B of the CGI if micro‑company).
        </p>
      </section>

      {/* Comparison */}
      <section className="mt-10">
        <ServicesCompareEN />
      </section>

      {/* Guarantee */}
      <div className="mt-6">
        <Guarantee />
      </div>

      {/* FAQ */}
      <section id="faq" className="mt-6 scroll-mt-24">
        <FAQServicesEN />
      </section>

      {/* How to order */}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">How to order</h2>
        <ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80 space-y-1.5">
          <li>Choose your plan (Essential, Professional or Premium)</li>
          <li>Contact us: <Link href="/en/contact" className="link-underline link-underline-strong">smarterlogicweb.com/en/contact</Link></li>
          <li>Project scoping (30–45 min — call/online)</li>
          <li>Detailed line‑by‑line quote + delivery timeline</li>
          <li>E‑signature + deposit payment</li>
          <li>Start within 7 days (2 weeks for Premium)</li>
        </ol>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookingButton className="rounded-full btn-pulse" size="lg" label="Book my free audit (15 min)" />
          <Button asChild className="rounded-full" variant="secondary">
            <a href="mailto:contact@smarterlogicweb.com?subject=Quote%20—%20Static%20site%20Pricing%202025">Request a quote by email</a>
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <GoogleReviewsBadge />
        </div>
      </section>

      {/* Target clients */}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">Target clients</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-foreground/80 space-y-1.5">
          <li>Law firms (business, employment, family)</li>
          <li>Accountants and statutory auditors</li>
          <li>Architects and interior architects</li>
          <li>Notaries and legal professionals</li>
          <li>Consultants and regulated professional services</li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          Multi‑sector SEO: the site aims to capture clients via targeted queries (local and national).
        </p>
      </section>

      <FinalCTA />

      {/* Quick links — bottom of page */}
      <section className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h3 className="font-heading text-xl font-semibold">Further reading</h3>
          <p className="mt-2 text-sm text-foreground/80">Maintenance, costs and guarantees — quick links:</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <Link href="/en/blog/cout-maintenance-site-web" className="text-primary hover:underline">
              Website maintenance cost
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/en/blog/contenu-forfait-maintenance-site-web" className="text-primary hover:underline">
              Maintenance plan contents
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/en/blog/frais-caches-site-internet" className="text-primary hover:underline">
              Hidden costs after delivery
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/en/pricing-2025" className="text-primary hover:underline">
              Pricing 2025
            </Link>
          </div>
        </div>
      </section>

      <StickyMobileCTA />
    </div>
  );
}