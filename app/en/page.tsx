import Link from "next/link";
import { Heart, Cloud, Shield, MessageSquare, Layers, Smartphone, Wifi } from "lucide-react";
import { StatsCard } from "@/components/site/stats-card";
import { statsEN } from "@/data/stats";
import { TrackedLink } from "@/components/site/tracked-link";
import { Carousel } from "@/components/site/carousel";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { HeroTypedEN } from "@/components/site/hero-typed-en";

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

      {/* Secondary CTA */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-10">
        <div className="rounded-[28px] card-elevated border bg-card p-6">
          <h3 className="font-heading text-2xl font-semibold">Trusted web solutions, tailored to you.</h3>
          <p className="mt-2 text-foreground/80">
            From showcase sites to performance optimisation and accessibility — I&#39;m here to help.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full">
              <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Free%20quote" eventName="cta_devis_mailto_hero">
                Get my free quote
              </TrackedLink>
            </Button>
            <Link href="/en/nonprofit-commitment" className="group inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Heart size={16} className="transition-transform group-hover:scale-110" />
              <span>Discover my nonprofit commitment</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners logos block — horizontal carousel */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-10">
        <Reveal className="reveal-clip block">
          <div className="overflow-hidden rounded-[28px] card-elevated border p-6 bg-card">
            <h3 className="text-center font-heading text-2xl font-semibold md:text-3xl">
              Trusted by future partners
            </h3>
            <p className="mt-2 text-center text-foreground/70">
              Join upcoming partners and satisfied clients.
            </p>

            <div className="mt-6">
              <Carousel
                orientation="horizontal"
                autoplay
                intervalMs={3500}
                ariaLabel="Partner logos"
                items={[
                  "Your logo",
                  "Client A",
                  "Client B",
                  "Client C",
                  "Client D",
                  "Client E",
                  "Client F",
                  "Client G",
                ].map((name) => (
                  <div
                    key={name}
                    className="flex h-16 items-center justify-center rounded-2xl bg-white/70 text-sm font-medium text-foreground/60 ring-1 ring-black/5 dark:bg-white/5 dark:text-white/70"
                    aria-label={`Logo ${name}`}
                  >
                    {name}
                  </div>
                ))}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Resources — horizontal carousel */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-20">
        <Reveal className="reveal-clip block">
          <div className="overflow-hidden rounded-[28px] card-elevated border p-6 bg-card">
            <h3 className="text-center font-heading text-2xl font-semibold md:text-3xl">
              Latest resources
            </h3>
            <p className="mt-2 text-center text-foreground/70">
              Clear tips to improve your site and conversions.
            </p>
            <div className="mt-6">
              <Carousel
                orientation="horizontal"
                autoplay
                intervalMs={3800}
                ariaLabel="Resources"
                items={[
                  {
                    title: "Optimise Core Web Vitals",
                    category: "Performance",
                  },
                  {
                    title: "Accessibility: 10 key points",
                    category: "A11y",
                  },
                  {
                    title: "Technical SEO with Next.js",
                    category: "SEO",
                  },
                  {
                    title: "Redesign: where to start",
                    category: "UX",
                  },
                  {
                    title: "Forms that convert",
                    category: "Conversion",
                  },
                ].map((r, i) => (
                  <article key={i} className="rounded-[20px] border bg-card p-5 transition hover:shadow-md focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/60">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{r.category}</div>
                    <h4 className="mt-2 font-heading text-lg font-semibold">{r.title}</h4>
                    <p className="mt-2 text-sm text-foreground/70">Quick read — practical best practices.</p>
                    <a href="#" className="link-underline mt-3 inline-block rounded text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
                      Read
                    </a>
                  </article>
                ))}
              />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}