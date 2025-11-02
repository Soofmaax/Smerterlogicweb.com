import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://smarterlogicweb.com";
  const now = new Date();

  return [
    // FR
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/projets`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/a-propos`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/engagement-associatif`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/politique-de-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/securite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/merci`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },

    // EN
    { url: `${baseUrl}/en`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/en/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/en/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/en/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/en/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/en/nonprofit-commitment`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/en/legal-notice`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/en/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/en/security`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/en/thank-you`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}