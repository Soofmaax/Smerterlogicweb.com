import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { MagneticZone } from "@/components/site/magnetic";
import { BookingButton } from "@/components/site/booking-modal";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";
import { Guarantee } from "@/components/site/guarantee";
import { FinalCTA } from "@/components/site/final-cta";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Particles } from "@/components/site/particles";
import { SITE_URL, BRAND_DOMAIN, COMPANY_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: `Carte de visite NFC & page de contact digitale — ${BRAND_DOMAIN}`,
  description:
    "Une carte de visite NFC reliée à une page de contact moderne : en un geste, vos prospects enregistrent vos coordonnées, visitent votre site et vous écrivent sur WhatsApp.",
  alternates: {
    canonical: "/carte-de-visite-nfc",
  },
  openGraph: {
    url: `${SITE_URL}/carte-de-visite-nfc`,
    title: `Carte de visite NFC & page de contact digitale — ${BRAND_DOMAIN}`,
    description:
      "Une carte de visite NFC reliée à une page de contact moderne : en un geste, vos prospects enregistrent vos coordonnées, visitent votre site et vous écrivent sur WhatsApp.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NfcBusinessCardPage() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* Fond animé léger */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="px-3 py-1">
          Carte de visite NFC
        </Badge>
        <Reveal className="reveal-fade-up">
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Une carte de visite qui ouvre votre page de contact en 1 geste
          </h1>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-4 text-foreground/80">
            Vous posez la carte sur la table, votre interlocuteur approche son téléphone, et il
            arrive sur une page claire avec vos coordonnées, un bouton WhatsApp et l&apos;ajout au
            répertoire en 2 secondes.
          </p>
        </Reveal>
      </div>

      {/* Fil d'Ariane */}
      <Breadcrumbs
        className="mt-4"
        items={[
          { label: "Accueil", href: "/" },
          { label: "Carte de visite NFC" },
        ]}
      />

      {/* Comment ça fonctionne */}
      <div className="mx-auto mt-10 max-w-4xl">
        <Reveal className="reveal-fade-up">
          <article className="rounded-[24px] border bg-card p-6">
            <h2 className="h2-underline inline-block font-heading text-3xl font-semibold md:text-4xl">
              Comment ça fonctionne&nbsp;?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              La carte de visite NFC remplace (ou complète) vos cartes papier. Elle contient un lien
              vers votre page de contact dédiée. Lorsqu&apos;on approche un smartphone compatible,
              cette page s&apos;ouvre automatiquement.
            </p>
            <ol className="mt-4 space-y-3 text-sm text-foreground/80">
              <li>1. Nous configurons votre page de contact digitale personnalisée.</li>
              <li>2. Nous programmons la carte NFC (et un QR code si besoin) avec cette adresse.</li>
              <li>
                3. Vos contacts scannent la carte et enregistrent vos informations en quelques
                secondes.
              </li>
            </ol>
          </article>
        </Reveal>
      </div>

      {/* Ce que contient la page de contact */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal className="reveal-fade-up">
          <article className="rounded-[24px] border bg-card p-6">
            <h2 className="font-heading text-2xl font-semibold">
              Une page de contact pensée pour le mobile
            </h2>
            <p className="mt-3 text-sm text-foreground/80">
              La page vers laquelle pointe la carte de visite NFC est optimisée pour les téléphones
              et reprend l&apos;essentiel, sans distraction.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>• Votre nom, fonction et nom d&apos;entreprise</li>
              <li>• Lien direct vers votre site</li>
              <li>• Bouton &quot;Enregistrer le contact&quot; (vCard)</li>
              <li>• Bouton WhatsApp en un tap si le numéro est public</li>
              <li>• Design cohérent avec votre site et votre branding</li>
            </ul>
            <div className="mt-4">
              <Button
                asChild
                variant="ghost"
                className="px-0 text-sm text-primary hover:bg-transparent"
              >
                <Link href="/carte-contact">Voir un exemple de page de contact</Link>
              </Button>
            </div>
          </article>
        </Reveal>

        <Reveal className="reveal-fade-up">
          <article className="rounded-[24px] border bg-card p-6">
            <h2 className="font-heading text-2xl font-semibold">Pour qui c&apos;est utile&nbsp;?</h2>
            <p className="mt-3 text-sm text-foreground/80">
              La carte de visite NFC est particulièrement pertinente si vos clients vous découvrent
              en face-à-face ou lors d&apos;événements.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>• Solopreneurs et freelances (consultants, coachs, thérapeutes...)</li>
              <li>• Commerces, cabinets et professions libérales</li>
              <li>• Réseaux d&apos;affaires, salons, événements professionnels</li>
            </ul>
          </article>
        </Reveal>
      </div>

      {/* Intégration avec votre site */}
      <div className="mx-auto mt-10 max-w-4xl">
        <Reveal className="reveal-fade-up">
          <article className="rounded-[24px] border bg-card p-6">
            <h2 className="font-heading text-2xl font-semibold">
              Intégrée à votre site vitrine (ou en option séparée)
            </h2>
            <p className="mt-3 text-sm text-foreground/80">
              La page de contact digitale peut être incluse dès la conception de votre site ou
              ajoutée ensuite comme évolution. La carte NFC est alors le support physique qui
              renvoie vers cette page.
            </p>
            <p className="mt-3 text-sm text-foreground/80">
              Vous pouvez&nbsp;:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>• Ajouter l&apos;option carte de visite NFC à un projet de site en cours</li>
              <li>• La commander seule si vous avez déjà un site compatible</li>
              <li>• Faire évoluer le contenu de la page sans réimprimer de cartes</li>
            </ul>
          </article>
        </Reveal>
      </div>

      {/* Bloc coût & prise de contact */}
      <div className="mt-12">
        <div className="rounded-[28px] card-elevated border bg-card p-6">
          <MagneticZone>
            <div className="grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
              <div>
                <h2 className="font-heading text-2xl font-semibold">
                  Combien coûte une carte de visite NFC&nbsp;?
                </h2>
                <p className="mt-3 text-sm text-foreground/80">
                  Le tarif dépend de ce que vous avez déjà (site existant, identité visuelle) et du
                  nombre de cartes nécessaires. L&apos;objectif reste le même que pour vos projets
                  web : un investissement raisonnable qui vous sert au quotidien.
                </p>
                <p className="mt-3 text-sm text-foreground/80">
                  Nous voyons ensemble si c&apos;est pertinent pour vous, et comment l&apos;intégrer
                  à votre stratégie globale (site, rendez-vous, événements).
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <BookingButton
                    className="rounded-full btn-lift"
                    label="Parler de votre projet de carte NFC"
                  />
                  <Button asChild className="rounded-full btn-lift" variant="secondary">
                    <Link href="/contact">Envoyer un message</Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <GoogleReviewsBadge />
                <p className="max-w-xs text-xs text-muted-foreground">
                  Basé à Nantes, j&apos;accompagne des TPE, indépendants et professions libérales
                  partout en France.
                </p>
              </div>
            </div>
          </MagneticZone>
        </div>
      </div>

      {/* Garantie */}
      <div className="mt-12">
        <Guarantee />
      </div>

      {/* CTA final global */}
      <div className="mt-12">
        <FinalCTA />
      </div>
    </section>
  );
}