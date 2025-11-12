"use client";

import Link from "next/link";

type Props = {
  className?: string;
  locale?: "fr" | "en";
  articleSlug: string;
};

export function CitationBox({ className, locale = "fr", articleSlug }: Props) {
  const isFr = locale === "fr";
  const policyHref = isFr ? "/politique-usage-contenu" : "/en/content-usage-policy";
  const articleHref = `/blog/${articleSlug}`;
  const ccByHref = "https://creativecommons.org/licenses/by/4.0/";

  return (
    <section className={["mx-auto w-full max-w-3xl px-6 py-6", className].filter(Boolean).join(" ")}>
      <div className="rounded-2xl card-elevated border bg-card p-5">
        <h3 className="font-heading text-lg font-semibold">
          {isFr ? "Citation & réutilisation du contenu" : "Citation & content reuse"}
        </h3>
        <p className="mt-2 text-sm text-foreground/80">
          {isFr
            ? "Licence CC BY 4.0 : réutilisation, adaptation et usage commercial autorisés avec attribution (auteur + lien source + lien licence)."
            : "CC BY 4.0 license: reuse, adaptation and commercial use permitted with attribution (author + source link + license link)."}
        </p>
        <div className="mt-3 text-sm">
          <span className="text-muted-foreground">{isFr ? "Source :" : "Source:"} </span>
          <Link href={articleHref} className="text-primary hover:underline">
            {articleHref}
          </Link>
          <span className="text-muted-foreground"> · </span>
          <Link href={policyHref} className="text-primary hover:underline">
            {isFr ? "Politique détaillée" : "Detailed policy"}
          </Link>
          <span className="text-muted-foreground"> · </span>
          <Link href={ccByHref} className="text-primary hover:underline" target="_blank" rel="noopener">
            CC BY 4.0
          </Link>
        </div>
      </div>
    </section>
  );
}