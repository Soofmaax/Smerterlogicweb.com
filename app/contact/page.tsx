import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/site/tracked-link";
import { ContactForm } from "@/components/site/contact-form";

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
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Contact</h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/80">
          Le moyen le plus simple et le plus rapide: l&#39;email. Décrivez votre besoin, vos objectifs et vos contraintes — je reviens vers vous sous 24h.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <TrackedLink href="mailto:contact@smarterlogicweb.com?subject=Devis%20gratuit" eventName="cta_devis_mailto_contact">
              <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> contact@smarterlogicweb.com</span>
            </TrackedLink>
          </Button>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Retour à l’accueil</Link>
        </div>
      </div>

      {/* Formulaire avec validation */}
      <div className="mt-10 rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-xl font-semibold">Envoyer un message</h2>
        <ContactForm locale="fr" action="/merci" />
      </div>

      {/* Conseils pour un premier message efficace */}
      <div className="mt-10 rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-xl font-semibold">Pour un premier message efficace</h2>
        <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-foreground/80">
          <li>Objectif principal du site (vitrine, refonte, optimisation…)</li>
          <li>3 à 5 pages envisagées</li>
          <li>Exemples de sites que vous aimez</li>
          <li>Échéance et budget indicatif</li>
        </ul>
      </div>
    </section>
  );
}