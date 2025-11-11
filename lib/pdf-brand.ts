import { PDFDocument, StandardFonts, rgb, PDFPage } from "pdf-lib";

export type PdfFonts = { regular: any; bold: any };
export type Cursor = { page: PDFPage; y: number };

export const A4: readonly [number, number] = [595.28, 841.89];
export const MARGIN_X = 48;
const TOP_Y = A4[1] - 64;
const MIN_Y = 72;

export const BRAND_PRIMARY = rgb(99 / 255, 102 / 255, 241 / 255); // #6366f1
export const BRAND_ACCENT = rgb(34 / 255, 211 / 255, 238 / 255);  // #22d3ee
export const TEXT_MAIN = rgb(0.2, 0.22, 0.28);
export const TEXT_HEAD = rgb(0.1, 0.12, 0.2);

export async function createBrandDoc() {
  const doc = await PDFDocument.create();
  const page = doc.addPage(A4 as any);
  const fonts: PdfFonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  // Top brand bar
  page.drawRectangle({
    x: 0,
    y: A4[1] - 28,
    width: A4[0],
    height: 28,
    color: BRAND_PRIMARY,
  });
  page.drawText("smarterlogicweb", {
    x: MARGIN_X,
    y: A4[1] - 20,
    size: 10,
    font: fonts.bold,
    color: rgb(1, 1, 1),
  });

  const cursor: Cursor = { page, y: TOP_Y };
  return { doc, page, fonts, cursor };
}

export function ensureSpace(doc: PDFDocument, cursor: Cursor): Cursor {
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
  page.drawText("smarterlogicweb", {
    x: MARGIN_X,
    y: A4[1] - 20,
    size: 10,
    font: doc.getFont(StandardFonts.HelveticaBold),
    color: rgb(1, 1, 1),
  });
  return { page, y: TOP_Y };
}

export function heading1(doc: PDFDocument, cursor: Cursor, fonts: PdfFonts, text: string, size = 18): Cursor {
  cursor = ensureSpace(doc, cursor);
  cursor.page.drawText(text, { x: MARGIN_X, y: cursor.y, size, font: fonts.bold, color: TEXT_HEAD });
  return { ...cursor, y: cursor.y - (size + 10) };
}

export function heading2(doc: PDFDocument, cursor: Cursor, fonts: PdfFonts, text: string, size = 13): Cursor {
  cursor = ensureSpace(doc, cursor);
  cursor.page.drawText(text, { x: MARGIN_X, y: cursor.y, size, font: fonts.bold, color: rgb(0.12, 0.14, 0.22) });
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
    cursor = ensureSpace(doc, cursor);
    cursor.page.drawText(line, { x: MARGIN_X, y: cursor.y, size, font: fonts.regular, color });
    cursor = { ...cursor, y: cursor.y - leading };
  }
  return { ...cursor, y: cursor.y - 4 };
}

export function bulletList(doc: PDFDocument, cursor: Cursor, fonts: PdfFonts, items: string[], size = 11): Cursor {
  const maxWidth = A4[0] - MARGIN_X * 2 - 14;
  for (const item of items) {
    cursor = ensureSpace(doc, cursor);
    cursor.page.drawText("• ", { x: MARGIN_X, y: cursor.y, size, font: fonts.bold, color: rgb(0.12, 0.14, 0.22) });
    const lines = wrapText(item, fonts.regular, size, maxWidth);
    let x = MARGIN_X + 14;
    for (let i = 0; i < lines.length; i++) {
      cursor.page.drawText(lines[i], { x, y: cursor.y, size, font: fonts.regular, color: TEXT_MAIN });
      cursor = { ...cursor, y: cursor.y - 16 };
      x = MARGIN_X + 14;
      if (cursor.y < MIN_Y) cursor = ensureSpace(doc, cursor);
    }
    cursor = { ...cursor, y: cursor.y - 2 };
  }
  return cursor;
}

export function hr(doc: PDFDocument, cursor: Cursor): Cursor {
  cursor = ensureSpace(doc, cursor);
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
    p.drawText("smarterlogicweb.com — contact@smarterlogicweb.com — 2025", {
      x: MARGIN_X,
      y: 36,
      size: 9,
      font: fonts.regular,
      color: rgb(0.45, 0.48, 0.56),
    });
    const num = `Page ${i + 1}/${total}`;
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