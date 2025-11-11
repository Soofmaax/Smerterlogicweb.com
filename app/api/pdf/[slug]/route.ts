import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, PDFPage } from "pdf-lib";
import { RESOURCES } from "@/data/resources";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  // Validate resource exists
  const resource = RESOURCES.find((r) => r.slug === slug);
  if (!resource) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  // 1) Serve static PDF from public/pdfs/<slug>.pdf if present
  const staticPath = path.join(process.cwd(), "public", "pdfs", `${slug}.pdf`);
  try {
    await fs.access(staticPath);
    const file = await fs.readFile(staticPath);
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}.pdf"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    // not found — fall through to generator
  }

  // 2) Generate on the fly based on slug (basic templates)
  switch (slug) {
    case "checklist-gmb":
      return NextResponse.from(await generateGMBChecklist("fr"));
    case "gmb-checklist":
      return NextResponse.from(await generateGMBChecklist("en"));
    default:
      return NextResponse.json(
        { error: "No generator available for this resource. Upload a static PDF under /public/pdfs." },
        { status: 404 }
      );
  }
}

/* Generators */

async function generateGMBChecklist(locale: "fr" | "en") {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.28, 841.89]); // A4 portrait
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const marginX = 48;
  let cursorY = height - 64;

  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  // Title
  const title = t(
    "Checklist Google My Business — Local Pack en 2–8 semaines",
    "Google Business Profile Checklist — Local Pack in 2–8 weeks"
  );
  page.drawText(title, {
    x: marginX,
    y: cursorY,
    size: 16,
    font: fontBold,
    color: rgb(0.1, 0.12, 0.2),
  });
  cursorY -= 28;

  // Intro
  const intro = t(
    "Les actions prioritaires pour apparaître dans le Local Pack et capter des appels rapidement : profil complet, photos, avis, NAP, posts.",
    "The key actions to reach the Local Pack and generate calls fast: complete profile, photos, reviews, NAP, posts."
  );
  ({ page, cursorY } = drawParagraph(page, pdfDoc, intro, font, 11, width - marginX * 2, marginX, cursorY));

  const steps = locale === "fr"
    ? [
        "Créer/revendiquer la fiche sur Google Business Profile et vérifier l’adresse.",
        "Remplir 100% des infos : nom, adresse, téléphone (numéro local), horaires, site, catégories précises.",
        "Rédiger une description claire avec mots-clés locaux (métier + ville).",
        "Ajouter 10+ photos (logo, couverture, réalisations, équipe) — qualité et authenticité.",
        "Collecter des avis clients en continu (envoyer le lien direct) et répondre à tous les avis.",
        "Publier 1–2 posts par mois (actu, offre, réalisation récente) avec photo et CTA.",
        "Vérifier la cohérence NAP (Name-Address-Phone) sur site, réseaux et annuaires.",
        "Suivre les statistiques GMB : impressions, clics, appels, itinéraires — ajuster catégories/zone.",
        "Lier la fiche vers votre site web et intégrer la carte/avis GMB sur votre site.",
        "Répéter chaque mois : nouveaux avis, nouvelles photos, posts réguliers.",
      ]
    : [
        "Create/claim your Google Business Profile and verify the address.",
        "Fill 100% of info: name, address, local phone, hours, website, precise categories.",
        "Write a clear description with local keywords (service + city).",
        "Add 10+ photos (logo, cover, work, team) — authentic and high-quality.",
        "Collect customer reviews continuously (share direct link) and reply to all.",
        "Publish 1–2 posts per month (news, offer, recent work) with photo and CTA.",
        "Ensure NAP consistency across website, socials and directories.",
        "Track GBP stats: impressions, clicks, calls, directions — adjust categories/area.",
        "Link to your website and embed GBP map/reviews on-site.",
        "Repeat monthly: new reviews, new photos, regular posts.",
      ];

  // Steps
  const bulletSize = 11;
  for (let i = 0; i < steps.length; i++) {
    const bullet = `${i + 1}. `;
    const bulletWidth = font.widthOfTextAtSize(bullet, bulletSize);
    const lines = wrapText(steps[i], font, bulletSize, width - marginX * 2 - bulletWidth);
    for (let idx = 0; idx < lines.length; idx++) {
      ({ page, cursorY } = ensureSpace(pdfDoc, page, cursorY));
      if (idx === 0) {
        page.drawText(bullet, { x: marginX, y: cursorY, size: bulletSize, font: fontBold, color: rgb(0.1, 0.12, 0.2) });
      }
      page.drawText(lines[idx], {
        x: marginX + bulletWidth,
        y: cursorY,
        size: bulletSize,
        font,
        color: rgb(0.1, 0.12, 0.2),
      });
      cursorY -= 16;
    }
    cursorY -= 4;
  }

  // Footer
  ({ page, cursorY } = ensureSpace(pdfDoc, page, cursorY));
  const note = t(
    "Astuce : combinez cette checklist avec un site vitrine rapide et clair. Voir smarterlogicweb.com/google-my-business-ou-site-web",
    "Tip: combine this checklist with a fast, clear website. See smarterlogicweb.com/google-my-business-ou-site-web"
  );
  ({ page, cursorY } = drawParagraph(page, pdfDoc, note, font, 10, width - marginX * 2, marginX, cursorY, 14));

  const bytes = await pdfDoc.save();
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slugForLocale(locale)}.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function slugForLocale(locale: "fr" | "en") {
  return locale === "fr" ? "checklist-gmb" : "gmb-checklist";
}

/* Helpers */

function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    const width = font.widthOfTextAtSize(test, size);
    if (width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function ensureSpace(pdfDoc: PDFDocument, page: PDFPage, cursorY: number): { page: PDFPage; cursorY: number } {
  if (cursorY >= 72) return { page, cursorY };
  const newPage = pdfDoc.addPage([595.28, 841.89]);
  return { page: newPage, cursorY: 841.89 - 64 };
}

function drawParagraph(
  page: PDFPage,
  pdfDoc: PDFDocument,
  text: string,
  font: any,
  size: number,
  maxWidth: number,
  x: number,
  y: number,
  lineHeight = 16
): { page: PDFPage; cursorY: number } {
  let cursorY = y;
  const lines = wrapText(text, font, size, maxWidth);
  for (const line of lines) {
    ({ page, cursorY } = ensureSpace(pdfDoc, page, cursorY));
    page.drawText(line, { x, y: cursorY, size, font, color: rgb(0.2, 0.22, 0.28) });
    cursorY -= lineHeight;
  }
  cursorY -= 8;
  return { page, cursorY };
}