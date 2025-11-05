import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { EngagementTimeline } from "@/components/site/engagement-timeline";
import { MagneticZone } from "@/components/site/magnetic";
import { HandHeart, BadgeCheck, GraduationCap, MessageSquareQuote } from "lucide-react";
import { projectsFR } from "@/data/projects";

export const metadata = {
  title: "Engagement — smarterlogicweb.com",
  description:
    "Le web au service de tous : tarifs justes, accompagnement associatif et transmission. Actions concrètes et résultats mesurables.",
  alternates: {
    canonical: "/engagement-associatif",
    languages: {
      "fr-FR": "/engagement-associatif",
      "en-US": "/en/nonprofit-commitment",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/engagement-associatif",
    title: "Engagement — smarterlogicweb.com",
    description:
      "Le web au service de tous : tarifs justes, accompagnement associatif et transmission. Actions concrètes et résultats mesurables.",
  },
};

export default function EngagementAssociatifPage() {
  const asso = projectsFR.cases.find((c) => c.sector === "Association");

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="px-3 py-1">Engagement</Badge>
        <Reveal className="reveal-fade-up">
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">Le Web au Service de Tous</h1>
        </Reveal>
        <Reveal className="reveal-fade-up" >
          <p className="mt-4 text-foreground/80">
            Parce qu&apos;une présence en ligne ne devrait pas être un luxe réservé aux grandes entreprises.
          </p>
        </Reveal>
      </div>

      {/* Vision */}
      <div className="mx-auto mt-10 max-w-3xl">
        <Reveal className="reveal-fade-up">
          <h2 className="h2-underline inline-block font-heading text-3xl font-semibold md:text-4xl">Pourquoi Cet Engagement</h2>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-4 text-lg leading-relaxed text-foreground/80">
            J&apos;ai créé smarterlogicweb avec une conviction : chaque artisan, commerce local ou association mérite un site web
            professionnel. Trop souvent, les petites structures sont exclues du numérique à cause de prix prohibitifs, de solutions
            inadaptées ou d&apos;un discours trop technique.
          </p>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-4 text-lg leading-relaxed text-foreground/80">
            Mon engagement : rendre le web accessible. Tarifs transparents, accompagnement humain, zéro jargon. Votre réussite en ligne
            ne doit pas dépendre de votre budget ou de vos connaissances techniques.
          </p>
        </Reveal>
      </div>

      {/* Engagements concrets (3 cartes) */}
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: <BadgeCheck className="h-5 w-5" />,
            title: "Tarifs Justes et Transparents",
            desc:
              "Prix fixes annoncés dès le départ. Pas de frais cachés. Des formules accessibles aux artisans et TPE, pas pensées pour maximiser mes marges.",
          },
          {
            icon: <HandHeart className="h-5 w-5" />,
            title: "Accompagnement Associatif",
            desc:
              "Une partie de mon temps est consacrée à des projets associatifs à tarif solidaire ou bénévole. Si votre association œuvre pour l'intérêt général, contactez‑moi.",
          },
          {
            icon: <GraduationCap className="h-5 w-5" />,
            title: "Transmission de Compétences",
            desc:
              "Formation incluse à la livraison. Vous êtes autonome sur votre site. Pas de dépendance technique, le code vous appartient.",
          },
        ].map((c, i) => (
          <Reveal key={i} className="reveal-fade-up">
            <article
              className="rounded-[20px] card-elevated border bg-card p-6"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                {c.icon}
              </div>
              <h3 className="mt-3 font-heading text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-foreground/80">{c.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Actions concrètes (timeline) */}
      <div className="mt-4">
        <EngagementTimeline />
      </div>

      {/* Association spotlight */}
      {asso ? (
        <div className="mt-2">
          <Reveal className="reveal-fade-up">
            <h2 className="h2-underline inline-block font-heading text-3xl font-semibold md:text-4xl">
              L&apos;Association — Un Projet Qui Compte
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article className="rounded-[20px] border bg-card p-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-background">
                {/* Photo hover scale */}
                <div className="photo-hover relative h-full w-full">
                  {/* Placeholder or first image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 via-primary/10 to-orange-200/30 dark:from-white/5 dark:via-white/5 dark:to-white/5" />
                </div>
              </div>
              <h3 className="mt-3 font-heading text-lg font-semibold">{asso.title}</h3>
              <p className="mt-2 text-sm text-foreground/80">{asso.description}</p>
              {asso.kpis && (
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {asso.kpis.slice(0, 3).map((k, i) => (
                    <li key={i} className="rounded-md border bg-muted/40 p-2 text-center">
                      <div className="text-xs text-muted-foreground">{k.label}</div>
                      <div className="text-sm font-semibold">{k.value}</div>
                    </li>
                  ))}
                </ul>
              )}
            </article>
            <article className="rounded-[20px] border bg-card p-5">
              <div className="flex items-start gap-2">
                <MessageSquareQuote className="mt-1 h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-foreground/80">
                  {asso.testimonialFull ||
                    "J'ai eu la chance d'accompagner une association locale pour clarifier leur message et les aider à toucher plus de personnes."}
                </p>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <div>Formule: <span className="font-medium">{asso.formula || "Vitrine"}</span></div>
                <div>Durée: <span className="font-medium">{asso.duration || "2–4 semaines"}</span></div>
                <div>Technos: <span className="font-medium">{asso.tags.slice(0,2).join(", ")}</span></div>
              </div>
              <div className="mt-5 flex items-center gap-2">
                {asso.url ? (
                  <a
                    href={asso.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
                  >
                    Voir le site
                  </a>
                ) : null}
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
                >
                  Un projet similaire ?
                </a>
              </div>
            </article>
          </div>
        </div>
      ) : null}

      {/* Vous êtes une association ? */}
      <div className="mt-12">
        <div className="pulse-border rounded-[24px] border bg-card p-6">
          <h3 className="font-heading text-2xl font-semibold">Vous Êtes Une Association ?</h3>
          <p className="mt-2 text-foreground/80">
            Vous portez un projet d’intérêt général ? Parlons‑en. Je propose des tarifs solidaires adaptés à votre budget.
          </p>
          <div className="mt-4">
            <Button asChild className="rounded-full" variant="cta" data-magnetic="true">
              <Link href="mailto:contact@smarterlogicweb.com?subject=Tarif%20solidaire%20-%20Association">Demander un tarif solidaire</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="mt-10">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Construisons Ensemble un Web Plus Accessible</h2>
          <p className="mt-2 text-foreground/80">Que vous soyez artisan, TPE ou association, votre projet mérite d&apos;exister en ligne.</p>
          <MagneticZone>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full" variant="cta" data-magnetic="true">
                <Link href="/contact">Discutons de votre projet</Link>
              </Button>
              <Button asChild className="rounded-full" variant="secondary" data-magnetic="true">
                <Link href="/projets">Voir mes réalisations</Link>
              </Button>
            </div>
          </MagneticZone>
        </div>
      </div>
    </section>
  );
}