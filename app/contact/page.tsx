import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

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
          Le moyen le plus simple et le plus rapide: l’email. Décrivez votre besoin, vos objectifs et vos contraintes — je reviens vers vous sous 24h.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href="mailto:contact@smarterlogicweb.com?subject=Devis%20gratuit" onClick={() => track("cta_devis_mailto_contact")}>
              <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> contact@smarterlogicweb.com</span>
            </Link>
          </Button>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Retour à l’accueil</Link>
        </div>
      </div>

      {/* Formulaire Netlify Forms */}
      <div className="mt-10 rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-xl font-semibold">Envoyer un message</h2>
        <form
          className="mt-4 grid gap-4"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/merci"
          onSubmit={() => track("form_contact_submitted")}
        >
          {/* Hidden input required by Netlify */}
          <input type="hidden" name="form-name" value="contact" />
          {/* Honeypot anti-spam */}
          <p className="hidden">
            <label>
              Ne pas remplir: <input name="bot-field" />
            </label>
          </p>

          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">Nom</label>
            <input
              id="name"
              name="name"
              required
              className="h-11 rounded-md border bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Votre nom"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="h-11 rounded-md border bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="votrenom@email.com"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="rounded-md border bg-background px-3 py-2 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Décrivez votre besoin, votre objectif et votre échéance."
            />
          </div>

          <div className="flex items-start gap-2">
            <input id="consent" name="consent" type="checkbox" required className="mt-1" />
            <label htmlFor="consent" className="text-sm text-foreground/80">
              J’accepte le traitement de mes données pour répondre à ma demande. Voir{" "}
              <Link href="/politique-de-confidentialite" className="underline">
                la politique de confidentialité
              </Link>.
            </label>
          </div>

          {/* reCAPTCHA Netlify */}
          <div data-netlify-recaptcha="true"></div>

          <div>
            <Button type="submit" className="rounded-full">Envoyer</Button>
          </div>
        </form>
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