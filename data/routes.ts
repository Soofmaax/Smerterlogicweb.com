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
  "thank-you",
]);