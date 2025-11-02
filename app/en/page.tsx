import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { track } from "@/lib/analytics";

export const metadata = {
  title: "Your website, finally simple and fast.",
  description:
    "I design and build custom websites for entrepreneurs and nonprofits. A professional online presence, without complexity.",
  alternates: { canonical: "/en" },
  openGraph: {
    url: "https://smarterlogicweb.com/en",
    title: "Your website, finally simple and fast. — smarterlogicweb.com",
    description:
      "Custom websites for entrepreneurs and nonprofits. Simple, fast, no complexity — I handle the rest.",
  },
};

export default function Page() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[35rem] w-[35rem] rounded-full bg-rose-300/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center px-6 py-24 text-center md:py-32">
        <div className="mb-6">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            Passionate developer
          </Badge>
        </div>

        <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          Your website, finally simple and fast.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
          I design and build custom websites for entrepreneurs and nonprofits who want a professional online presence
          without the technical hassle. Focus on your craft — I handle the rest.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Button
            asChild
            size="lg"
            variant="default"
            className="h-12 rounded-full px-7 text-base font-medium transition-transform duration-200 hover:scale-105"
          >
            <Link
              href="mailto:contact@smarterlogicweb.com?subject=Free%20quote%20-%20New%20project"
              onClick={() => track("cta_devis_mailto_hero")}
            >
              Get my free quote
            </Link>
          </Button>

          <Link
            href="/en/nonprofit-commitment"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Heart size={16} className="transition-transform group-hover:scale-110" />
            <span>Discover my nonprofit commitment</span>
          </Link>
        </div>
      </section>
    </div>
  );
}