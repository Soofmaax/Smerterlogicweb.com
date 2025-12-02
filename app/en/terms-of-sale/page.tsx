import Link from "next/link";

export const metadata = {
  title: "Terms of Sale — smarterlogicweb.com",
  description:
    "Terms of sale for web services: design, redesign, and ongoing support. Scope, pricing, delivery, and responsibilities.",
  alternates: {
    canonical: "/en/terms-of-sale",
    languages: {
      "en-US": "/en/terms-of-sale",
      "fr-FR": "/cgv",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/terms-of-sale",
    title: "Terms of Sale — smarterlogicweb.com",
    description:
      "Terms of sale for web services: design, redesign, and ongoing support.",
  },
};

export default function TermsOfSalePage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Terms of Sale</h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground/80">
        These terms govern web services provided by smarterlogicweb (design, redesign, support). They apply to
        any accepted quote and confirmed order.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">1. Quote, order and scope</h2>
          <p className="mt-2 text-foreground/80">
            A detailed quote is provided (pricing, scope, timeline). The order becomes firm upon signature and initial
            payment. Any change beyond the initial scope requires a written addendum and approval.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">2. Pricing and payment</h2>
          <p className="mt-2 text-foreground/80">
            Unless otherwise stated, payments are split: 30% at signature, 40% mid‑project, 30% upon delivery.
            Prices include VAT where applicable. Late payment may temporarily pause work and/or go‑live.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">3. Content and approvals</h2>
          <p className="mt-2 text-foreground/80">
            Client provides necessary content (copy, visuals, logos) and validates each milestone within reasonable
            time. Substantial changes after mockup or integration approval may incur an extra quote.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">4. Intellectual property and source code</h2>
          <p className="mt-2 text-foreground/80">
            Unless stated otherwise, once fully paid, the delivered source code and final site belong to the client.
            Frameworks and open‑source libraries remain under their respective licenses.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">5. Hosting, maintenance and warranty</h2>
          <p className="mt-2 text-foreground/80">
            Hosting is provided on professional platforms (Netlify/Vercel). The first year may be included depending on
            the offer, then billed as a subscription. Static sites do not require CMS maintenance. A bug‑fix warranty
            is included at delivery (duration varies with the offer).
          </p>
          <p className="mt-2 text-foreground/80">
            For WordPress sites, regular technical maintenance is recommended (updates, backups, security).
            See{" "}
            <Link href="/blog/forfait-maintenance-site-vitrine" className="underline">
              maintenance package contents
            </Link>{" "}
            and{" "}
            <Link href="/blog/cout-maintenance-site-web" className="underline">
              maintenance costs
            </Link>
            .
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">6. Personal data</h2>
          <p className="mt-2 text-foreground/80">
            Any data processing during the engagement complies with GDPR. See the{" "}
            <Link href="/en/privacy-policy" className="underline">
              privacy policy
            </Link>
            .
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">7. Liability</h2>
          <p className="mt-2 text-foreground/80">
            Obligations are best‑effort. Client remains responsible for published content, legal notices, and accuracy
            of information. No liability is assumed in case of force majeure (external outage, hosting provider incident, etc.).
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">8. References</h2>
          <p className="mt-2 text-foreground/80">
            Unless expressly objected to, the provider may cite the project as a reference (non‑sensitive visuals,
            screenshots, anonymised metrics). Any removal request will be honoured.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">9. Applicable law</h2>
          <p className="mt-2 text-foreground/80">
            These terms fall under French law. In case of dispute, an amicable solution is preferred; failing that,
            competent courts are those of the provider’s jurisdiction.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Last update: 2025. For any question, email{" "}
        <Link href="mailto:contact@smarterlogicweb.com" className="underline">
          contact@smarterlogicweb.com
        </Link>
        .
      </p>
    </section>
  );
}