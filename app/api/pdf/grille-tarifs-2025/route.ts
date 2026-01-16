import { NextResponse } from "next/server";
import { SITE_URL } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Cette ressource n'est plus utilisée : les projets sont désormais chiffrés uniquement sur devis.
  return NextResponse.redirect(`${SITE_URL}/contact`, 308);
}