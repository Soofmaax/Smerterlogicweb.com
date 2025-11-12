import { Reveal } from "@/components/site/reveal";
import { AssociationApplicationForm } from "@/components/site/association-application-form";
import { BookingButton } from "@/components/site/booking-modal";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";

export const metadata = {
  title: "Application — Nonprofit of the Month",
  description: "Apply for your nonprofit to receive a free website this month.",
  alternates: {
    canonical: "/en/association-application",
    languages: {
      "en-US": "/en/association-application",
      "fr-FR": "/candidature-association",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/association-application",
    title: "Application — Nonprofit of the Month",
    description: "Apply for your nonprofit to receive a free website this month.",
  },
};

export default function AssociationApplicationENPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      <div className="rounded-[28px] card-elevated border bg-card p-6">
        <Reveal className="reveal-fade-up">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Apply — Free Website</h1>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-3 text-foreground/80">
            Each month, one public‑interest nonprofit receives a professional website for free. Fill out this form — I’ll
            reply within 48 hours.
          </p>
        </Reveal>
        <AssociationApplicationForm />
        <div className="mt-8 flex justify-center">
          <BookingButton className="rounded-full" label="Book my free audit (15 min)" />
        </div>
      </div>

      <FinalCTA />
    </section>
  );
}