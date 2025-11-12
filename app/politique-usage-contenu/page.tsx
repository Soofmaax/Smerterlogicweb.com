import Link from "next/link";

export const metadata = {
  title: "Politique de citation & réutilisation du contenu — smarterlogicweb.com",
  description:
    "Licence Creative Commons Attribution 4.0 (CC BY 4.0) : réutilisation, adaptation et usage commercial autorisés avec attribution et lien vers la source.",
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
      "Licence Creative Commons Attribution 4.0 (CC BY 4.0) : réutilisation, adaptation et usage commercial autorisés avec attribution et lien vers la source.",
  },
};

export default function ContentUsagePolicyFR() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
        Politique de citation & réutilisation du contenu
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground/80">
        Sauf mention contraire, les articles du blog sont publiés sous licence{" "}
        <Link href="https://creativecommons.org/licenses/by/4.0/" className="underline" target="_blank" rel="noopener">
          Creative Commons Attribution 4.0 International (CC BY 4.0)
        </Link>
        . Cela signifie que vous pouvez <strong>réutiliser</strong>, <strong>adapter</strong> et <strong>partager</strong> le contenu, y compris à des fins
        commerciales, à condition de respecter l’<strong>attribution</strong>.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">1. Attribution (obligatoire)</h2>
          <p className="mt-2 text-foreground/80">
            Lors de toute réutilisation, vous devez :
          </p>
          <ul className="mt-2 list-disc pl-5 text-foreground/80">
            <li>mentionner <strong>l’auteur</strong> (ex. « Sonia ») et <strong>smarterlogicweb</strong> ;</li>
            <li>inclure un <strong>lien</strong> vers l’article d’origine (URL canonique) et vers la <strong>licence CC BY 4.0</strong> ;</li>
            <li>indiquer si des <strong>modifications</strong> ont été apportées.</li>
          </ul>
          <p className="mt-2 text-sm text-muted-foreground">
            Exemple : « Extrait adapté de [Titre] — Sonia, smarterlogicweb (URL de l’article), sous CC BY 4.0 ».
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">2. Réutilisation et adaptations</h2>
          <p className="mt-2 text-foreground/80">
            La licence CC BY 4.0 autorise la création d’œuvres dérivées et l’usage commercial, sous réserve d’attribution
            conforme. Merci d’éviter les réutilisations susceptibles de créer une confusion (plagiat, faux originaux).
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">3. Citation courte (bonnes pratiques)</h2>
          <p className="mt-2 text-foreground/80">
            Pour des citations courtes (≤ 300 mots), nous recommandons de conserver le contexte et de pointer vers la
            source. L’attribution reste requise.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">4. Mentions légales</h2>
          <p className="mt-2 text-foreground/80">
            Cette politique s’aligne sur la licence CC BY 4.0 (voir les{" "}
            <Link href="https://creativecommons.org/licenses/by/4.0/legalcode" className="underline" target="_blank" rel="noopener">
              termes légaux complets
            </Link>
            ). Pour toute réutilisation sensible (ex. anthologies, manuels), contactez-nous pour valider l’attribution.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Dernière mise à jour : 2025. Contact :{" "}
        <Link href="mailto:contact@smarterlogicweb.com" className="underline">
          contact@smarterlogicweb.com
        </Link>
        .
      </p>
    </section>
  );
}