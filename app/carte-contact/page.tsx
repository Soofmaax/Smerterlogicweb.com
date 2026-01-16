import type { Metadata } from "next";
import { ContactCardNfc } from "@/components/site/contact-card-nfc";
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
  const siteDomain = SITE_URL.replace(/^https?:\/\//, "");
  const email = CONTACT_EMAIL || null;

  return (
    <ContactCardNfc
      name={name}
      company={company}
      rawPhone={rawPhone}
      siteDomain={siteDomain}
      email={email}
    />
  );
}