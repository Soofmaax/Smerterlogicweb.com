import { PDFDocument, StandardFonts, rgb, PDFPage } from "pdf-lib";
import { promises as fs } from "node:fs";
import path from "node:path";

export type PdfFonts = { regular: any; bold: any; heading?: any; headingBold?: any };
export type Cursor = { page: PDFPage; y: number };

export const A4: readonly [number, number] = [595.28, 841.89];
export const MARGIN_X = 48;
const TOP_Y = A4[1] - 64;
const MIN_Y = 72;

export const BRAND_PRIMARY = rgb(99 / 255, 102 / 255, 241 / 255); // #6366f1
export const BRAND_ACCENT = rgb(34 / 255, 211 / 255, 238 / 255);  // #22d3ee
export const TEXT_MAIN = rgb(0.2, 0.22, 0.28);
export const TEXT_HEAD = rgb(0.1, 0.12, 0.2);

// Normalize text to avoid unsupported glyphs when falling back to WinAnsi fonts (e.g., Helvetica)
// Replace narrow no-break space (U+202F) with regular space
function normalizePdfText(text: string): string {
  return text.replace(/\u202F/g, " ");
}

export async function createBrandDoc() {
  const doc = await PDFDocument.create();
  const page = doc.addPage(A4 as any);

  // Defaults (fallback Helvetica)
  let fonts: PdfFonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  // Try to embed brand fonts from local files (public/fonts/pdf)
  try {
    const base = path.join(process.cwd(), "public", "fonts", "pdf");
    const [interReg, interBold, dmReg, dmBold] = await Promise.all([
      fs.readFile(path.join(base, "Inter-Regular.ttf")),
      fs.readFile(path.join(base, "Inter-Bold.ttf")),
      fs.readFile(path.join(base, "DMSans-Regular.ttf")),
      fs.readFile(path.join(base, "DMSans-Bold.ttf")),
    ]);

    const interRegular = await doc.embedFont(interReg as unknown as Uint8Array);
    const interBoldF = await doc.embedFont(interBold as unknown as Uint8Array);
    const dmRegular = await doc.embedFont(dmReg as unknown as Uint8Array);
    const dmBoldF = await doc.embedFont(dmBold as unknown as Uint8Array);

    fonts = {
      regular: interRegular,
      bold: interBoldF,
      heading: dmRegular,
      headingBold: dmBoldF,
    };
  } catch {
    // Keep Helvetica fallback silently
  }

  // Top brand bar
  page.drawRectangle({
    x: 0,
    y: A4[1] - 28,
    width: A4[0],
    height: 28,
    color: BRAND_PRIMARY,
  });
  page.drawText(normalizePdfText("smarterlogicweb"), {
    x: MARGIN_X,
    y: A4[1] - 20,
    size: 10,
    font: fonts.bold,
    color: rgb(1, 1, 1),
  });

  const cursor: Cursor = { page, y: TOP_Y };
  return { doc, page, fonts, cursor };
}

export function ensureSpace(doc: PDFDocument, cursor: Cursor, fonts: PdfFonts): Cursor {
  if (cursor.y >= MIN_Y) return cursor;
  const page = doc.addPage(A4 as any);
  // header bar on each new page
  page.drawRectangle({
    x: 0,
    y: A4[1] - 28,
    width: A4[0],
    height: 28,
    color: BRAND_PRIMARY,
  });
  page.drawText(normalizePdfText("smarterlogicweb"), {
    x: MARGIN_X,
    y: A4[1] - 20,
    size: 10,
    font: fonts.bold,
    color: rgb(1, 1, 1),
  });
  return { page, y: TOP_Y };
}

export function heading1(doc: PDFDocument, cursor: Cursor, fonts: PdfFonts, text: string, size = 18): Cursor {
  cursor = ensureSpace(doc, cursor, fonts);
  const safe = normalizePdfText(text);
  cursor.page.drawText(safe, { x: MARGIN_X, y: cursor.y, size, font: fonts.headingBold ?? fonts.bold, color: TEXT_HEAD });
  return { ...cursor, y: cursor.y - (size + 10) };
}

