import { Reveal } from "@/components/site/reveal";
import { AssociationApplicationForm } from "@/components/site/association-application-form";
import { BookingButton } from "@/components/site/booking-modal";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";
import { SITE_URL } from "@/config/site";

export const metadata = {
  title: "Contact — Projet associatif",
  description: "Expliquez votre projet associatif et vos besoins pour voir si un accompagnement ou un tarif adapté est possible.",
  alternates: {
    canonical: "/candidature-association",
    languages: {
      "fr-FR": "/candidature-association",
      "en-US": "/en/association-application",
    },
  },
  openGraph: {
    url: `${SITE_URL}/candidature-association`,
    title: "Contact — Projet associatif",
    description: "Expliquez votre projet associatif et vos besoins pour voir si un accompagnement ou un tarif adapté est possible.",
  },
};

export default function CandidatureAssociationPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      <div className="rounded-[28px] card-elevated border bg-card p-6">
        <Reveal className="reveal-fade-up">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Projet associatif</h1>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-3 text-foreground/80">
            Vous représentez une association, un collectif ou un projet à impact et vous avez besoin d’un site ? Décrivez votre situation, vos objectifs et vos contraintes — je vous réponds sous 48h pour voir ce qui est possible.
          </p>
        </Reveal>
        <AssociationApplicationForm />
        <div className="mt-8 flex justify-center">
          <BookingButton className="rounded-full" label="Réserver un audit gratuit" />
        </div>
      </div>

      <FinalCTA />
    </section>
  );
}