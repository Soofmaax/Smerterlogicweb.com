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

  return (
    <section className={["mx-auto w-full max-w-3xl px-6 py-6", className].filter(Boolean).join(" ")}>
      <div className="rounded-2xl card-elevated border bg-card p-5">
        <h3 className="font-heading text-lg font-semibold">
          {isFr ? "Citation & réutilisation du contenu" : "Citation & content reuse"}
        </h3>
        <p className="mt-2 text-sm text-foreground/80">
          {isFr
            ? "Vous pouvez citer un extrait court de cet article en mentionnant « smarterlogicweb » et en ajoutant un lien vers la source."
            : "You may quote a short excerpt from this article by mentioning “smarterlogicweb” and linking back to the source."}
        </p>
        <p className="mt-1 text-sm text-foreground/80">
          {isFr
            ? "Toute reproduction substantielle (chapeau, section entière, tableau/visuel) ou usage commercial nécessite une autorisation écrite préalable."
            : "Any substantial reproduction (lede, full section, table/visual) or commercial use requires prior written permission."}
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
        </div>
      </div>
    </section>
  );
}