export function heading2(doc: PDFDocument, cursor: Cursor, fonts: PdfFonts, text: string, size = 13): Cursor {
  cursor = ensureSpace(doc, cursor, fonts);
  const safe = normalizePdfText(text);
  cursor.page.drawText(safe, { x: MARGIN_X, y: cursor.y, size, font: fonts.headingBold ?? fonts.bold, color: rgb(0.12, 0.14, 0.22) });
  return { ...cursor, y: cursor.y - (size + 8) };
}

export function paragraph(
  doc: PDFDocument,
  cursor: Cursor,
  fonts: PdfFonts,
  text: string,
  size = 11,
  color = TEXT_MAIN,
  leading = 16
): Cursor {
  const maxWidth = A4[0] - MARGIN_X * 2;
  const lines = wrapText(text, fonts.regular, size, maxWidth);
  for (const line of lines) {
    cursor = ensureSpace(doc, cursor, fonts);
    cursor.page.drawText(line, { x: MARGIN_X, y: cursor.y, size, font: fonts.regular, color });
    cursor = { ...cursor, y: cursor.y - leading };
  }
  return { ...cursor, y: cursor.y - 4 };
}

export function bulletList(doc: PDFDocument, cursor: Cursor, fonts: PdfFonts, items: string[], size = 11): Cursor {
  const maxWidth = A4[0] - MARGIN_X * 2 - 14;
  for (const item of items) {
    cursor = ensureSpace(doc, cursor, fonts);
    cursor.page.drawText("• ", { x: MARGIN_X, y: cursor.y, size, font: fonts.bold, color: rgb(0.12, 0.14, 0.22) });
    const lines = wrapText(item, fonts.regular, size, maxWidth);
    let x = MARGIN_X + 14;
    for (let i = 0; i < lines.length; i++) {
      cursor.page.drawText(lines[i], { x, y: cursor.y, size, font: fonts.regular, color: TEXT_MAIN });
      cursor = { ...cursor, y: cursor.y - 16 };
      x = MARGIN_X + 14;
      if (cursor.y < MIN_Y) cursor = ensureSpace(doc, cursor, fonts);
    }
    cursor = { ...cursor, y: cursor.y - 2 };
  }
  return cursor;
}

export function hr(doc: PDFDocument, cursor: Cursor, fonts?: PdfFonts): Cursor {
  if (fonts) cursor = ensureSpace(doc, cursor, fonts);
  cursor.page.drawLine({
    start: { x: MARGIN_X, y: cursor.y },
    end: { x: A4[0] - MARGIN_X, y: cursor.y },
    color: rgb(0.85, 0.85, 0.9),
    thickness: 1,
  });
  return { ...cursor, y: cursor.y - 12 };
}

export function addFooters(doc: PDFDocument, fonts: PdfFonts) {
  const pages = doc.getPages();
  const total = pages.length;
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    // separator
    p.drawLine({
      start: { x: MARGIN_X, y: 52 },
      end: { x: A4[0] - MARGIN_X, y: 52 },
      color: rgb(0.9, 0.9, 0.94),
      thickness: 1,
    });
    p.drawText(normalizePdfText("smarterlogicweb.com — contact@smarterlogicweb.com — 2025"), {
      x: MARGIN_X,
      y: 36,
      size: 9,
      font: fonts.regular,
      color: rgb(0.45, 0.48, 0.56),
    });
    const num = normalizePdfText(`Page ${i + 1}/${total}`);
    const numWidth = fonts.regular.widthOfTextAtSize(num, 9);
    p.drawText(num, {
      x: A4[0] - MARGIN_X - numWidth,
      y: 36,
      size: 9,
      font: fonts.regular,
      color: rgb(0.45, 0.48, 0.56),
    });
  }
}

export function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  const safe = normalizePdfText(text);
  const words = safe.split(" ");
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

/* Extras: callout, checklist with ✓, CTA banner */

