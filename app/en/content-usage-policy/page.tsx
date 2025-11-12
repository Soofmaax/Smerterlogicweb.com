import Link from "next/link";

export const metadata = {
  title: "Citation & content reuse policy — smarterlogicweb.com",
  description:
    "How to quote and reuse our blog content: short excerpts allowed with link and attribution; substantial reproduction and commercial use require permission.",
  alternates: {
    canonical: "/en/content-usage-policy",
    languages: {
      "en-US": "/en/content-usage-policy",
      "fr-FR": "/politique-usage-contenu",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/content-usage-policy",
    title: "Citation & content reuse policy — smarterlogicweb.com",
    description:
      "Short excerpts allowed with link and attribution; substantial reproduction and commercial use require permission.",
  },
};

export default function ContentUsagePolicyEN() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Citation & content reuse policy</h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground/80">
        Our articles are protected by copyright. We encourage quoting with attribution and a link back to the source,
        while controlling reproduction to preserve editorial quality and SEO.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">1. Short quotes (allowed)</h2>
          <p className="mt-2 text-foreground/80">
            You may quote a <strong>short excerpt</strong> (a few sentences, ≤ 300 words) provided that you:
          </p>
          <ul className="mt-2 list-disc pl-5 text-foreground/80">
            <li>mention <strong>smarterlogicweb</strong> as the source;</li>
            <li>include a <strong>link</strong> to the original article (canonical URL);</li>
            <li>do not alter the meaning nor present the quote out of context.</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">2. Substantial reproduction (permission required)</h2>
          <p className="mt-2 text-foreground/80">
            Any <strong>substantial reproduction</strong> (full sections, lead paragraph, tables/visuals, or systematic
            aggregation) and any <strong>commercial use</strong> require <strong>prior written permission</strong>.
          </p>
          <p className="mt-2 text-foreground/80">
            Please email{" "}
            <Link href="mailto:contact@smarterlogicweb.com" className="underline">
              contact@smarterlogicweb.com
            </Link>{" "}
            with the article link, intended use, and publication location.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">3. Modifications and derivatives</h2>
          <p className="mt-2 text-foreground/80">
            Modifying the text, creating derivative works, or redistributing without linking back to the source are{" "}
            <strong>not allowed</strong> without explicit approval.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">4. Recommended attribution</h2>
          <p className="mt-2 text-foreground/80">Example of compliant attribution for a short quote:</p>
          <blockquote className="mt-2 rounded-lg border bg-muted/40 p-4 text-sm text-foreground/80">
            “Excerpt…” — smarterlogicweb,{" "}
            <Link href="/blog/website-launch-timeline" className="underline">
              How long to get your website live?
            </Link>{" "}
            (accessed DD/MM/YYYY).
          </blockquote>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">5. Legal</h2>
          <p className="mt-2 text-foreground/80">
            This policy aligns with applicable copyright law. Short quote exceptions apply subject to attribution and
            proportionality.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Last update: 2025. For any request, email{" "}
        <Link href="mailto:contact@smarterlogicweb.com" className="underline">
          contact@smarterlogicweb.com
        </Link>
        .
      </p>
    </section>
  );
}