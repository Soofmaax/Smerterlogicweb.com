import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, PDFPage } from "pdf-lib";

export const runtime = "nodejs";

// Helpers
type Fonts = { regular: any; bold: any };
type Cursor = { page: PDFPage; y: number };

const A4 = [595.28, 841.89] as const;
const MARGIN_X = 48;
const TOP_Y = A4[1] - 64;
const MIN_Y = 72;

function ensureSpace(doc: PDFDocument, cursor: Cursor): Cursor {
  if (cursor.y >= MIN_Y) return cursor;
  const page = doc.addPage(A4 as any);
  return { page, y: TOP_Y };
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

function drawHeading(doc: PDFDocument, cursor: Cursor, fonts: Fonts, text: string, size = 16, color = rgb(0.1, 0.12, 0.2)): Cursor {
  cursor = ensureSpace(doc, cursor);
  cursor.page.drawText(text, { x: MARGIN_X, y: cursor.y, size, font: fonts.bold, color });
  return { ...cursor, y: cursor.y - (size + 10) };
}

function drawSubHeading(doc: PDFDocument, cursor: Cursor, fonts: Fonts, text: string, size = 13): Cursor {
  cursor = ensureSpace(doc, cursor);
  cursor.page.drawText(text, { x: MARGIN_X, y: cursor.y, size, font: fonts.bold, color: rgb(0.12, 0.14, 0.22) });
  return { ...cursor, y: cursor.y - (size + 8) };
}

function drawParagraph(
  doc: PDFDocument,
  cursor: Cursor,
  fonts: Fonts,
  text: string,
  size = 11,
  color = rgb(0.2, 0.22, 0.28),
  leading = 16
): Cursor {
  const maxWidth = A4[0] - MARGIN_X * 2;
  const lines = wrapText(text, fonts.regular, size, maxWidth);
  for (const line of lines) {
    cursor = ensureSpace(doc, cursor);
    cursor.page.drawText(line, { x: MARGIN_X, y: cursor.y, size, font: fonts.regular, color });
    cursor = { ...cursor, y: cursor.y - leading };
  }
  return { ...cursor, y: cursor.y - 4 };
}

function drawBulletList(doc: PDFDocument, cursor: Cursor, fonts: Fonts, items: string[], size = 11): Cursor {
  const maxWidth = A4[0] - MARGIN_X * 2 - 14;
  for (const item of items) {
    cursor = ensureSpace(doc, cursor);
    cursor.page.drawText("• ", { x: MARGIN_X, y: cursor.y, size, font: fonts.bold, color: rgb(0.12, 0.14, 0.22) });
    const lines = wrapText(item, fonts.regular, size, maxWidth);
    let x = MARGIN_X + 14;
    for (let i = 0; i < lines.length; i++) {
      cursor.page.drawText(lines[i], { x, y: cursor.y, size, font: fonts.regular, color: rgb(0.2, 0.22, 0.28) });
      cursor = { ...cursor, y: cursor.y - 16 };
      x = MARGIN_X + 14;
      if (cursor.y < MIN_Y) cursor = ensureSpace(doc, cursor);
    }
    cursor = { ...cursor, y: cursor.y - 2 };
  }
  return cursor;
}

function drawHR(doc: PDFDocument, cursor: Cursor): Cursor {
  cursor = ensureSpace(doc, cursor);
  cursor.page.drawLine({
    start: { x: MARGIN_X, y: cursor.y },
    end: { x: A4[0] - MARGIN_X, y: cursor.y },
    color: rgb(0.85, 0.85, 0.9),
    thickness: 1,
  });
  return { ...cursor, y: cursor.y - 12 };
}

// Route
export async function GET() {
  const doc = await PDFDocument.create();
  const page = doc.addPage(A4 as any);
  const fonts: Fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  let cursor: Cursor = { page, y: TOP_Y };

  // Cover
  cursor = drawHeading(doc, cursor, fonts, "WordPress vs Site Statique : Le VRAI coût sur 3 ans", 18);
  cursor = drawParagraph(doc, cursor, fonts, "Guide comparatif 2025 pour professions libérales", 12, rgb(0.1, 0.12, 0.2), 18);
  cursor = drawHR(doc, cursor);

  // Intro
  cursor = drawSubHeading(doc, cursor, fonts, "Introduction : L'illusion du « site WordPress pas cher »");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Comparer uniquement le prix de création (ex. WordPress 1 500€ vs statique 2 490€) masque l’essentiel : le coût total de possession (TCO) sur 3 ans. Votre site doit être fiable, rapide et sécurisé — une panne, une lenteur, un piratage coûtent cher en image et en opportunités."
  );
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Ce guide présente une analyse chiffrée des coûts réels d’un site WordPress versus un site statique sur 3 ans afin de décider sur des faits, pas sur un prix d’appel."
  );

  // Partie 1
  cursor = drawHeading(doc, cursor, fonts, "Partie 1 : Le coût total de possession d’un site WordPress");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "WordPress est un système dynamique (base de données + code serveur + plugins). Cette architecture exige une maintenance régulière (mises à jour, tests de compatibilité, sauvegardes), sous peine de failles de sécurité et de pannes."
  );
  cursor = drawSubHeading(doc, cursor, fonts, "Les coûts visibles");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Création initiale vitrine (freelance compétent) : 1 500€ à 3 000€. Hébergement pro : 50€ à 200€/an (éviter les offres très bas de gamme). Licences premium : 200€ à 400€/an (sauvegarde, performance, sécurité, builder)."
  );
  cursor = drawSubHeading(doc, cursor, fonts, "Les coûts de maintenance technique");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Mises à jour WordPress + plugins à tester et déployer proprement (environnement de pré‑prod, sauvegarde, retour arrière possible). Forfaits observés : 30€ à 100€/mois (freelance) ; 75€ à 500€/mois (agence). Hypothèse basse (50€/mois) = 1 800€ sur 3 ans."
  );
  cursor = drawSubHeading(doc, cursor, fonts, "Coûts cachés et risques financiers");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Pannes (incompatibilité, plugin défectueux) ; coût de l’interruption selon activité. Sécurité : WordPress, très répandu, est une cible privilégiée ; remise en état en urgence coûteuse et impact réputationnel."
  );
  cursor = drawSubHeading(doc, cursor, fonts, "Exemple chiffré WordPress (vitrine standard)");
  cursor = drawBulletList(doc, cursor, fonts, [
    "Année 0 : création 1 500€.",
    "Années 1–3 : maintenance 600€/an (50€/mois) + licences 250€/an = 850€/an.",
    "Total 3 ans : 1 500€ + (850€ × 3) = 4 050€ (hors pannes/interventions urgentes).",
  ]);

  // Partie 2
  cursor = drawHeading(doc, cursor, fonts, "Partie 2 : Le coût total de possession d’un site statique");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Le site statique est pré‑généré (HTML/CSS/JS), sans base de données ni plugins. Résultat : surface d’attaque minimale, quasi‑absence de maintenance, vitesse supérieure."
  );
  cursor = drawSubHeading(doc, cursor, fonts, "Les coûts visibles");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Création (niveau pro) : 2 490€ TTC (6–8 pages, SEO avancé, contenus optimisés). Hébergement moderne (Netlify/Vercel) : gratuit à faible/moyen trafic. Nom de domaine : 10–20€/an."
  );
  cursor = drawSubHeading(doc, cursor, fonts, "Maintenance technique");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Aucune maintenance obligatoire : pas de mises à jour hebdomadaires, pas de compatibilités plugins à gérer. Le coût de possession récurrent se limite au domaine (~15€/an)."
  );
  cursor = drawSubHeading(doc, cursor, fonts, "Évolution facultative");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Formule Évolution (optionnelle) : 20€/mois, 1h de modifs/mois (cumulable 3 mois), support prioritaire, monitoring, tarifs préférentiels. Activable/désactivable selon besoin."
  );
  cursor = drawSubHeading(doc, cursor, fonts, "Exemple chiffré site statique (offre Professionnel)");
  cursor = drawBulletList(doc, cursor, fonts, [
    "Année 0 : création 2 490€.",
    "Années 1–3 : domaine ~15€/an + Évolution 6 mois/an à 20€/mois = 135€/an.",
    "Total 3 ans : 2 490€ + (135€ × 3) = 2 895€ (ou 2 535€ sans Évolution).",
  ]);

  // Partie 3
  cursor = drawHeading(doc, cursor, fonts, "Partie 3 : Comparaison chiffrée et analyse");
  cursor = drawBulletList(doc, cursor, fonts, [
    "WordPress (freelance, maintenance 50€/mois, licences 250€/an) : 4 050€ / 3 ans.",
    "Site statique (Évolution 6 mois/an) : 2 895€ / 3 ans.",
    "Économie : 1 155€ (≈ –28 %). Avec maintenance agence 100€/mois : économie ≈ 2 755€ (≈ –50 %).",
  ]);
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Hors coûts indirects : statique plus rapide (meilleure conversion), plus sécurisé (moins d’attaques), charge mentale nulle (pas de mises à jour continues)."
  );

  // Partie 4
  cursor = drawHeading(doc, cursor, fonts, "Partie 4 : Pourquoi le statique est‑il plus cher à la création ?");
  cursor = drawBulletList(doc, cursor, fonts, [
    "Exigence technique (Next.js/React), code sur‑mesure plutôt que templates.",
    "Optimisations natives (WebP, cache, lazy‑load, sémantique, mobile‑first).",
    "Coût total de possession maîtrisé : investissement initial pour économies durables.",
  ]);
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Pour un cabinet libéral (avocat, expert‑comptable, architecte…), la fiabilité et la vitesse priment : le site est un actif professionnel, pas un gadget."
  );

  // Conclusion
  cursor = drawHeading(doc, cursor, fonts, "Conclusion : Choisir en fonction de vos priorités");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Le choix ne se résume pas au prix de départ. Souhaitez‑vous le plus bas coût de création, ou le plus bas coût de possession sur 3 ans ? WordPress offre une flexibilité via plugins ; le statique offre fiabilité, sécurité et sérénité."
  );
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Pour les professions libérales, un site statique allie économie mesurable et tranquillité d’esprit. Vous investissez une fois, puis vous économisez."
  );

  // CTA
  cursor = drawHR(doc, cursor);
  cursor = drawSubHeading(doc, cursor, fonts, "Pour aller plus loin");
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Consultez la grille détaillée : smarterlogicweb.com/tarifs-2025"
  );
  cursor = drawParagraph(
    doc,
    cursor,
    fonts,
    "Questions ou devis ? contact@smarterlogicweb.com — Audit gratuit 15 min."
  );

  const bytes = await doc.save();
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="wordpress-vs-site-statique-3-ans.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}