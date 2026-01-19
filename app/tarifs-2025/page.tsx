import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FAQServices } from "@/components/site/faq-services";
import { BookingButton } from "@/components/site/booking-modal";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";
import { Guarantee } from "@/components/site/guarantee";
import { FinalCTA } from "@/components/site/final-cta";
import { StickyMobileCTA } from "@/components/site/sticky-mobile-cta";
import { SITE_URL, CONTACT_EMAIL, BRAND_DOMAIN } from "@/config/site";

export const metadata = {
  title: "Tarifs & devis — sites vitrines statiques sur devis",
  description:
    "Les projets sont désormais chiffrés uniquement sur devis détaillé, après un audit rapide de votre situation (création ou refonte, contenu, délais).",
  alternates: {
    canonical: "/tarifs-2025",
    languages: {
      "fr-FR": "/tarifs-2025",
      "en-US": "/en/services",
    },
  },
  openGraph: {
    url: `${SITE_URL}/tarifs-2025`,
    title: `Tarifs & devis — sites vitrines statiques sur devis — ${BRAND_DOMAIN}`,
    description:
      "Tous les projets sont chiffrés sur devis détaillé après un audit rapide, sans grille tarifaire publique ni surprise en cours de route.",
  },
};

export default function Tarifs2025Page() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* Hero background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="px-3 py-1">
          Tarifs &amp; devis
        </Badge>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">
          Sites vitrines statiques — sur devis, sans surprise
        </h1>
        <p className="mt-4 text-foreground/80">
          Plus de grille publique avec montants : chaque projet est désormais chiffré sur devis détaillé, après un audit rapide de
          votre situation (création ou refonte, volume de contenus, SEO, délais).
        </p>
      </section>

      {/* Explications sur le fonctionnement des devis */}
      <section className="mt-10 mx-auto max-w-3xl space-y-4 text-sm text-foreground/80">
        <p>
          Les sites vitrines statiques que je conçois restent pensés pour les mêmes profils (TPE, professions libérales, petites structures
          B2B), mais les budgets ne sont plus affichés en clair. L’objectif&nbsp;: éviter les grilles figées et adapter le montant à votre
          réalité (contenu existant ou non, refonte ou création, complexité, calendrier).
        </p>
        <p>
          Concrètement, on commence par un échange de 15&nbsp;minutes (visio ou téléphone) pour clarifier vos besoins. Ensuite, vous recevez
          un devis écrit, poste par poste, avec un périmètre précis et des options éventuelles. Pas de frais cachés, pas de maintenance
          imposée&nbsp;: tout est détaillé noir sur blanc.
        </p>
        <p className="text-sm text-muted-foreground">
          Pour comparer les architectures (WordPress, site statique, etc.), vous pouvez aussi lire les articles du blog sur le coût d’un site,
          la maintenance et la refonte — ils restent valables, même si les montants exacts sont désormais discutés uniquement sur devis.
        </p>
      </section>

      {/* Comment obtenir un devis */}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">Comment obtenir votre devis</h2>
        <ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80 space-y-1.5">
          <li>Vous prenez rendez-vous pour un audit rapide (15&nbsp;minutes) ou m’envoyez un email avec les grandes lignes.</li>
          <li>Je regarde votre situation (site existant ou non, contenu, objectifs, délais) et je vous pose quelques questions ciblées.</li>
          <li>Vous recevez un devis détaillé (poste par poste) avec un périmètre clair et des options si besoin.</li>
          <li>Après validation, on planifie le démarrage et le calendrier de livraison.</li>
        </ol>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookingButton className="rounded-full" size="lg" label="Réserver un audit gratuit" />
          <Button asChild className="rounded-full" variant="secondary">
            <a href={`mailto:${CONTACT_EMAIL}?subject=Demande%20devis%20site%20vitrine%20statique`}>
              Demander un devis par email
            </a>
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <GoogleReviewsBadge />
        </div>
      </section>

      {/* Rappel sur la maintenance & la Formule Évolution */}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">Maintenance &amp; évolutions</h2>
        <p className="mt-2 text-sm text-foreground/80">
          Les sites statiques n’imposent aucune maintenance technique lourde (pas de CMS ni de plugins à mettre à jour). Le seul coût
          récurrent obligatoire reste le nom de domaine et, le cas échéant, un hébergement dédié si votre trafic ou vos contraintes
          le justifient. Tout forfait d’accompagnement (comme la Formule Évolution pour faire évoluer le contenu) est proposé sur devis,
          en fonction de votre rythme réel.
        </p>
      </section>

      {/* Garantie & FAQ services (sans montants) */}
      <div className="mt-10">
        <Guarantee />
      </div>
      <section id="faq" className="mt-6 scroll-mt-24">
        <FAQServices />
      </section>

      {/* Clients ciblés */}
      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">Clients ciblés</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-foreground/80 space-y-1.5">
          <li>Cabinets d’avocats (affaires, travail, famille)</li>
          <li>Experts‑comptables et commissaires aux comptes</li>
          <li>Architectes et architectes d’intérieur</li>
          <li>Notaires et juristes</li>
          <li>Consultants et professions libérales réglementées</li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          SEO multi‑secteur : le site vise à capter des clients par requêtes ciblées (locales et nationales).
        </p>
      </section>

      {/* Final CTA */}
      <FinalCTA />

      {/* Quick links — bottom of page */}
      <section className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h3 className="font-heading text-xl font-semibold">Pour approfondir</h3>
          <p className="mt-2 text-sm text-foreground/80">
            Maintenance, coûts et garanties — liens rapides :
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <Link href="/blog/cout-maintenance-site-web" className="text-primary hover:underline">
              Coût de la maintenance
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/blog/forfait-maintenance-site-vitrine" className="text-primary hover:underline">
              Contenu d’un forfait
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/blog/frais-caches-site-internet" className="text-primary hover:underline">
              Frais cachés après la livraison
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/creation-site-internet/paris" className="text-primary hover:underline">
              Création de site internet à Paris
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky CTA mobile */}
      <StickyMobileCTA />
    </div>
  );
}