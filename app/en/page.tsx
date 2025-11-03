import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Cloud, Shield, MessageSquare, Layers, Smartphone, Wifi } from "lucide-react";
import { StatsCard } from "@/components/site/stats-card";
import { statsEN } from "@/data/stats";
import { TrackedLink } from "@/components/site/tracked-link";

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

      {/* Hero */}
      <section className="relative mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-6">
          <Badge variant="secondary" className="px-3 py-1 text-sm">Web studio</Badge>
        </div>

        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Tailored web solutions.
          <br />
          Supporting you with{" "}
          <span className="inline-flex items-center rounded-full bg-foreground px-3 py-1 text-background">
            poor communication
          </span>
        </h1>

        {/* Visual gradient */}
        <div className="mt-8 overflow-hidden rounded-[28px] border bg-gradient-to-tr from-fuchsia-300/40 via-indigo-300/40 to-rose-300/40 p-[2px]">
          <div className="h-48 w-full rounded-[26px] bg-gradient-to-br from-[#2c2438] via-[#2a2033] to-[#1a1825] md:h-72" />
        </div>

        <p className="mt-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
          What’s causing stress today? Are you wasting time on workarounds? How many opportunities
          could a focused web partner unlock for your business?
        </p>

        <div className="mt-6">
          <Button asChild size="lg" className="w-full rounded-full md:w-auto">
            <TrackedLink href="#solutions" eventName="cta_solutions_hero">Our solutions</TrackedLink>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto w-full max-w-3xl px-6 py-2">
        <div className="grid gap-6 md:grid-cols-1">
          {statsEN.slice(0, 1).map((items, idx) => (
            <StatsCard key={idx} items={items} />
          ))}
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
                  className="flex items-center justify-between rounded-full border border-black/10 bg-card px-5 py-3 text-foreground shadow-sm ring-1 ring-black/5 transition-colors hover:bg-accent/30"
                >
                  <span className="text-base font-medium">{label}</span>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
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

      {/* Partners logos block (pastel gradient) */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-20">
        <div className="overflow-hidden rounded-[28px] card-elevated border p-6 bg-gradient-to-br from-rose-100/80 via-purple-100/80 to-indigo-100/80 dark:from-rose-200/20 dark:via-purple-200/20 dark:to-indigo-200/20">
          <h3 className="text-center font-heading text-2xl font-semibold md:text-3xl">
            Trusted by future partners
          </h3>
          <p className="mt-2 text-center text-foreground/70">
            Join upcoming partners and satisfied clients.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-5">
            {["Your logo", "Client A", "Client B", "Client C", "Client D", "Client E"].map((name) => (
              <div
                key={name}
                className="flex h-16 items-center justify-center rounded-2xl bg-white/70 text-sm font-medium text-foreground/60 ring-1 ring-black/5 dark:bg-white/5 dark:text-white/70"
                aria-label={`Logo ${name}`}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}