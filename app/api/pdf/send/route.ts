import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  email?: string;
  slug?: string;
};

const ALLOWED_SLUGS = new Set<string>([
  "grille-tarifs-2025",
  "wp-vs-site-statique-3-ans",
]);

function getSiteUrl(req: Request) {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/$/, "");
  const host = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "").trim();
  const proto = (req.headers.get("x-forwarded-proto") || "https").trim();
  if (host) return `${proto}://${host}`;
  return "https://smarterlogicweb.com";
}

export async function POST(req: Request) {
  let data: Payload = {};
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (data.email || "").trim();
  const slug = (data.slug || "").trim();

  if (!email || !slug || !ALLOWED_SLUGS.has(slug)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const siteUrl = getSiteUrl(req);
  const downloadUrl = `${siteUrl}/api/pdf/${slug}`;

  let emailed = false;

  const apiKey = process.env.RESEND_API_KEY || "";
  const from = process.env.RESEND_FROM || "SmarterLogicWeb <contact@smarterlogicweb.com>";

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to: email,
        subject: "Votre guide — SmarterLogicWeb",
        html: `
          <div style="font-family: Inter, Arial, sans-serif; color:#111827">
            <p>Bonjour,</p>
            <p>Voici le lien pour télécharger votre guide :</p>
            <p><a href="${downloadUrl}" target="_blank" rel="noopener">Télécharger le PDF</a></p>
            <p>Si vous avez des questions, répondez simplement à cet email.</p>
            <p>— SmarterLogicWeb</p>
          </div>
        `,
        text: `Bonjour,\n\nVoici le lien pour télécharger votre guide:\n${downloadUrl}\n\n— SmarterLogicWeb`,
      });
      emailed = true;
    } catch (err) {
      emailed = false;
    }
  }

  return NextResponse.json({ ok: true, emailed, downloadUrl });
}