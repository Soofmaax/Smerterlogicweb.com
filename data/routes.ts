// Central list of available routes to control header navigation visibility.
// Keep in sync when adding/removing pages.
//
// French routes (slugs without leading slash)
export const availablePathsFR = new Set<string>([
  "", // home
  "projets",
  "services",
  "a-propos",
  "engagement-associatif",
  "contact",
  "blog",
  // Other pages that exist but are not in the main nav:
  "faq",
  "candidature-association",
  "mentions-legales",
  "politique-de-confidentialite",
  "securite",
  "cgv",
  "merci",
]);

// English routes (slugs without leading /en prefix)
export const availablePathsEN = new Set<string>([
  "", // home
  "projects",
  "services",
  "about",
  "nonprofit-commitment",
  "contact",
  "blog",
  // Other pages that exist but are not in the main nav:
  "legal-notice",
  "privacy-policy",
  "security",
  "terms-of-sale",
  "faq",
  "thank-you",
]);

// Slug mapping for language switch (first path segment only)
// FR slug (without leading slash) -> EN slug (without leading /en prefix)
export const frToEnSlugMap: Record<string, string> = {
  "": "",
  "projets": "projects",
  "services": "services",
  "a-propos": "about",
  "engagement-associatif": "nonprofit-commitment",
  "contact": "contact",
  "mentions-legales": "legal-notice",
  "politique-de-confidentialite": "privacy-policy",
  "merci": "thank-you",
  "securite": "security",
  "blog": "blog",
  "cgv": "terms-of-sale",
  "faq": "faq",
};

export const enToFrSlugMap: Record<string, string> = Object.fromEntries(
  Object.entries(frToEnSlugMap).map(([fr, en]) => [en, fr]),
);

/**
 * Compute the counterpart path when switching locales, preserving sub-paths.
 *
 * Examples:
 *  - "/blog"       -> "/en/blog"
 *  - "/en/blog"    -> "/blog"
 *  - "/projets/a"  -> "/en/projects/a"
 *  - "/en/about/x" -> "/a-propos/x"
 */
export function switchLocalePath(path: string): string {
  const p = path.startsWith("/en") ? path.slice(3) || "/" : path;
  const parts = p.split("/").filter(Boolean);
  const first = parts[0] || "";
  const rest = parts.slice(1).join("/");

  if (path.startsWith("/en")) {
    // EN -> FR
    const mapped = enToFrSlugMap[first] ?? first;
    const base = mapped ? `/${mapped}` : "/";
    return rest ? `${base}/${rest}` : base;
  }

  // FR -> EN
  const mapped = frToEnSlugMap[first] ?? first;
  const base = mapped ? `/en/${mapped}` : "/en";
  return rest ? `${base}/${rest}` : base;
}