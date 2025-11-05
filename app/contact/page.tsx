import { Mail, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/site/tracked-link";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";

export const metadata = {
  title: "Contact — smarterlogicweb.com",
  description: "Contactez-moi pour un devis gratuit ou pour discuter de votre projet.",
  alternates: {
    canonical: "/contact",
    languages: {
      "fr-FR": "/contact",
      "en-US": "/en/contact",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/contact",
    title: "Contact — smarterlogicweb.com",
    description: "Contactez-moi pour un devis gratuit ou pour discuter de votre projet.",
  },
};

export default function ContactPage() {
  return (
    <section className="relative mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      {/* Hero background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
      </div>

      {/* Hero card */}
      <div className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Contact</h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/80">
          Le moyen le plus simple et le plus rapide : l&#39;email. Décrivez votre besoin, vos objectifs et vos contraintes — je reviens vers vous sous 24h.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="rounded-full" variant="cta">
            <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Devis%20gratuit" eventName="cta_devis_mailto_contact">
              <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> contact@smarterlogicweb.com</span>
            </TrackedLink>
          </Button>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Retour à l’accueil</Link>
        </div>

        {/* Badges de réassurance (slide-in) */}
        <Reveal className="reveal-fade-up">
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { Icon: Clock, text: "Réponse sous 24h" },
              { Icon: ShieldCheck, text: "Tarifs transparents" },
              { Icon: CheckCircle2, text: "Sans engagement" },
            ].map((b, i) => (
              <div key={b.text} className="flex items-center gap-2 rounded-xl border bg-card p-3" style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-foreground">
                  <b.Icon className="h-4 w-4" />
                </span>
                <span className="text-sm">{b.text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Formulaire avec validation */}
      <div className="mt-10 rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <Reveal as="h2" className="h2-underline text-left font-heading text-xl font-semibold">Envoyer un message</Reveal>
        <ContactForm locale="fr" action="/merci" />
      </div>

      {/* Conseils pour un premier message efficace */}
      <div className="mt-10 rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <Reveal as="h2" className="h2-underline text-left font-heading text-xl font-semibold">Pour un premier message efficace</Reveal>
        <Reveal className="reveal-fade-up">
          <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
            <li>Objectif principal du site (vitrine, refonte, optimisation…)</li>
            <li>3 à 5 pages envisagées</li>
            <li>Exemples de sites que vous aimez</li>
            <li>Échéance et budget indicatif</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}