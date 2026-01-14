import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BRAND_NAME, COMPANY_NAME, PHONE_NUMBER_PUBLIC, SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Carte de contact — smarterlogicweb.com",
  description: "Ajoutez Sonia à votre répertoire, visitez le site ou envoyez un message WhatsApp.",
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

  return (
    <section className="flex min-h-[100vh] items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-sm rounded-[28px] border bg-card p-6 text-center shadow-lg card-elevated">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-200 via-blue-200 to-emerald-200 text-3xl font-semibold text-foreground/80 dark:from-white/10 dark:via-white/10 dark:to-white/5">
          {name.charAt(0).toUpperCase()}
        </div>
        <h1 className="mt-4 font-heading text-2xl font-semibold">
          {name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Développeuse front-end — {company}
        </p>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>{SITE_URL.replace(/^https?:\/\//, "")}</p>
          {rawPhone && <p>{rawPhone}</p>}
        </div>

        <div className="mt-6 space-y-3">
          {/* Enregistrer le contact (vCard) */}
          <Button
            asChild
            size="lg"
            variant="cta"
            className="w-full rounded-full"
          >
            <a href="/api/contact-vcard">
              Enregistrer le contact
            </a>
          </Button>

          {/* Visiter le site */}
          <Button
            asChild
            size="lg"
            variant="default"
            className="w-full rounded-full"
          >
            <Link href="/">
              Visiter le site
            </Link>
          </Button>

          {/* WhatsApp */}
          {whatsappHref ? (
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full rounded-full"
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                M&apos;envoyer un WhatsApp
              </a>
            </Button>
          ) : (
            <Button
              disabled
              size="lg"
              variant="secondary"
              className="w-full rounded-full"
            >
              WhatsApp non disponible
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}