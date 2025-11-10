import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const ALLOWED = new Set<string>([
  "components/site/hero-typed.tsx",
  "components/site/hero-typed-en.tsx",
  "components/site/projects-grid.tsx",
  "components/site/particles.tsx",
  "components/site/cursor.tsx",
]);

export async function GET(req: NextRequest) {
  try {
    // Disable in production unless explicitly enabled
    const enabled = process.env.CODE_SNIPPETS_ENABLED === "1" || process.env.NODE_ENV !== "production";
    if (!enabled) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const p = searchParams.get("path");
    if (!p || !ALLOWED.has(p)) {
      return NextResponse.json({ error: "Path not allowed" }, { status: 400 });
    }
    const filePath = join(process.cwd(), p);
    const content = await readFile(filePath, "utf-8");
    // Basic sanitization: trim and limit size
    const trimmed = content.trim().slice(0, 20000);
    return NextResponse.json({ content: trimmed });
  } catch (e) {
    return NextResponse.json({ error: "Unable to read file" }, { status: 500 });
  }
}