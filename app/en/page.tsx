import Link from "next/link";
import { Heart, Cloud, Shield, MessageSquare, Layers, Smartphone, Wifi } from "lucide-react";
import { StatsCard } from "@/components/site/stats-card";
import { statsEN } from "@/data/stats";
import { TrackedLink } from "@/components/site/tracked-link";
import { Carousel } from "@/components/site/carousel";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { HeroTypedEN } from "@/components/site/hero-typed-en";
import { WhyInvestEN } from "@/components/site/why-invest-en";
import { TestimonialsSimpleEN } from "@/components/site/testimonials-simple-en";
import { RealisationsGridEN } from "@/components/site/realisations-grid-en";
import { PerformanceVisibleEN } from "@/components/site/performance-visible-en";
import { ExpertiseWhyEN } from "@/components/site/expertise-why-en";
import { TechnologiesGridEN } from "@/components/site/technologies-grid-en";

export const metadata = {
  title: "Your website, finally simple and fast.",
  description:
    "I design and build custom websites for entrepreneurs and nonprofits. A professional online presence, without complexity.",
  alternates: {
    canonical: "/en",
    languages: {
      "en-US": "/en",
      "fr-FR": "/",
    },
  },
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
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[35rem] w-[35rem] rounded-full bg-rose-300/10 blur-3xl" />
      </div>

      {/* New Hero with typing effect */}
      <HeroTypedEN />

      {/* Why invest */}
      <Reveal className="reveal-fade-up">
        <WhyInvestEN />
      </Reveal>

      {/* Testimonials */}
      <TestimonialsSimpleEN />

      {/* My work */}
      <RealisationsGridEN />

      {/* Visible performance */}
      <PerformanceVisibleEN />

      {/* Expertise */}
      <Reveal className="reveal-fade-up">
        <ExpertiseWhyEN />
      </Reveal>

      {/* Technologies */}
      <Reveal className="reveal-fade-up">
        <TechnologiesGridEN />
      </Reveal>

      {/* Keep existing blocks below if you want to retain them; they remain for now */}

      {/* Stats */}
      <section className="mx-auto w-full max-w-3xl px-6 py-2">
        <Reveal className="reveal-fade-up">
          <div className="grid gap-6 md:grid-cols-1">
            {statsEN.slice(0, 1).map((items, idx) => (
              <StatsCard key={idx} items={items} variant="light" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Vertical ticker (sober) */}
      <section className="mx-auto w-full max-w-3xl px-6 py-4">
        <div className="rounded-[20px] border bg-muted/40 p-4">
          <Carousel
            orientation="vertical"
            autoplay
            intervalMs={3000}
            ariaLabel="Key messages"
            items={[
              <div key="1" className="flex h-24 items-center justify-center text-center text-foreground/80">
                Clear, fast, sustainable websites.
              </div>,
              <div key="2" className="flex h-24 items-center justify-center text-center text-foreground/80">
                Accessibility and performance from day one.
              </div>,
              <div key="3" className="flex h-24 items-center justify-center text-center text-foreground/80">
                A reliable partner for your growth.
              </div>,
            ]}
          />
        </div>
      </section>

      {/* Discover card */}
      <section className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-4 md:p-6">
          <div className="overflow-hidden rounded-[20px] bg-gradient-to-tr from-rose-200 via-purple-200 to-indigo-200">
            <div className="h-40 md:h-56" />
          </div>
          <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            Discover what&#39;s possible with smarterlogicweb
          </h2>
          <p className="mt-3 text-foreground/80">
            Explore the full range of solutions and find the perfect fit for your business needs.
          </p>
          <div className="mt-5">
            <Button asChild className="w-full rounded-full md:w-auto">
              <Link href="#solutions">Our Solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions list */}
      <section id="solutions" className="mx-auto w-full max-w-3xl px-6 pb-16">
        <div className="rounded-[28px] border bg-muted/40 p-4 md:p-5">
          <div className="mb-2 px-2 text-lg font-semibold text-muted-foreground">Solutions</div>
          <Reveal className="reveal-fade-up">
            <ul className="space-y-3">
              {[
                { label: "Cloud Services", Icon: Cloud },
                { label: "Cyber Security", Icon: Shield },
                { label: "IT Support", Icon: MessageSquare },
                { label: "Microsoft Solutions", Icon: Layers },
                { label: "Mobile + Utilities", Icon: Smartphone },
                { label: "Network + Comms", Icon: Wifi },
              ].map(({ label, Icon }) => (
                <li key={label}>
                  <Link
                    href="/en/services"
                    className="group flex items-center justify-between rounded-full border border-foreground/10 bg-card px-5 py-3 text-foreground shadow-sm ring-1 ring-black/5 transition-colors hover:bg-accent"
                  >
                    <span className="text-base font-medium transition-colors group-hover:text-primary">{label}</span>
                    <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </div>
  );
}