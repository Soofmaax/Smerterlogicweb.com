import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, PDFPage } from "pdf-lib";

export const runtime = "edge";

export async function GET() {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.28, 841.89]); // A4 portrait
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const marginX = 48;
  let cursorY = height - 64;

  // Title
  const title = "Checklist Google My Business — Local Pack en 2–8 semaines";
  page.drawText(title, {
    x: marginX,
    y: cursorY,
    size: 16,
    font: fontBold,
    color: rgb(0.1, 0.12, 0.2),
  });
  cursorY -= 28;

  // Intro
  const intro =
    "Les actions prioritaires pour apparaître dans le Local Pack et capter des appels rapidement : profil complet, photos, avis, NAP, posts.";
  const introLines = wrapText(intro, font, 11, width - marginX * 2);
  for (const line of introLines) {
    ({ page, cursorY } = ensureSpace(pdfDoc, page, cursorY, height, marginX, font, fontBold));
    page.drawText(line, { x: marginX, y: cursorY, size: 11, font, color: rgb(0.2, 0.22, 0.28) });
    cursorY -= 16;
  }
  cursorY -= 8;

  const steps = [
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
  ];

  // Draw steps as bullet list
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    const bullet = `${i + 1}. `;
    const bulletWidth = font.widthOfTextAtSize(bullet, 11);
    const lines = wrapText(s, font, 11, width - marginX * 2 - bulletWidth);

    for (let idx = 0; idx < lines.length; idx++) {
      ({ page, cursorY } = ensureSpace(pdfDoc, page, cursorY, height, marginX, font, fontBold));
      if (idx === 0) {
        page.drawText(bullet, { x: marginX, y: cursorY, size: 11, font: fontBold, color: rgb(0.1, 0.12, 0.2) });
      }
      page.drawText(lines[idx], {
        x: marginX + bulletWidth,
        y: cursorY,
        size: 11,
        font,
        color: rgb(0.1, 0.12, 0.2),
      });
      cursorY -= 16;
    }
    cursorY -= 4;
  }

  // Footer note
  ({ page, cursorY } = ensureSpace(pdfDoc, page, cursorY, height, marginX, font, fontBold));
  const note =
    "Astuce : combinez cette checklist avec un site vitrine statique rapide et clair. Voir aussi smarterlogicweb.com/google-my-business-ou-site-web";
  const noteLines = wrapText(note, font, 10, width - marginX * 2);
  for (const line of noteLines) {
    ({ page, cursorY } = ensureSpace(pdfDoc, page, cursorY, height, marginX, font, fontBold));
    page.drawText(line, { x: marginX, y: cursorY, size: 10, font, color: rgb(0.3, 0.32, 0.38) });
    cursorY -= 14;
  }

  const bytes = await pdfDoc.save();
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="checklist-gmb.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}

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

function ensureSpace(
  pdfDoc: PDFDocument,
  page: PDFPage,
  cursorY: number,
  height: number,
  marginX: number,
  font: any,
  fontBold: any
): { page: PDFPage; cursorY: number } {
  if (cursorY >= 72) return { page, cursorY };
  const newPage = pdfDoc.addPage([595.28, 841.89]);
  // Reset cursor near top
  return { page: newPage, cursorY: 841.89 - 64 };
}