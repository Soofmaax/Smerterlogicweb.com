import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FAQServicesEN } from "@/components/site/faq-services-en";
import { BookingButton } from "@/components/site/booking-modal";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";
import { Guarantee } from "@/components/site/guarantee";
import { FinalCTA } from "@/components/site/final-cta";
import { StickyMobileCTA } from "@/components/site/sticky-mobile-cta";
import { SITE_URL, CONTACT_EMAIL, BRAND_DOMAIN } from "@/config/site";

export const metadata = {
  title: "Pricing & quotes — static sites on quote only",
  description:
    "Static websites for professional services (lawyers, accountants, architects). All projects are now priced on a detailed quote after a short audit call.",
  alternates: {
    canonical: "/en/pricing-2025",
    languages: {
      "en-US": "/en/pricing-2025",
      "fr-FR": "/tarifs-2025",
    },
  },
  openGraph: {
    url: `${SITE_URL}/en/pricing-2025`,
    title: "Pricing & quotes — static sites on quote only",
    description:
      "No public price grid anymore: each project is scoped and priced individually, with a transparent line‑by‑line quote.",
  },
};

export default function Pricing2025ENPage() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="px-3 py-1">
          Pricing &amp; quotes
        </Badge>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">
          Static sites for professionals — by quote only
        </h1>
        <p className="mt-4 text-foreground/80">
          I no longer publish a detailed public price grid. Each project is now priced on a custom quote, after a short call to
          clarify your situation (new build vs redesign, content volume, languages, deadlines).
        </p>
      </section>

      {/* How pricing works now */}
      <section className="mt-10 mx-auto max-w-3xl space-y-4 text-sm text-foreground/80">
        <p>
          The positioning remains the same: fast, static showcase sites for professional services (law firms, accountants,
          architects, consultants). What changes is that the budget is no longer displayed as fixed packages — it is adapted to
          your actual scope instead.
        </p>
        <p>
          Practically, we start with a 15‑minute call (or email) to understand what you need. Based on this, you receive a
          written quote with a clear breakdown: pages, content help, integrations, and optional add‑ons if relevant. No hidden
          fees, no mandatory maintenance retainer.
        </p>
        <p className="text-sm text-muted-foreground">
          If you want to compare architectures (WordPress vs static vs others), the blog articles on costs and maintenance remain
          relevant — even though the exact amounts are now discussed on a case‑by‑case basis.
        </p>
      </section>

      {/* How to get a quote */}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">How to get your quote</h2>
        <ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80 space-y-1.5">
          <li>Book a short audit call (15&nbsp;min) or send an email with a few lines about your project.</li>
          <li>I review your current situation (existing site or not, content, goals, timeline) and ask a few focused questions.</li>
          <li>You receive a detailed line‑by‑line quote with a clear scope and options if needed.</li>
          <li>Once approved, we schedule the project and delivery milestones together.</li>
        </ol>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookingButton className="rounded-full btn-pulse" size="lg" label="Book a free audit (15 min)" />
          <Button asChild className="rounded-full" variant="secondary">
            <a href={`mailto:${CONTACT_EMAIL}?subject=Quote%20request%20—%20Static%20site`}>
              Request a quote by email
            </a>
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <GoogleReviewsBadge />
        </div>
      </section>

      {/* Maintenance & evolution plan */}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">Maintenance &amp; evolution</h2>
        <p className="mt-2 text-sm text-foreground/80">
          Static sites don’t require heavy ongoing technical maintenance (no CMS, no plugin stack to babysit). The only mandatory
          recurring cost is your domain name and, if needed, dedicated hosting depending on your traffic. Any ongoing evolution
          plan (for content changes, minor features, etc.) is proposed on quote, based on your real pace of change.
        </p>
      </section>

      {/* Guarantee & FAQ services (no amounts) */}
      <div className="mt-10">
        <Guarantee />
      </div>
      <section id="faq" className="mt-6 scroll-mt-24">
        <FAQServicesEN />
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
          </div>
        </div>
      </section>

      <StickyMobileCTA />
    </div>
  );
}