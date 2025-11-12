import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import type { BlogPost, BlogLocale } from "./blog";

/**
 * Load Markdown blog posts from content/blog/*.md with YAML frontmatter.
 * Frontmatter fields:
 * - slug: string (required if file name not suitable)
 * - locale: "fr" | "en" (default: "fr")
 * - title: string (required)
 * - summary: string (optional)
 * - authorName: string (optional; defaults to "Sonia" if omitted)
 * - authorUrl: string (optional; personal or profile URL)
 * - publishAt: ISO date string (optional)
 * - published: boolean (optional; publish immediately)
 * - draft: boolean (optional; hide from publication)
 * - tags: string[] (optional)
 * - altLocales: { fr?: string; en?: string } (optional cross-locale slug mapping)
 *
 * Filename shortcut:
 * - If file name starts with YYYY-MM-DD-..., use that date as publishAt automatically.
 *   Example: 2025-01-05-mon-super-article.md
 */
export function loadPostsFromMarkdown(): BlogPost[] {
  const contentDir = path.join(process.cwd(), "content", "blog");

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.toLowerCase().endsWith(".md"));
  const posts: BlogPost[] = [];

  for (const file of files) {
    const fullPath = path.join(contentDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);

    const slugFromFile = file.replace(/\.md$/i, "");
    const dateMatch = slugFromFile.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    const hour = (() => {
      const h = Number(process.env.BLOG_PUBLISH_HOUR || "9");
      return Number.isFinite(h) && h >= 0 && h <= 23 ? h : 9;
    })();
    const publishAtFromName = dateMatch ? `${dateMatch[1]}T${String(hour).padStart(2, "0")}:00:00Z` : undefined;

    const slug: string = (parsed.data.slug as string) || (dateMatch ? dateMatch[2] : slugFromFile);

    const locale = (parsed.data.locale as BlogLocale) || "fr";
    const title = (parsed.data.title as string) || slug;
    const summary = (parsed.data.summary as string) || undefined;
    const authorName = (parsed.data.authorName as string) || undefined;
    const authorUrl = (parsed.data.authorUrl as string) || undefined;
    const publishAt = (parsed.data.publishAt as string) || publishAtFromName || undefined;
    const published = parsed.data.published === true || false;
    const draft = parsed.data.draft === true || false;
    const tags = Array.isArray(parsed.data.tags) ? (parsed.data.tags as string[]) : undefined;

    // Optional cross-locale slug mapping
    const altLocalesRaw = parsed.data.altLocales as Partial<Record<BlogLocale, string>> | undefined;
    const altLocales =
      altLocalesRaw && typeof altLocalesRaw === "object" ? (altLocalesRaw as Partial<Record<BlogLocale, string>>) : undefined;

    // Convert markdown body to HTML (allow raw HTML from our trusted markdown files)
    const html = remark().use(remarkHtml, { sanitize: false }).processSync(parsed.content).toString();

    posts.push({
      slug,
      locale,
      title,
      summary,
      authorName,
      authorUrl,
      publishAt,
      published,
      draft,
      tags,
      contentHtml: html,
      altLocales,
    });
  }

  return posts;
}

/**
 * Markdown-only policy:
 * Return posts loaded from content/blog/*.md exclusively.
 * TS seeds from data/blog.ts are disabled to avoid duplication and ensure a single source of truth.
 */
export function getAllPosts(): BlogPost[] {
  return loadPostsFromMarkdown();
}