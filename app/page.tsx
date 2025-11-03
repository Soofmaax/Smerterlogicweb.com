import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Cloud, Shield, MessageSquare, Layers, Smartphone, Wifi } from "lucide-react";
import { StatsCard } from "@/components/site/stats-card";
import { statsFR } from "@/data/stats";
import { TrackedLink } from "@/components/site/tracked-link";

export const metadata = {
  title: "Votre site web, enfin simple et performant.",
  description:
    "Je conçois et développe des sites web sur-mesure pour entrepreneurs et associations. Présence en ligne professionnelle, sans complexité.",
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/",
    title: "Votre site web, enfin simple et performant. — smarterlogicweb.com",
    description:
      "Sites web sur-mesure pour entrepreneurs et associations. Simple, performant, sans complexité — je m’occupe du reste.",
  },
};

export default function Page() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Subtle background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[35rem] w-[35rem] rounded-full bg-rose-300/10 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-6">
          <Badge variant="secondary" className="px-3 py-1 text-sm">Studio web</Badge>
        </div>

        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Des solutions web sur‑mesure.
          <br />
          Nous vous soutenons face à{" "}
          <span className="inline-flex items-center rounded-full bg-foreground px-3 py-1 text-background">
            la communication confuse
          </span>
        </h1>

        {/* Visual card (gradient) */}
        <div className="mt-8 overflow-hidden rounded-[28px] border bg-gradient-to-tr from-fuchsia-300/40 via-indigo-300/40 to-rose-300/40 p-[2px]">
          <div className="h-48 w-full rounded-[26px] bg-gradient-to-br from-[#2c2438] via-[#2a2033] to-[#1a1825] md:h-72" />
        </div>

        <p className="mt-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
          Quels problèmes web vous font perdre du temps ? Combien d’opportunités perdez‑vous par un site confus
          ou lent ? Et si un partenaire front‑end vous aidait à clarifier et accélérer ?
        </p>

        <div className="mt-6">
          <Button asChild size="lg" className="w-full rounded-full md:w-auto">
            <TrackedLink href="#solutions" eventName="cta_solutions_hero">Nos solutions</TrackedLink>
          </Button>
        </div>
      </section>

      {/* Stats cards */}
      <section className="mx-auto w-full max-w-3xl px-6 py-2">
        <div className="grid gap-6 md:grid-cols-1">
          {statsFR.slice(0, 1).map((items, idx) => (
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
            Découvrez ce qui est possible avec smarterlogicweb
          </h2>
          <p className="mt-3 text-foreground/80">
            Explorez la gamme complète de solutions et trouvez l’approche idéale pour votre activité.
          </p>
          <div className="mt-5">
            <Button asChild className="w-full rounded-full md:w-auto">
              <Link href="#solutions">Voir nos solutions</Link>
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
                  href="/services"
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

      {/* CTA secondary */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-10">
        <div className="rounded-[28px] card-elevated border bg-card p-6">
          <h3 className="font-heading text-2xl font-semibold">Des solutions fiables, taillées pour vous.</h3>
          <p className="mt-2 text-foreground/80">
            Du site vitrine à l’optimisation de performance, en passant par l’accessibilité — je suis là pour vous aider.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full">
              <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Devis%20gratuit" eventName="cta_devis_mailto_hero">
                Obtenir mon devis gratuit
              </TrackedLink>
            </Button>
            <Link href="/engagement-associatif" className="group inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Heart size={16} className="transition-transform group-hover:scale-110" />
              <span>Découvrez mon engagement associatif</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners logos block (pastel gradient) */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-20">
        <div className="overflow-hidden rounded-[28px] card-elevated border p-6 bg-gradient-to-br from-rose-100/80 via-purple-100/80 to-indigo-100/80 dark:from-rose-200/20 dark:via-purple-200/20 dark:to-indigo-200/20">
          <h3 className="text-center font-heading text-2xl font-semibold md:text-3xl">
            Des solutions de confiance, adaptées à vous.
          </h3>
          <p className="mt-2 text-center text-foreground/70">
            Rejoignez nos futurs partenaires et clients satisfaits.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-5">
            {["Votre logo", "Client A", "Client B", "Client C", "Client D", "Client E"].map((name) => (
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