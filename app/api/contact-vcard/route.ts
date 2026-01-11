import { NextResponse } from "next/server";
import {
  BRAND_NAME,
  COMPANY_NAME,
  CONTACT_EMAIL,
  PHONE_NUMBER_PUBLIC,
  SITE_URL,
} from "@/config/site";

export const runtime = "nodejs";

export async function GET() {
  const displayName = "Sonia";
  const company = COMPANY_NAME || BRAND_NAME;
  const email = CONTACT_EMAIL;
  const rawPhone = PHONE_NUMBER_PUBLIC || "";

  const phoneNormalized = rawPhone.replace(/[^\d+]/g, "");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${displayName} — ${company}`,
    `ORG:${company}`,
    "TITLE:Développeuse front-end",
    phoneNormalized ? `TEL;TYPE=CELL,VOICE:${phoneNormalized}` : "",
    email ? `EMAIL;TYPE=WORK:${email}` : "",
    `URL:${SITE_URL}`,
    "END:VCARD",
  ].filter(Boolean);

  const body = lines.join("\r\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="contact-smarterlogicweb.vcf"',
      "Cache-Control": "no-store, max-age=0",
    },
  });
}