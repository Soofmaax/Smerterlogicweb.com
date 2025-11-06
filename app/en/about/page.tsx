import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrackedLink } from "@/components/site/tracked-link";
import { BookingButton } from "@/components/site/booking-modal";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";
import { Guarantee } from "@/components/site/guarantee";
import { GoogleReviewsBadge } from "@/components/site/google-reviews";

export const metadata = {
  title: "About — smarterlogicweb.com",
  description: "Front‑end developer — simplicity, performance and high standards for your online presence.",
  alternates: {
    canonical: "/en/about",
    languages: {
      "en-US": "/en/about",
      "fr-FR": "/a-propos",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/about",
    title: "About — smarterlogicweb.com",
    description:
      "Front‑end developer — simplicity, performance and high standards for your online presence.",
  },
};

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      <div className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <Badge variant="secondary" className="px-3 py-1">About</Badge>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Hi, I’m Sarah — front‑end developer.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/80">
          I help entrepreneurs and nonprofits build a clear, professional and fast online presence.
          My approach: clean design, solid code, conversion focus.
        </p>
        <p className="mt-4 text-foreground/80">
          I use Next.js, Tailwind CSS and a compact component library to deliver fast and well.
          Every project is designed to be fast, accessible and easy to evolve.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <BookingButton className="rounded-full" size="lg" label="Book my free audit (15 min)" />
          <Button asChild className="rounded-full">
            <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Web%20project" eventName="cta_devis_mailto_apropos">Get my free quote</TrackedLink>
          </Button>
          <Link href="/en/projects" className="text-sm text-muted-foreground hover:text-foreground">
            See projects
          </Link>
        </div>

        <div className="mt-4">
          <GoogleReviewsBadge />
        </div>
      </div>

      <div className="mt-10">
        <Guarantee />
      </div>

      <FinalCTA />
    </section>
  );
}