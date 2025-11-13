/**
 * IndexNow ping script
 * - Pings api.indexnow.org after a successful production build on Netlify
 * - Uses a predefined key file placed in /public (see public/{KEY}.txt)
 * - Includes core pages, local city pages, and published blog posts (FR/EN)
 *
 * Runs automatically via npm postbuild.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTEXT = process.env.CONTEXT || ""; // Netlify: "production" | "deploy-preview" | "branch-deploy"
const DISABLE = process.env.DISABLE_INDEXNOW === "1";

// Only run in production deploys unless explicitly forced
if (DISABLE || (CONTEXT && CONTEXT !== "production")) {
  console.log(`[indexnow] Skipping (context=${CONTEXT || "unknown"}, DISABLE_INDEXNOW=${DISABLE ? "1" : "0"})`);
  process.exit(0);
}

const DEFAULT_HOST = "smarterlogicweb.com";
// If you want to override host/key via env, set INDEXNOW_HOST / INDEXNOW_KEY
const HOST = (process.env.INDEXNOW_HOST || DEFAULT_HOST).replace(/^https?:\/\//, "").replace(/\/+$/, "");
const KEY = process.env.INDEXNOW_KEY || "e2db7cfe43a19b5d0c8a7f2e9134bd6a";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const CORE_FR = [
  "/",
  "/projets",
  "/services",
  "/a-propos",
  "/contact",
  "/engagement-associatif",
  "/candidature-association",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/politique-usage-contenu",
  "/cgv",
  "/securite",
  "/faq",
  "/blog",
  "/cookies",
  "/villes-intervention",
];

const CORE_EN = [
  "/en",
  "/en/projects",
  "/en/services",
  "/en/pricing-2025",
  "/en/about",
  "/en/contact",
  "/en/nonprofit-commitment",
  "/en/legal-notice",
  "/en/privacy-policy",
  "/en/content-usage-policy",
  "/en/terms-of-sale",
  "/en/security",
  "/en/faq",
  "/en/blog",
];

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content", "blog");
const LOCAL_CITIES_TS = path.join(ROOT, "data", "local-cities.ts");

const toAbs = (p) => `https://${HOST}${p}`;

function getPublishHour() {
  const raw = process.env.BLOG_PUBLISH_HOUR;
  const h = raw ? Number(raw) : 9;
  return Number.isFinite(h) && h >= 0 && h <= 23 ? h : 9;
}

function publishAtFromFileName(file) {
  const base = path.basename(file).replace(/\.md$/i, "");
  const m = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
  if (!m) return null;
  const hour = String(getPublishHour()).padStart(2, "0");
  const iso = `${m[1]}T${hour}:00:00Z`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

function loadBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.toLowerCase().endsWith(".md"));
  const posts = [];
  for (const f of files) {
    const full = path.join(BLOG_DIR, f);
    const raw = fs.readFileSync(full, "utf8");
    const parsed = matter(raw);
    const slugFromFile = f.replace(/\.md$/i, "");
    const m = slugFromFile.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
    const slug = typeof parsed.data.slug === "string" ? parsed.data.slug : (m ? m[1] : slugFromFile);
    const locale = parsed.data.locale === "en" ? "en" : "fr";
    const explicitISO = typeof parsed.data.publishAt === "string" ? parsed.data.publishAt : null;
    const publishAt = explicitISO ? new Date(explicitISO) : publishAtFromFileName(f);
    const published = parsed.data.published === true;
    const draft = parsed.data.draft === true;
    posts.push({ slug, locale, publishAt, published, draft });
  }
  return posts;
}

function compareDateAsc(a, b) {
  const da = a.publishAt ? a.publishAt.getTime() : 0;
  const db = b.publishAt ? b.publishAt.getTime() : 0;
  return da - db;
}

function getInitialPublishCount(locale) {
  const key = locale === "fr" ? "BLOG_INITIAL_PUBLISH_COUNT_FR" : "BLOG_INITIAL_PUBLISH_COUNT_EN";
  const raw = process.env[key];
  const n = raw ? Number(raw) : 10;
  return Number.isFinite(n) && n >= 0 ? n : 10;
}

function getOverrideSlugs(locale) {
  const key = locale === "fr" ? "BLOG_PUBLISH_OVERRIDE_FR" : "BLOG_PUBLISH_OVERRIDE_EN";
  const raw = process.env[key] || "";
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function getPublishedBlogSlugs(posts, locale) {
  const now = new Date();
  const overrides = new Set(getOverrideSlugs(locale));
  const list = posts.filter((p) => p.locale === locale && p.draft !== true).sort(compareDateAsc);

  const result = [];
  let nonDraftIndex = 0;
  for (const p of list) {
    const include =
      p.published === true ||
      nonDraftIndex < getInitialPublishCount(locale) ||
      (!!p.publishAt && p.publishAt.getTime() <= now.getTime()) ||
      overrides.has(p.slug);
    if (include) result.push(p.slug);
    nonDraftIndex += 1;
  }
  return result;
}

function loadLocalCitySlugs() {
  try {
    const raw = fs.readFileSync(LOCAL_CITIES_TS, "utf8");
    const slugs = [];
    const re = /slug:\s*\"([a-z0-9-]+)\"/gi;
    let m;
    while ((m = re.exec(raw))) {
      slugs.push(m[1]);
    }
    return Array.from(new Set(slugs));
  } catch {
    return [];
  }
}

async function pingIndexNow(urls) {
  const endpoint = "https://api.indexnow.org/submit";
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls.map(toAbs),
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) {
      console.warn(`[indexnow] HTTP ${res.status}: ${text.slice(0, 200)}`);
      return false;
    }
    console.log(`[indexnow] Submitted ${urls.length} URLs to ${endpoint}`);
    return true;
  } catch (err) {
    console.warn(`[indexnow] Failed to ping: ${err?.message || err}`);
    return false;
  }
}

(async () => {
  // Core pages (FR + EN)
  const core = [...CORE_FR, ...CORE_EN];

  // Local city pages (FR)
  const citySlugs = loadLocalCitySlugs();
  const localSeo = [];
  for (const s of citySlugs) {
    localSeo.push(`/creation-site-internet/${s}`);
    localSeo.push(`/refonte-web/${s}`);
  }

  // Blog posts (FR/EN)
  const posts = loadBlogPosts();
  const blogFr = getPublishedBlogSlugs(posts, "fr").map((slug) => `/blog/${slug}`);
  const blogEn = getPublishedBlogSlugs(posts, "en").map((slug) => `/en/blog/${slug}`);

  // Merge and deduplicate
  const all = Array.from(new Set([...core, ...localSeo, ...blogFr, ...blogEn]));

  // Optional: limit payload if environment-specific
  const MAX = Number(process.env.INDEXNOW_MAX || 200);
  const batch = all.slice(0, MAX);

  console.log(`[indexnow] Preparing to submit ${batch.length} URLs (core=${core.length}, local=${localSeo.length}, blogFr=${blogFr.length}, blogEn=${blogEn.length})`);

  const ok = await pingIndexNow(batch);
  process.exit(ok ? 0 : 0); // Do not fail the build on ping errors
})();