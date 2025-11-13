// Simple image size audit for /public assets
// - Warn if image > 200 KB
// - Suggest converting to WebP/AVIF
// Usage: node scripts/check-images.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const LIMIT = 200 * 1024; // 200 KB

const exts = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

async function* walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(res);
    } else {
      yield res;
    }
  }
}

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.log("No public/ directory found. Skipping image check.");
    return;
  }

  let count = 0;
  let flagged = 0;
  for await (const file of walk(PUBLIC_DIR)) {
    const ext = path.extname(file).toLowerCase();
    if (!exts.has(ext)) continue;
    count++;

    const stat = await fs.promises.stat(file);
    if (stat.size > LIMIT) {
      flagged++;
      const kb = Math.round(stat.size / 1024);
      const rel = path.relative(ROOT, file);
      const isWebp = ext === ".webp";
      console.warn(
        `⛳ Image too large: ${rel} — ${kb}KB (limit: 200KB)` +
          (isWebp ? "" : " — consider converting to WebP/AVIF")
      );
    }
  }

  if (count === 0) {
    console.log("No images found under public/.");
  } else if (flagged === 0) {
    console.log(`OK: ${count} images scanned, none above 200KB.`);
  } else {
    console.log(
      `WARN: ${flagged}/${count} images exceed 200KB. See logs above.`
    );
  }

  // Do not fail CI by default. To enforce, set STRICT_IMAGE_CHECK=1
  if (process.env.STRICT_IMAGE_CHECK === "1" && flagged > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("check-images failed:", err);
  // Do not fail pipelines unexpectedly
  process.exit(process.env.STRICT_IMAGE_CHECK === "1" ? 1 : 0);
});