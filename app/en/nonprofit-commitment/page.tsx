import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrackedLink } from "@/components/site/tracked-link";

export const metadata = {
  title: "Nonprofit commitment — smarterlogicweb.com",
  description:
    "My nonprofit commitment: supporting impact‑driven projects through the web. Mentoring, accessible redesigns, performance optimisation.",
  alternates: {
    canonical: "/en/nonprofit-commitment",
    languages: {
      "en-US": "/en/nonprofit-commitment",
      "fr-FR": "/engagement-associatif",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/nonprofit-commitment",
    title: "Nonprofit commitment — smarterlogicweb.com",
    description:
      "Supporting impact projects: accessible redesigns, performance & SEO, mentoring.",
  },
};

export default function NonprofitCommitmentPage() {
  return (
    <div className="relative">
      <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
        <div className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1">
              Commitment
            </Badge>
            <Heart className="h-4 w-4 text-secondary" />
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Giving meaning to the web through nonprofit action.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            I support nonprofits and civic initiatives to make their websites clearer, more inclusive and faster.
            The goal: amplify their impact online with simple, accessible and fast interfaces.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[20px] border bg-card p-6">
              <h3 className="font-heading text-xl font-semibold">Accessible redesign</h3>
              <p className="mt-2 text-foreground/80">
                Clear structure, contrast, keyboard navigation, readable content: more inclusive sites for all.
              </p>
            </div>
            <div className="rounded-[20px] border bg-card p-6">
              <h3 className="font-heading text-xl font-semibold">Performance & SEO</h3>
              <p className="mt-2 text-foreground/80">
                Fast pages, better ranking, more visibility for causes that matter.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Nonprofit%20project" eventName="cta_devis_mailto_engagement">
                Tell me about your project
              </TrackedLink>
            </Button>
            <Link href="/en" className="text-sm text-muted-foreground hover:text-foreground">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}