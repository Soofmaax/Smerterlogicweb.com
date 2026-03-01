"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

type ContactCardNfcProps = {
  name: string;
  company: string;
  siteDomain: string;
  rawPhone: string;
  email: string | null;
};

export function ContactCardNfc({ name, company, siteDomain, rawPhone, email }: ContactCardNfcProps) {
  const phoneDigits = rawPhone.replace(/\D/g, "");

  const whatsappMessage = "Bonjour, je viens de scanner votre carte SmarterLogicWeb et je souhaite parler de mon projet.";
  const whatsappHref = phoneDigits ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(whatsappMessage)}` : undefined;

  const emailSubject = "Contact via carte SmarterLogicWeb";
  const emailBody =
    "Bonjour,%0D%0A%0D%0AJe viens de scanner votre carte SmarterLogicWeb.%0D%0A%0D%0AMon projet :%0D%0A-%20Contexte%20:%0D%0A-%20Budget%20:%0D%0A-%20Délais%20:%0D%0A%0D%0AMerci.%0D%0A";
  const emailHref = email ? `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}` : undefined;

  const messageHref = whatsappHref || emailHref || "/contact";
  const messageLabel = whatsappHref ? "WhatsApp direct" : "Envoyer un email";

  return (
    <section className="relative flex min-h-[100vh] items-center justify-center bg-background px-6 py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--accent))_0%,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(236,72,153,0.16)_0%,_transparent_55%)]" />
      </div>

      <div className="w-full max-w-sm">
        <div className="rounded-[28px] border bg-card p-6 text-center shadow-lg card-elevated">
          <Link
            href="/"
            className="mx-auto inline-flex items-center justify-center rounded-full px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Retour à l'accueil SmarterLogicWeb"
            onClick={() => track("cta_carte_contact_logo")}
          >
            <Image
              src="/logo-noir.png"
              alt="SmarterLogicWeb"
              width={44}
              height={44}
              className="block h-11 w-11 dark:hidden"
              priority
            />
            <Image
              src="/logo-blanc.png"
              alt="SmarterLogicWeb"
              width={44}
              height={44}
              className="hidden h-11 w-11 dark:block"
              priority
            />
          </Link>

          <h1 className="mt-3 font-heading text-2xl font-semibold">{name} Salwa</h1>
          <p className="text-sm text-muted-foreground">Gourou du numérique — {company}</p>

          <p className="mt-4 text-sm text-foreground/80">
            Choisissez le canal qui vous convient pour me présenter votre projet.
          </p>

          <div className="mt-4 text-xs text-muted-foreground">
            <p>{siteDomain}</p>
            {rawPhone && <p>{rawPhone}</p>}
            {email && <p>{email}</p>}
          </div>

          <div className="mt-6 space-y-3">
            <Button asChild size="lg" variant="cta" className="w-full rounded-full btn-lift">
              <a
                href={messageHref}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noopener noreferrer" : undefined}
                onClick={() =>
                  track("cta_carte_contact_message", {
                    type: whatsappHref ? "whatsapp" : "email",
                  })
                }
              >
                {messageLabel}
              </a>
            </Button>

            <Button asChild size="lg" variant="default" className="w-full rounded-full btn-lift">
              <Link href="/projets" onClick={() => track("cta_carte_contact_portfolio")}>
                Voir mon portfolio
              </Link>
            </Button>

            <Button asChild size="lg" variant="secondary" className="w-full rounded-full btn-lift">
              <Link href="/" onClick={() => track("cta_carte_contact_home")}>
                Découvrir le site
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full rounded-full btn-lift">
              <a href="/api/contact-vcard" onClick={() => track("cta_carte_contact_vcard")}>
                Ajouter à mes contacts
              </a>
            </Button>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            Carte NFC réalisée par <span className="font-medium text-foreground/80">SmarterLogicWeb</span>.
          </p>
        </div>
      </div>
    </section>
  );
}