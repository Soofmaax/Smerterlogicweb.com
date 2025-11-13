/**
 * IndexNow ping script
 * - Pings api.indexnow.org after a successful production build on Netlify
 * - Uses a predefined key file placed in /public (see public/{KEY}.txt)
 *
 * Runs automatically via npm postbuild.
 */

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

const toAbs = (p) => `https://${HOST}${p}`;

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
  // In production we push a representative set of core pages (FR + EN).
  const urls = [...CORE_FR, ...CORE_EN];

  // Optional: limit payload if environment-specific
  const MAX = Number(process.env.INDEXNOW_MAX || 50);
  const batch = urls.slice(0, MAX);

  const ok = await pingIndexNow(batch);
  process.exit(ok ? 0 : 0); // Do not fail the build on ping errors
})();