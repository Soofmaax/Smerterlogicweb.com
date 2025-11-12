import Link from "next/link";

export const metadata = {
  title: "Citation & content reuse policy — smarterlogicweb.com",
  description:
    "Creative Commons Attribution 4.0 (CC BY 4.0): reuse, adapt and commercial use permitted with attribution and a link to the source.",
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
      "Creative Commons Attribution 4.0 (CC BY 4.0): reuse, adapt and commercial use permitted with attribution and a link to the source.",
  },
};

export default function ContentUsagePolicyEN() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Citation & content reuse policy</h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground/80">
        Unless otherwise stated, our blog articles are published under{" "}
        <Link href="https://creativecommons.org/licenses/by/4.0/" className="underline" target="_blank" rel="noopener">
          Creative Commons Attribution 4.0 International (CC BY 4.0)
        </Link>
        . You may <strong>reuse</strong>, <strong>adapt</strong> and <strong>share</strong> the content, including commercially, provided you comply with{" "}
        <strong>attribution</strong>.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">1. Attribution (required)</h2>
          <p className="mt-2 text-foreground/80">For any reuse, you must:</p>
          <ul className="mt-2 list-disc pl-5 text-foreground/80">
            <li>name the <strong>author</strong> (e.g., “Sonia”) and <strong>smarterlogicweb</strong>;</li>
            <li>include a <strong>link</strong> to the original article (canonical URL) and to the <strong>CC BY 4.0 license</strong>;</li>
            <li>indicate if <strong>changes</strong> were made.</li>
          </ul>
          <p className="mt-2 text-sm text-muted-foreground">
            Example: “Adapted excerpt from [Title] — Sonia, smarterlogicweb (article URL), under CC BY 4.0.”
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">2. Reuse and adaptations</h2>
          <p className="mt-2 text-foreground/80">
            CC BY 4.0 allows derivative works and commercial use, provided attribution is compliant. Please avoid reuse
            that may cause confusion (plagiarism, false originals).
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">3. Short quotes (good practices)</h2>
          <p className="mt-2 text-foreground/80">
            For short quotes (≤ 300 words), we recommend preserving context and linking to the source. Attribution is
            still required.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">4. Legal</h2>
          <p className="mt-2 text-foreground/80">
            This policy aligns with CC BY 4.0 (see{" "}
            <Link href="https://creativecommons.org/licenses/by/4.0/legalcode" className="underline" target="_blank" rel="noopener">
              full legal terms
            </Link>
            ). For sensitive reuse (e.g., anthologies, manuals), contact us to validate attribution.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Last update: 2025. Contact:{" "}
        <Link href="mailto:contact@smarterlogicweb.com" className="underline">
          contact@smarterlogicweb.com
        </Link>
        .
      </p>
    </section>
  );
}