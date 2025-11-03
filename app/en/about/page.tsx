import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { track } from "@/lib/analytics";

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
      <div className="rounded-[28px] border bg-card p-6 shadow-sm">
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
          <Button asChild className="rounded-full">
            <Link href="mailto:contact@smarterlogicweb.com?subject=Web%20project" onClick={() => track("cta_devis_mailto_apropos")}>Get my free quote</Link>
          </Button>
          <Link href="/en/projects" className="text-sm text-muted-foreground hover:text-foreground">
            See projects
          </Link>
        </div>
      </div>
    </section>
  );
}