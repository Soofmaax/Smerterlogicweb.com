import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { track } from "@/lib/analytics";

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
        <div id="vitrine" className="rounded-[28px] border bg-card p-6 shadow-sm scroll-mt-28">
          <h3 className="font-heading text-xl font-semibold">Fast showcase site</h3>
          <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
            <li>Next.js + Tailwind CSS</li>
            <li>Core pages: Home, Services, About, Contact</li>
            <li>Technical SEO, Lighthouse performance</li>
            <li>Delivery in 2–3 weeks</li>
          </ul>
        </div>
        <div id="refonte" className="rounded-[28px] border bg-card p-6 shadow-sm scroll-mt-28">
          <h3 className="font-heading text-xl font-semibold">Redesign & optimisation</h3>
          <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
            <li>UX, accessibility (WCAG) and performance audits</li>
            <li>Cleaner design, stronger visual hierarchy</li>
            <li>Improved search ranking</li>
            <li>Migration to Next.js when relevant</li>
          </ul>
        </div>
        <div id="accompagnement" className="rounded-[28px] border bg-card p-6 shadow-sm scroll-mt-28">
          <h3 className="font-heading text-xl font-semibold">Ongoing support</h3>
          <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
            <li>Updates, content, evolutions</li>
            <li>A/B improvements and conversion tracking</li>
            <li>Priority support</li>
            <li>Flexible monthly retainer</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" className="rounded-full">
          <Link href="mailto:contact@smarterlogicweb.com?subject=Web%20services%20quote" onClick={() => track("cta_devis_mailto_services")}>
            Get my free quote
          </Link>
        </Button>
      </div>
    </section>
  );
}