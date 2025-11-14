import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2023-10-19";
const token = process.env.SANITY_READ_TOKEN || ""; // optional (public dataset)

if (!projectId) {
  console.error("Missing SANITY_PROJECT_ID");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token || undefined,
});

const contentDir = path.join(process.cwd(), "content", "blog");
fs.mkdirSync(contentDir, { recursive: true });

function frontmatter(obj) {
  const lines = Object.entries(obj)
    .filter(([_, v]) => v !== undefined && v !== null)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}: [${v.map((x) => JSON.stringify(x)).join(", ")}]`;
      if (typeof v === "object") return `${k}: ${JSON.stringify(v)}`;
      return `${k}: ${JSON.stringify(v)}`;
    });
  return ["---", ...lines, "---"].join("\n");
}

function datePrefix(iso) {
  try {
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) {
      const yyyy = d.getUTCFullYear();
      const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
      const dd = String(d.getUTCDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}-`;
    }
  } catch {}
  return "";
}

async function run() {
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
      "slug": slug.current,
      title,
      locale,
      summary,
      publishAt,
      published,
      draft,
      tags,
      altLocales,
      // content stored as markdown in a simple text field
      bodyMd
    } | order(publishAt desc, title asc)`
  );

  let changed = 0;
  for (const p of posts) {
    const prefix = p.publishAt ? datePrefix(p.publishAt) : "";
    const filename = `${prefix}${p.slug}.md`;
    const fp = path.join(contentDir, filename);

    const fm = frontmatter({
      slug: p.slug,
      locale: p.locale || "fr",
      title: p.title || p.slug,
      summary: p.summary,
      publishAt: p.publishAt,
      published: Boolean(p.published),
      draft: Boolean(p.draft),
      tags: Array.isArray(p.tags) ? p.tags : undefined,
      altLocales: p.altLocales,
    });
    const body = (p.bodyMd || "").trim();
    const md = `${fm}\n\n${body}\n`;

    const existing = fs.existsSync(fp) ? fs.readFileSync(fp, "utf8") : "";
    if (existing !== md) {
      fs.writeFileSync(fp, md, "utf8");
      changed += 1;
      console.log("Updated:", filename);
    } else {
      console.log("No change:", filename);
    }
  }

  console.log(`Done. ${changed} file(s) changed.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});