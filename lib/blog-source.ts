import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import type { BlogPost, BlogLocale } from "./blog";
import { BLOG_POSTS } from "@/data/blog";

/**
 * Load Markdown blog posts from content/blog/*.md with YAML frontmatter.
 * Frontmatter fields:
 * - slug: string (required if file name not suitable)
 * - locale: "fr" | "en" (default: "fr")
 * - title: string (required)
 * - summary: string (optional)
 * - publishAt: ISO date string (optional)
 * - tags: string[] (optional)
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
    const slug: string = (parsed.data.slug as string) || slugFromFile;

    const locale = (parsed.data.locale as BlogLocale) || "fr";
    const title = (parsed.data.title as string) || slug;
    const summary = (parsed.data.summary as string) || undefined;
    const publishAt = (parsed.data.publishAt as string) || undefined;
    const tags = Array.isArray(parsed.data.tags) ? (parsed.data.tags as string[]) : undefined;

    // Convert markdown body to HTML
    const html = remark().use(remarkHtml).processSync(parsed.content).toString();

    posts.push({
      slug,
      locale,
      title,
      summary,
      publishAt,
      tags,
      contentHtml: html,
    });
  }

  return posts;
}

/**
 * Merge TS-defined posts (data/blog.ts) with Markdown posts (content/blog/*.md).
 * Order is: TS posts first (backward compatibility), then MD posts sorted by publishAt/date or filename.
 */
export function getAllPosts(): BlogPost[] {
  const mdPosts = loadPostsFromMarkdown();
  // Simple concat; scheduling handles dates; order here doesn't affect publish order if publishAt overrides are used.
  return [...BLOG_POSTS, ...mdPosts];
}