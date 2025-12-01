import Link from "next/link";

export const metadata = {
  title: "FAQ — smarterlogicweb.com",
  description:
    "Answers to common questions: pricing, timelines, maintenance, SEO and results.",
  alternates: {
    canonical: "/en/faq",
    languages: {
      "en-US": "/en/faq",
      "fr-FR": "/faq",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/faq",
    title: "FAQ — smarterlogicweb.com",
    description:
      "Answers to common questions: pricing, timelines, maintenance, SEO and results.",
  },
};

export default function FAQENPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">FAQ</h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground/80">
        Practical answers to the most frequent questions. If you don’t find your answer, contact me — I reply within 24h.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">Pricing</h2>
          <ul className="mt-2 list-disc pl-5 text-foreground/80">
            <li>
              Typical range: 1,490€ to 4,990€ VAT‑incl depending on scope. See{" "}
              <Link href="/tarifs-2025" className="underline">pricing</Link>.
            </li>
            <li>
              Payment in 3 parts: 30% on signature, 40% mid‑project, 30% on delivery.
            </li>
            <li>
              No hidden fees. Hosting may be billed monthly after the first year (20€/month), domain ~15€/year.
            </li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">Timelines</h2>
          <ul className="mt-2 list-disc pl-5 text-foreground/80">
            <li>Showcase site: 2–3 weeks; Business: 3–4 weeks; Premium: 4–6 weeks.</li>
            <li>Process: free audit → tailored quote → design + integration → delivery + training.</li>
            <li>You provide content (copy, visuals); I can help if needed (optional add‑ons).</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">Maintenance and hosting</h2>
          <ul className="mt-2 list-disc pl-5 text-foreground/80">
            <li>Static sites: no CMS upkeep required; professional hosting (Netlify/Vercel).</li>
            <li>WordPress: regular maintenance recommended (updates, backups, security). See{" "}
              <Link href="/blog/forfait-maintenance-site-vitrine" className="underline">maintenance contents</Link>{" "}
              and{" "}
              <Link href="/blog/cout-maintenance-site-web" className="underline">maintenance costs</Link>.
            </li>
            <li>Bug‑fix warranty included at delivery (duration varies by offer).</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">SEO & results</h2>
          <ul className="mt-2 list-disc pl-5 text-foreground/80">
            <li>Technical SEO included; natural ranking impact in ~2–3 months.</li>
            <li>Clear content + fast performance = more qualified leads. Typical +30–50% enquiries after 3 months.</li>
            <li>Optional ads to accelerate; not mandatory for local artisans/SMBs.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-[24px] border bg-card p-6">
        <h3 className="font-heading text-2xl font-semibold">Didn’t find your answer?</h3>
        <p className="mt-2 text-foreground/80">Ask me — I answer within 24h.</p>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/en/contact"
            className="inline-flex items-center justify-center rounded-full border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Ask a question
          </Link>
          <a
            href="mailto:contact@smarterlogicweb.com?subject=Question%20about%20web%20services"
            className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm transition hover:bg-accent"
          >
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}