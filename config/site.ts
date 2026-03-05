const FALLBACK_BRAND_NAME = "Smarter Logic Web";
const FALLBACK_BRAND_DOMAIN = "smarterlogicweb.com";
const FALLBACK_SITE_URL = `https://www.${FALLBACK_BRAND_DOMAIN}`;
const FALLBACK_CONTACT_EMAIL = "sonia@smarterlogicweb.com";

/**
 * Normalize a base URL: remove any trailing slashes.
 */
function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Public site configuration, derived from environment variables with sensible defaults.
 *
 * Only NEXT_PUBLIC_* variables are used here so this module can be imported from both
 * server and client code safely.
 */
export const BRAND_NAME =
  process.env.NEXT_PUBLIC_BRAND_NAME?.trim() || FALLBACK_BRAND_NAME;

export const BRAND_DOMAIN =
  process.env.NEXT_PUBLIC_BRAND_DOMAIN?.trim() || FALLBACK_BRAND_DOMAIN;

export const COMPANY_NAME =
  process.env.NEXT_PUBLIC_COMPANY_NAME?.trim() || BRAND_NAME;

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || FALLBACK_CONTACT_EMAIL;

export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || CONTACT_EMAIL;

export const PHONE_NUMBER_PUBLIC =
  process.env.NEXT_PUBLIC_PHONE?.trim() || "+33 7 44 40 79 73";

// Optional (no-API) Google reviews settings.
// Useful if you don't want to use the Google Places API (which may require billing).
export const GOOGLE_MAPS_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL?.trim() || "";
export const GOOGLE_REVIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || "";

const rawGoogleRating = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_RATING?.trim() || "";
export const GOOGLE_REVIEWS_RATING = rawGoogleRating ? Number(rawGoogleRating) : 0;

const rawGoogleTotal = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_TOTAL?.trim() || "";
export const GOOGLE_REVIEWS_TOTAL = rawGoogleTotal ? Number(rawGoogleTotal) : 0;

/**
 * Canonical base URL of the site, without trailing slash.
 * Prefer NEXT_PUBLIC_SITE_URL when defined, otherwise derive from BRAND_DOMAIN.
 */
export const SITE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL
);

/**
 * Default and supported locales for the marketing site.
 */
export const DEFAULT_LOCALE = "fr" as const;
export const SUPPORTED_LOCALES = ["fr", "en"] as const;

/**
 * Build an absolute URL from a path, using SITE_URL as base.
 *
 * - If the input already looks like an absolute URL (starts with http/https), it is returned as‑is.
 * - Otherwise the path is joined to SITE_URL with exactly one slash.
 */
export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}