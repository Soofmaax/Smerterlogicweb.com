import { Reveal } from "@/components/site/reveal";
import { FAQPage } from "@/components/site/faq-page";
import { BookingButton } from "@/components/site/booking-modal";
import { FinalCTA } from "@/components/site/final-cta";
import { SITE_URL, BRAND_DOMAIN } from "@/config/site";

export const metadata = {
  title: `FAQ — ${BRAND_DOMAIN}`,
  description:
    "FAQ 2026 : coûts, délais, refonte WordPress, SEO local, maintenance d’un site vitrine statique pour TPE et professions libérales.",
  alternates: {
    canonical: "/faq",
    languages: {
      "fr-FR": "/faq",
      "en-US": "/en/faq",
    },
  },
  openGraph: {
    url: `${SITE_URL}/faq`,
    title: `FAQ — ${BRAND_DOMAIN}`,
    description:
      "FAQ détaillée sur la création et la refonte de sites vitrines statiques en 2026 : tarifs, délais, SEO, maintenance, WordPress, TPE & professions libérales.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte vraiment un site vitrine statique en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour une TPE ou une profession libérale, un site vitrine statique complet se situe généralement entre 1 490€ et 4 990€ TTC selon le nombre de pages, la quantité de contenus à créer et les besoins spécifiques (bilingue, cas clients, blog, etc.). Les fourchettes détaillées Essentiel / Professionnel / Premium sont présentées sur la page Tarifs 2026.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour créer un site vitrine statique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour une TPE ou un cabinet, il faut en moyenne 3 à 5 semaines entre la validation du devis et la mise en ligne, si les contenus sont fournis dans un délai raisonnable. Les projets plus complets (beaucoup de contenus, bilingue, cas clients) peuvent s’étaler sur 6 à 8 semaines.",
      },
    },
    {
      "@type": "Question",
      name: "Mon site sera-t-il visible sur Google (SEO) ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Les sites sont conçus dès le départ avec une structure propre (titres, contenus clairs, données structurées) et un très bon niveau de performance (Core Web Vitals). Un site statique bien construit est une excellente base pour le SEO, surtout sur des requêtes locales et de niche. Le référencement naturel reste un travail dans la durée et les premiers résultats significatifs apparaissent souvent entre 3 et 6 mois selon la concurrence.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il obligatoirement refaire un site WordPress lent en site statique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pas forcément, mais pour beaucoup de TPE/PME avec un WordPress chargé de plugins et rarement mis à jour, la refonte vers un site vitrine statique est souvent plus rentable sur 3 ans : moins de maintenance, meilleure performance, moins de risques techniques. L’important est de traiter correctement la migration (mapping des URLs, redirections 301, contenus clés) pour ne pas perdre le SEO existant.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je payer en plusieurs fois pour la création ou la refonte ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Le plus souvent, le paiement se fait en 3 étapes : 30% à la signature, 40% à mi‑projet (après validation des maquettes), 30% à la mise en ligne. Pour certains projets, un échéancier adapté peut être discuté au cas par cas.",
      },
    },
    {
      "@type": "Question",
      name: "Pourquoi choisir un site statique plutôt que Wix ou un WordPress classique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un site vitrine statique est plus léger, plus rapide et demande beaucoup moins de maintenance qu’un WordPress classique ou un builder type Wix. Vous n’êtes pas dépendant de dizaines de plugins, il y a moins de mises à jour critiques, et la performance est excellente sur mobile. Wix et certains CMS généralistes peuvent convenir à des cas simples, mais deviennent vite limitants ou coûteux à moyen terme pour une TPE qui veut un site sobre, durable et bien référencé.",
      },
    },
    {
      "@type": "Question",
      name: "Pour quels profils un site vitrine statique est-il particulièrement adapté ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les sites vitrines statiques sont particulièrement adaptés aux artisans, TPE de services locaux, professions libérales (avocats, experts-comptables, thérapeutes, consultants), studios et petites structures B2B qui ont besoin d’un site sérieux, rapide et simple à maintenir, sans usine à gaz technique.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je modifier mon site moi-même après la mise en ligne ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui pour les contenus simples : textes, images, actualités, FAQ, certains blocs prévus pour cela. Pour les modifications structurelles (nouvelles sections, refonte de page, changements de design), l’accompagnement du studio reste possible ponctuellement afin de garder une base propre et performante.",
      },
    },
    {
      "@type": "Question",
      name: "Proposez-vous des offres de maintenance pour un site vitrine statique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un site vitrine statique nécessite beaucoup moins de maintenance technique qu’un site WordPress classique. Il n’y a donc pas de contrat de maintenance obligatoire. En revanche, des offres de suivi léger et de checkup contenu/SEO peuvent être proposées (mise à jour de quelques pages, ajout de cas clients, revue annuelle des métriques).",
      },
    },
    {
      "@type": "Question",
      name: "Travaillez-vous uniquement avec des clients en Île-de-France ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. L’accompagnement est possible pour des TPE, artisans et cabinets basés partout en France. L’Île-de-France (Paris, petite et grande couronne) est un focus particulier, mais les échanges se font principalement en visio et par email, ce qui permet de suivre des clients dans toute la France.",
      },
    },
  ],
};

export default function FAQ() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="reveal-fade-up">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">FAQ — création & refonte de site vitrine statique</h1>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-4 text-foreground/80">
            Coûts, délais, refonte WordPress, SEO local, maintenance et profils de clients — les réponses aux questions que les TPE et professions
            libérales se posent le plus souvent en 2026.
          </p>
        </Reveal>
      </div>

      {/* JSON-LD FAQ schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <FAQPage />

      <div className="mt-10 flex justify-center">
        <BookingButton className="rounded-full" label="Réserver un audit gratuit" />
      </div>

      <FinalCTA />

      {/* Quick links — bottom of page */}
      <section className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h3 className="font-heading text-xl font-semibold">Pour approfondir</h3>
          <p className="mt-2 text-sm text-foreground/80">
            Tarifs, maintenance et refonte — quelques ressources clés :
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <a href="/tarifs-2025#tarifs" className="text-primary hover:underline">
              Tarifs 2026 pour sites vitrines statiques
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/blog/cout-maintenance-site-web" className="text-primary hover:underline">
              Coût de la maintenance d’un site web
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/blog/forfait-maintenance-site-vitrine" className="text-primary hover:underline">
              Contenu d’un forfait maintenance TPE
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/blog/refonte-wordpress-vers-site-statique-migration-seo" className="text-primary hover:underline">
              Refonte WordPress vers site statique (migration SEO)
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}