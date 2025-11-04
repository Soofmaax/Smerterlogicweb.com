import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/site/tracked-link";
import { ContactForm } from "@/components/site/contact-form";

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
    url: "https://smarterlogicweb.com/en/contact",
    title: "Contact — smarterlogicweb.com",
    description: "Contact me for a free quote or to discuss your project.",
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Contact</h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/80">
          The simplest and fastest way: email. Describe your needs, goals and constraints — I’ll get back within 24 hours.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Free%20quote" eventName="cta_devis_mailto_contact">
              <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> contact@smarterlogicweb.com</span>
            </TrackedLink>
          </Button>
          <Link href="/en" className="text-sm text-muted-foreground hover:text-foreground">Back to home</Link>
        </div>
      </div>

      {/* Form with validation */}
      <div className="mt-10 rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-xl font-semibold">Send a message</h2>
        <ContactForm locale="en" action="/en/thank-you" />
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
    </section>
  );
}