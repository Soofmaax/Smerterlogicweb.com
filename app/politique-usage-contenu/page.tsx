import Link from "next/link";

export const metadata = {
  title: "Politique de citation & réutilisation du contenu — smarterlogicweb.com",
  description:
    "Conditions de citation, attribution et reproduction des articles du blog. Extraits courts avec lien autorisés; reproduction substantielle sur autorisation.",
  alternates: {
    canonical: "/politique-usage-contenu",
    languages: {
      "fr-FR": "/politique-usage-contenu",
      "en-US": "/en/content-usage-policy",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/politique-usage-contenu",
    title: "Politique de citation & réutilisation du contenu — smarterlogicweb.com",
    description:
      "Conditions de citation, attribution et reproduction des articles du blog. Extraits courts avec lien autorisés; reproduction substantielle sur autorisation.",
  },
};

export default function ContentUsagePolicyFR() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
        Politique de citation & réutilisation du contenu
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground/80">
        Les articles publiés sur smarterlogicweb sont protégés par le droit d’auteur. Nous encourageons la citation avec
        attribution et lien, mais encadrons la reproduction pour préserver la qualité éditoriale et le référencement.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">1. Courte citation (autorisée)</h2>
          <p className="mt-2 text-foreground/80">
            Vous pouvez citer un <strong>extrait court</strong> (quelques phrases, ≤ 300 mots) d’un article, à condition de&nbsp;:
          </p>
          <ul className="mt-2 list-disc pl-5 text-foreground/80">
            <li>mentionner <strong>smarterlogicweb</strong> comme source;</li>
            <li>inclure un <strong>lien</strong> vers l’article d’origine (URL canonique);</li>
            <li>ne pas modifier le sens de l’extrait ni le présenter hors contexte.</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">2. Reproduction substantielle (sur autorisation)</h2>
          <p className="mt-2 text-foreground/80">
            Toute <strong>reproduction substantielle</strong> (section entière, chapeau complet, tableaux/visuels, ou
            agrégation systématique) ainsi que tout <strong>usage commercial</strong> nécessitent une{" "}
            <strong>autorisation écrite préalable</strong>.
          </p>
          <p className="mt-2 text-foreground/80">
            Contactez-nous à{" "}
            <Link href="mailto:contact@smarterlogicweb.com" className="underline">
              contact@smarterlogicweb.com
            </Link>{" "}
            avec le lien de l’article, l’usage envisagé, et l’emplacement de publication.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">3. Modifications et dérivés</h2>
          <p className="mt-2 text-foreground/80">
            La modification du texte, la création d’œuvres dérivées ou la redistribution sans lien vers la source ne
            sont <strong>pas autorisées</strong> sans accord explicite.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">4. Attribution recommandée</h2>
          <p className="mt-2 text-foreground/80">
            Exemple d’attribution conforme pour une courte citation&nbsp;:
          </p>
          <blockquote className="mt-2 rounded-lg border bg-muted/40 p-4 text-sm text-foreground/80">
            « Extrait… » — smarterlogicweb,{" "}
            <Link href="/blog/roi-site-vitrine-tpe" className="underline">
              Votre site servira‑t‑il réellement vos objectifs business ?
            </Link>{" "}
            (consulté le JJ/MM/AAAA).
          </blockquote>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">5. Juridique</h2>
          <p className="mt-2 text-foreground/80">
            Cette politique respecte le Code de la propriété intellectuelle (France). Les exceptions de courte citation
            s’appliquent sous réserve d’attribution et de proportionnalité.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Dernière mise à jour : 2025. Pour toute demande, écrivez à{" "}
        <Link href="mailto:contact@smarterlogicweb.com" className="underline">
          contact@smarterlogicweb.com
        </Link>
        .
      </p>
    </section>
  );
}