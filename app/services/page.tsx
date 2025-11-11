import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ServicesOffers } from "@/components/site/services-offers";
import { ServicesCompare } from "@/components/site/services-compare";
import { ServicesExtras } from "@/components/site/services-extras";
import { ServicesTimelineSimple } from "@/components/site/services-timeline-simple";
import { FAQServices } from "@/components/site/faq-services";
import { GoogleReviews, GoogleReviewsBadge } from "@/components/site/google-reviews";
import { StickyMobileCTA } from "@/components/site/sticky-mobile-cta";
import { BookingButton } from "@/components/site/booking-modal";
import { Guarantee } from "@/components/site/guarantee";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";
import { RightDotsNav } from "@/components/site/right-dots-nav";

export const metadata = {
  title: "Services — smarterlogicweb.com",
  description:
    "Sites vitrines, refontes, optimisation, accompagnement continu: des services web simples, performants et orientés résultats.",
  alternates: {
    canonical: "/services",
    languages: {
      "fr-FR": "/services",
      "en-US": "/en/services",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/services",
    title: "Services — smarterlogicweb.com",
    description:
      "Sites vitrines, refontes, optimisation, accompagnement continu: des services web simples, performants et orientés résultats.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Création de site vitrine et refonte",
  provider: {
    "@type": "LocalBusiness",
    name: "smarterlogicweb",
    url: "https://smarterlogicweb.com",
    areaServed: "France",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "France",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "1490",
    highPrice: "2490",
    availability: "https://schema.org/InStock",
  },
};

export default function ServicesPage() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* JSON-LD Service schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Hero background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Right-hand dots navigation for quick section jumps */}
      <RightDotsNav
        sections={[
          { id: "offres", label: "Offres" },
          { id: "comparatif", label: "Comparatif" },
          { id: "avis", label: "Avis" },
          { id: "processus", label: "Processus" },
          { id: "faq", label: "FAQ" },
        ]}
        offset={80}
      />

      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="px-3 py-1">Services</Badge>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Des Sites Web Pensés Pour Votre Activité
        </h1>
        <p className="mt-4 text-foreground/80">
          Du site vitrine simple au site business complet. Choisissez la formule adaptée à vos besoins.
        </p>
      </section>

      {/* Offres principales */}
      <section id="offres" className="scroll-mt-24">
        <ServicesOffers />
      </section>

      {/* Comparatif visuel */}
      <section id="comparatif" className="mt-10 scroll-mt-24">
        <ServicesCompare />
      </section>

      {/* Avis Google */}
      <section id="avis" className="mt-10 scroll-mt-24">
        <GoogleReviews title="Ils en parlent" />
      </section>

      {/* Processus de collaboration */}
      <section id="processus" className="mt-10 scroll-mt-24">
        <ServicesTimelineSimple />
      </section>

      {/* Garantie de résultat */}
      <div className="mt-10">
        <Guarantee />
      </div>

      {/* FAQ spécifique services */}
      <section id="faq" className="mt-6 scroll-mt-24">
        <FAQServices />
      </section>

      {/* CTA final */}
      <section className="mx-auto mt-2 w-full max-w-5xl px-0 py-12">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Pas Sûr de la Formule qui Vous Convient ?</h2>
          <p className="mt-2 text-foreground/80">Appelons-nous 15 minutes. Je vous aide à choisir gratuitement.</p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookingButton className="rounded-full btn-pulse" size="lg" label="Réserver mon audit gratuit (15 min)" />
            <Button asChild className="rounded-full" variant="secondary">
              <a href="mailto:contact@smarterlogicweb.com?subject=Prendre%20rendez-vous%20t%C3%A9l%C3%A9phonique">Prendre rendez-vous téléphonique</a>
            </Button>
          </div>
          {/* Badge note Google près du CTA */}
          <div className="mt-4 flex items-center justify-center">
            <GoogleReviewsBadge />
          </div>
        </div>
      </section>

      {/* Final CTA (global) */}
      <FinalCTA />

      {/* Quick links — bottom of page */}
      <section className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h3 className="font-heading text-xl font-semibold">Pour approfondir</h3>
          <p className="mt-2 text-sm text-foreground/80">
            Maintenance, coûts et garanties — liens rapides :
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <Link href="/cout-maintenance-site-web" className="text-primary hover:underline">
              Coût de la maintenance
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/contenu-forfait-maintenance-site-web" className="text-primary hover:underline">
              Contenu d’un forfait
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/frais-caches-site-internet" className="text-primary hover:underline">
              Frais cachés après la livraison
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/tarifs-2025" className="text-primary hover:underline">
              Tarifs 2025
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky CTA mobile */}
      <StickyMobileCTA />
    </div>
  );
}