import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/site/tracked-link";
import { ContactForm } from "@/components/site/contact-form";
import { Particles } from "@/components/site/particles";
import { Guarantee } from "@/components/site/guarantee";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";
import { Suspense } from "react";
import { SITE_URL, CONTACT_EMAIL } from "@/config/site";

export const metadata = {
  title: "Contact — smarterlogicweb.com",
  description: "Contact me for a free quote or to discuss your project.",
  alternates: {
    canonical: "/en/contact",
    languages: {
      "en-US": "/en/contact",
      "fr-FR": "/contact",
    },
  },
  openGraph: {
    url: `${SITE_URL}/en/contact`,
    title: "Contact — smarterlogicweb.com",
    description: "Contact me for a free quote or to discuss your project.",
  },
};

export default function ContactPage() {
  return (
    <section className="relative mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      <div className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Contact</h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/80">
          The simplest and fastest way: email. Include your current website (or project URL) and your email — I’ll get back within 24 hours with a first review.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {process.env.NEXT_PUBLIC_PHONE ? (
            <Button asChild size="lg" className="rounded-full">
              <a href={`tel:${(process.env.NEXT_PUBLIC_PHONE as string).replace(/[^+\d]/g, "")}`}>📞 +33 7 44 40 79 73</a>
            </Button>
          ) : null}
          <Button asChild size="lg" className="rounded-full">
            <TrackedLink
              href={`mailto:${CONTACT_EMAIL}?subject=Free%20quote`}
              eventName="cta_devis_mailto_contact"
            >
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
              </span>
            </TrackedLink>
          </Button>
          <Link href="/en" className="text-sm text-muted-foreground hover:text-foreground">Back to home</Link>
        </div>

        <p className="mt-3 text-sm text-foreground/80">
          You can also message me on WhatsApp at{" "}
          <a
            href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/33744407973"}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            +33 7 44 40 79 73
          </a>
          .
        </p>

        <p className="mt-2 text-sm text-foreground/80">
          Prefer LinkedIn?{" "}
          <a
            href="https://www.linkedin.com/in/salwaessafi/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            View my LinkedIn profile
          </a>
          .
        </p>

        <div className="mt-4">
          <GoogleReviewsBadge />
        </div>
      </div>

      {/* Form with validation */}
      <div className="mt-10 rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-xl font-semibold">Send a message</h2>
        <Suspense fallback={<div className="mt-3 text-sm text-muted-foreground">Loading form…</div>}>
          <ContactForm locale="en" action="/en/thank-you" />
        </Suspense>
      </div>

      <div className="mt-10 rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-xl font-semibold">For an effective first message</h2>
        <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
          <li>Main goal (showcase, redesign, optimisation…)</li>
          <li>3–5 pages you have in mind</li>
          <li>Examples of sites you like</li>
          <li>Timeline and indicative budget</li>
        </ul>
      </div>

      <div className="mt-10">
        <Guarantee />
      </div>
    </section>
  );
}