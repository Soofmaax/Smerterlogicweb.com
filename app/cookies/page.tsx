export const metadata = {
  title: "Paramètres cookies — smarterlogicweb.com",
  description: "Gérez vos préférences de cookies: mesure d’audience et traceurs marketing, en conformité avec le RGPD/CNIL.",
  alternates: {
    canonical: "/cookies",
    languages: {
      "fr-FR": "/cookies",
      "en-US": "/en/cookies",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/cookies",
    title: "Paramètres cookies — smarterlogicweb.com",
    description: "Gérez vos préférences de cookies: mesure d’audience et traceurs marketing, en conformité avec le RGPD/CNIL.",
  },
};

import { CookieConsentOpenButton } from "@/components/site/cookie-consent-open";

export default function CookiesSettingsPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Paramètres cookies</h1>

      <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
        <p>
          Vous pouvez gérer ici vos préférences en matière de cookies et de traceurs, conformément au RGPD et aux
          recommandations de la CNIL. Nous n’activons la mesure d’audience ou les traceurs marketing que si vous y{" "}
          consentez explicitement.
        </p>

        <h2>Catégories</h2>
        <ul>
          <li>
            <strong>Mesure d’audience (Analytics)</strong> : nous utilisons Google Analytics (avec anonymisation IP) ou
            des solutions respectueuses (Plausible/Umami).
          </li>
          <li>
            <strong>Marketing (pixels publicitaires)</strong> : traceurs optionnels (ex. Meta/LinkedIn) pour mesurer
            l’efficacité des campagnes. Non activés par défaut.
          </li>
        </ul>

        <h2>Modifier vos préférences</h2>
        <p>
          Utilisez le bouton ci-dessous pour ouvrir le panneau de consentement et ajuster vos préférences (Tout accepter,
          Tout refuser, Personnaliser).
        </p>
      </div>

      <div className="mt-6">
        <CookieConsentOpenButton />
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Voir aussi la <a href="/politique-de-confidentialite" className="underline">politique de confidentialité</a>.
      </p>
    </section>
  );
}