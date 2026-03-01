import type { Metadata } from "next";
import { ContactCardNfc } from "@/components/site/contact-card-nfc";
import { BRAND_NAME, COMPANY_NAME, PHONE_NUMBER_PUBLIC, SITE_URL, CONTACT_EMAIL } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact direct — SmarterLogicWeb",
  description: "Vous avez scanné ma carte. WhatsApp, email, portfolio et vCard en un clic.",
  alternates: {
    canonical: "/carte-contact",
  },
  robots: {
    index: false,
    follow: false,
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