import type { MetadataRoute } from "next";
import { getAllLocalCitySlugs } from "@/data/local-cities";
import { getAllPosts } from "@/lib/blog-source";
import { getPublishedPostsBurst } from "@/lib/blog";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://smarterlogicweb.com";
  const now = new Date();
  const metiers = ["plombier", "electricien", "boulanger", "coiffeur", "artisan-batiment"];

  const localSeoPages = metiers.map((m) => ({
    url: `${baseUrl}/site-web/${m}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const enTrades = ["plumber", "electrician", "baker", "hairdresser", "general-contractor"];
  const localSeoPagesEN = enTrades.map((t) => ({
    url: `${baseUrl}/en/website/${t}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityPages = getAllLocalCitySlugs().map((slug) => ({
    url: `${baseUrl}/creation-site-internet/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const refonteCityPages = getAllLocalCitySlugs().map((slug) => ({
    url: `${baseUrl}/refonte-web/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const nationalPage = {
    url: `${baseUrl}/villes-intervention`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  };

  // Blog posts (FR/EN) — include only those considered published by scheduling rules
  const allPosts = getAllPosts();
  const publishedFr = getPublishedPostsBurst(allPosts, "fr", now);
  const publishedEn = getPublishedPostsBurst(allPosts, "en", now);

  const blogFr = publishedFr.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.publishAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogEn = publishedEn.map((p) => ({
    url: `${baseUrl}/en/blog/${p.slug}`,
    lastModified: p.publishAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    // FR
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/projets`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/a-propos`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/engagement-associatif`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/candidature-association`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/politique-de-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/politique-usage-contenu`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cgv`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/securite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/merci`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    // Blog articles (FR)
    ...blogFr,

    // Local SEO pages by métier
    ...localSeoPages,

    // National cities page (FR)
    nationalPage,

    // All city pages (FR)
    ...cityPages,

    // All refonte city pages (FR)
    ...refonteCityPages,

    // EN
    { url: `${baseUrl}/en`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/en/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/en/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/en/pricing-2025`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/en/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/en/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/en/nonprofit-commitment`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/en/legal-notice`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/en/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/en/content-usage-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/en/terms-of-sale`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/en/security`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/en/faq`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/en/thank-you`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/en/blog`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    // Blog articles (EN)
    ...blogEn,

    // Local SEO pages (EN)
    ...localSeoPagesEN,
  ];
}