export function calloutBox(
  doc: PDFDocument,
  cursor: Cursor,
  fonts: PdfFonts,
  title: string,
  lines: string[],
  tone: "info" | "success" | "warning" = "info"
): Cursor {
  const bg =
    tone === "success"
      ? rgb(0.92, 0.98, 0.94)
      : tone === "warning"
      ? rgb(0.99, 0.96, 0.9)
      : rgb(0.93, 0.98, 0.99);
  const border =
    tone === "success"
      ? rgb(0.6, 0.85, 0.7)
      : tone === "warning"
      ? rgb(0.95, 0.8, 0.5)
      : BRAND_ACCENT;

  // Measure height
  const padding = 12;
  let height = 0;
  const titleSize = 12;
  const bodySize = 10.5;
  const maxWidth = A4[0] - MARGIN_X * 2 - padding * 2;
  const titleLines = wrapText(title, fonts.headingBold ?? fonts.bold, titleSize, maxWidth);
  height += titleLines.length * 16 + 6;
  for (const l of lines) {
    const ls = wrapText(l, fonts.regular, bodySize, maxWidth);
    height += ls.length * 14 + 2;
  }
  height += padding * 2;

  // New page if needed
  if (cursor.y - height < MIN_Y) {
    cursor = ensureSpace(doc, cursor, fonts);
  }

  const yTop = cursor.y;
  // Box
  cursor.page.drawRectangle({
    x: MARGIN_X,
    y: yTop - height,
    width: A4[0] - MARGIN_X * 2,
    height,
    color: bg,
    borderColor: border,
    borderWidth: 1,
  });

  // Title
  let y = yTop - padding - titleSize;
  for (const tl of titleLines) {
    cursor.page.drawText(tl, { x: MARGIN_X + padding, y, size: titleSize, font: fonts.headingBold ?? fonts.bold, color: TEXT_HEAD });
    y -= 16;
  }
  y -= 2;

  // Body
  for (const l of lines) {
    const ls = wrapText(l, fonts.regular, bodySize, maxWidth);
    for (const line of ls) {
      cursor.page.drawText(line, { x: MARGIN_X + padding, y, size: bodySize, font: fonts.regular, color: TEXT_MAIN });
      y -= 14;
    }
    y -= 2;
  }

  return { ...cursor, y: yTop - height - 8 };
}

export function checkList(doc: PDFDocument, cursor: Cursor, fonts: PdfFonts, items: string[], size = 11): Cursor {
  const maxWidth = A4[0] - MARGIN_X * 2 - 16;
  for (const it of items) {
    cursor = ensureSpace(doc, cursor, fonts);
    cursor.page.drawText("✓ ", { x: MARGIN_X, y: cursor.y, size, font: fonts.bold, color: BRAND_PRIMARY });
    const lines = wrapText(it, fonts.regular, size, maxWidth);
    let x = MARGIN_X + 16;
    for (const l of lines) {
      cursor.page.drawText(l, { x, y: cursor.y, size, font: fonts.regular, color: TEXT_MAIN });
      cursor = { ...cursor, y: cursor.y - 16 };
      if (cursor.y < MIN_Y) cursor = ensureSpace(doc, cursor, fonts);
    }
    cursor = { ...cursor, y: cursor.y - 2 };
  }
  return cursor;
}

export function ctaBanner(
  doc: PDFDocument,
  cursor: Cursor,
  fonts: PdfFonts,
  lines: string[]
): Cursor {
  const padding = 14;
  const size = 12.5;
  const maxWidth = A4[0] - MARGIN_X * 2 - padding * 2;

  // Measure height
  let height = padding * 2;
  for (const l of lines) {
    const ls = wrapText(l, fonts.bold, size, maxWidth);
    height += ls.length * 18 + 2;
  }

  if (cursor.y - height < MIN_Y) cursor = ensureSpace(doc, cursor, fonts);

  const yTop = cursor.y;
  cursor.page.drawRectangle({
    x: MARGIN_X,
    y: yTop - height,
    width: A4[0] - MARGIN_X * 2,
    height,
    color: BRAND_PRIMARY,
  });

  let y = yTop - padding - size;
  for (const l of lines) {
    const ls = wrapText(l, fonts.bold, size, maxWidth);
    for (const line of ls) {
      cursor.page.drawText(line, { x: MARGIN_X + padding, y, size, font: fonts.bold, color: rgb(1, 1, 1) });
      y -= 18;
    }
    y -= 2;
  }

  return { ...cursor, y: yTop - height - 10 };
}