export const metadata = {
  title: "Thank you — smarterlogicweb.com",
  description: "Your message has been sent. I’ll get back to you within 24 hours.",
  alternates: {
    canonical: "/en/thank-you",
    languages: {
      "en-US": "/en/thank-you",
      "fr-FR": "/merci",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/thank-you",
    title: "Thank you — smarterlogicweb.com",
    description: "Your message has been sent. I’ll get back to you within 24 hours.",
  },
};

import { BookingButton } from "@/components/site/booking-modal";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";

export default function ThankYouPage() {
  return (
    <section className="relative mx-auto w-full max-w-xl px-6 py-24 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      <h1 className="font-heading text-4xl font-bold tracking-tight">Thanks for your message</h1>
      <p className="mt-4 text-foreground/80">
        I’ll reply within 24 hours. If your request is urgent, email directly at{" "}
        <a href="mailto:contact@smarterlogicweb.com" className="underline">contact@smarterlogicweb.com</a>.
      </p>

      <div className="mt-8 flex justify-center">
        <BookingButton className="rounded-full" label="Book my free audit (15 min)" />
      </div>

      <div className="mt-10">
        <FinalCTA />
      </div>
    </section>
  );
}