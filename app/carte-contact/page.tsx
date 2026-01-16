import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { BRAND_NAME, COMPANY_NAME, PHONE_NUMBER_PUBLIC, SITE_URL, CONTACT_EMAIL } from "@/config/site";

export const metadata: Metadata = {
  title: "Carte de contact — smarterlogicweb.com",
  description: "Ajoutez Sonia à votre répertoire, découvrez son portfolio ou envoyez-lui un message.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ContactCardPage() {
  const name = "Sonia";
  const company = COMPANY_NAME || BRAND_NAME;
  const rawPhone = PHONE_NUMBER_PUBLIC || "";
  const phoneDisplay = rawPhone || "Téléphone";
  const phoneDigits = rawPhone.replace(/\D/g, "");
  const whatsappHref = phoneDigits ? `https://wa.me/${phoneDigits}` : undefined;

  const messageHref = whatsappHref || (CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}?subject=Contact%20depuis%20votre%20carte` : "/contact");
  const messageLabel = whatsappHref ? "M'envoyer un message WhatsApp" : "M'envoyer un message";

  return (
    <section className="relative flex min-h-[100vh] items-center justify-center bg-background px-6 py-10">
      <Reveal className="reveal-spin-card w-full max-w-sm">
        <div className="rounded-[28px] border bg-card p-6 text-center shadow-lg card-elevated card-spin">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-200 via-blue-200 to-emerald-200 text-3xl font-semibold text-foreground/80 dark:from-white/10 dark:via-white/10 dark:to-white/5">
            {name.charAt(0).toUpperCase()}
          </div>
          <h1 className="mt-4 font-heading text-2xl font-semibold">
            {name} Salwa
          </h1>
          <p className="text-sm text-muted-foreground">
            Gourou du numérique — {company}
          </p>

          <div className="mt-4 text-xs text-muted-foreground">
            <p>{SITE_URL.replace(/^https?:\/\//, "")}</p>
            {rawPhone && <p>{rawPhone}</p>}
            {CONTACT_EMAIL && <p>{CONTACT_EMAIL}</p>}
          </div>

          <div className="mt-6 space-y-3">
            {/* CTA principal : m'envoyer un message */}
            <Button
              asChild
              size="lg"
              variant="cta"
              className="w-full rounded-full btn-lift"
            >
              <a
                href={messageHref}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noopener noreferrer" : undefined}
              >
                {messageLabel}
              </a>
            </Button>

            {/* Voir le portfolio */}
            <Button
              asChild
              size="lg"
              variant="default"
              className="w-full rounded-full btn-lift"
            >
              <Link href="/projets">
                Voir mon portfolio
              </Link>
            </Button>

            {/* Visiter le site */}
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full rounded-full btn-lift"
            >
              <Link href="/">
                Visiter mon site
              </Link>
            </Button>

            {/* Enregistrer les coordonnées (vCard) */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full btn-lift"
            >
              <a href="/api/contact-vcard">
                Enregistrer mes coordonnées
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}