import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

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

      {/* Netlify Forms */}
      <div className="mt-10 rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-xl font-semibold">Send a message</h2>
        <form
          className="mt-4 grid gap-4"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/en/thank-you"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Do not fill: <input name="bot-field" />
            </label>
          </p>

          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              id="name"
              name="name"
              required
              className="h-11 rounded-md border bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Your name"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="h-11 rounded-md border bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="you@email.com"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="rounded-md border bg-background px-3 py-2 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Describe your needs, goal and timeline."
            />
          </div>

          <div className="flex items-start gap-2">
            <input id="consent" name="consent" type="checkbox" required className="mt-1" />
            <label htmlFor="consent" className="text-sm text-foreground/80">
              I agree to the processing of my data to respond to my request. See{" "}
              <Link href="/en/privacy-policy" className="underline">
                the privacy policy
              </Link>.
            </label>
          </div>

          {/* Netlify reCAPTCHA */}
          <div data-netlify-recaptcha="true"></div>

          <div>
            <Button type="submit" className="rounded-full">Send</Button>
          </div>
        </form>
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