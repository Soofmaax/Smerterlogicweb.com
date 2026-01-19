import { Reveal } from "@/components/site/reveal";
import { AssociationApplicationForm } from "@/components/site/association-application-form";
import { BookingButton } from "@/components/site/booking-modal";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";
import { SITE_URL } from "@/config/site";

export const metadata = {
  title: "Contact — Nonprofit project",
  description: "Explain your nonprofit project and needs to see if tailored support or adjusted pricing is possible.",
  alternates: {
    canonical: "/en/association-application",
    languages: {
      "en-US": "/en/association-application",
      "fr-FR": "/candidature-association",
    },
  },
  openGraph: {
    url: `${SITE_URL}/en/association-application`,
    title: "Contact — Nonprofit project",
    description: "Explain your nonprofit project and needs to see if tailored support or adjusted pricing is possible.",
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
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Nonprofit project</h1>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-3 text-foreground/80">
            You represent a nonprofit, collective or impact‑driven project and need a website? Describe your situation,
            goals and constraints — I’ll reply within 48 hours to see what’s possible.
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