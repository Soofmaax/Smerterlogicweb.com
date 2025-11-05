import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ServicesOffers } from "@/components/site/services-offers";
import { ServicesCompare } from "@/components/site/services-compare";
import { ServicesExtras } from "@/components/site/services-extras";
import { ServicesTimelineSimple } from "@/components/site/services-timeline-simple";
import { FAQServices } from "@/components/site/faq-services";

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

export default function ServicesPage() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* Hero background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
      </div>

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
      <ServicesOffers />

      {/* Comparatif visuel */}
      <ServicesCompare />

      {/* Services complémentaires */}
      <ServicesExtras />

      {/* Processus de collaboration */}
      <ServicesTimelineSimple />

      {/* FAQ spécifique services */}
      <FAQServices />

      {/* CTA final */}
      <section className="mx-auto mt-2 w-full max-w-5xl px-0 py-12">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Pas Sûr de la Formule qui Vous Convient ?</h2>
          <p className="mt-2 text-foreground/80">Appelons-nous 15 minutes. Je vous aide à choisir gratuitement.</p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full btn-pulse" variant="cta">
              <Link href="/contact">Demander un devis</Link>
            </Button>
            <Button asChild className="rounded-full" variant="secondary">
              <a href="mailto:contact@smarterlogicweb.com?subject=Prendre%20rendez-vous%20t%C3%A9l%C3%A9phonique">Prendre rendez-vous téléphonique</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}