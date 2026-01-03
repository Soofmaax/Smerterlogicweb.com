import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

import type { BlogPost, BlogLocale } from "./blog";
import { computePublishAtISO } from "./blog-time";

function enhanceContentHtml(html: string): string {
  // Add lazy loading / decoding to images
  const withPerf = html.replace(/<img\b([^>]*?)>/gi, (m, attrs) => {
    const hasLoading = /\bloading=/.test(attrs);
    const hasDecoding = /\bdecoding=/.test(attrs);
    const hasReferrer = /\breferrerpolicy=/.test(attrs);
    const hasStyle = /\bstyle=/.test(attrs);
    const style = hasStyle ? "" : ' style="max-width:100%;height:auto"';
    return `<img${attrs}${hasLoading ? "" : " loading=\"lazy\""}${hasDecoding ? "" : " decoding=\"async\""}${
      hasReferrer ? "" : " referrerpolicy=\"no-referrer\""
    }${style}>`;
  });

  // Wrap standalone images in <figure><img/><figcaption/></figure>
  function extractAttr(attrs: string, name: string): string | undefined {
    const m =
      attrs.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
    return m ? (m[2] || m[3] || m[4]) : undefined;
  }
  function wrapImg(attrs: string): string {
    const alt = extractAttr(attrs, "alt") || "";
    const title = extractAttr(attrs, "title") || "";
    const caption = (title || alt).trim();
    const imgTag = `<img${attrs} data-lightbox="1">`;
    const figcaption = caption ? `<figcaption class="mt-2 text-center text-sm text-muted-foreground">${caption}</figcaption>` : "";
    return `<figure class="my-6">${imgTag}${figcaption}</figure>`;
  }

  let out = withPerf;
  // <p><img ...></p>
  out = out.replace(/<p>\s*<img\b([^>]*?)>\s*<\/p>/gi, (_m, attrs) => wrapImg(attrs));
  // <p><a ...><img ...></a></p> -> drop anchor and wrap
  out = out.replace(/<p>\s*<a\b[^>]*>\s*<img\b([^>]*?)>\s*<\/a>\s*<\/p>/gi, (_m, attrs) => wrapImg(attrs));

  return out;
}

/**
 * Load Markdown blog posts from content/blog/*.md with YAML frontmatter.
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
    const publishAtFromName = dateMatch ? computePublishAtISO(dateMatch[1]) : undefined;

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

    const altLocalesRaw = parsed.data.altLocales as Partial<Record<BlogLocale, string>> | undefined;
    const altLocales =
      altLocalesRaw && typeof altLocalesRaw === "object" ? (altLocalesRaw as Partial<Record<BlogLocale, string>>) : undefined;

    // Basic sanitize schema: allow common tags/attributes used in blog content
    const sanitizeSchema = {
      tagNames: [
        "h1","h2","h3","h4","h5","h6",
        "p","br","hr","blockquote","strong","em","code","pre","ul","ol","li",
        "a","img","figure","figcaption","table","thead","tbody","tr","th","td",
        "span","div"
      ],
      attributes: {
        a: ["href","title","target","rel","id"],
        img: ["src","alt","title","loading","decoding","referrerpolicy","style"],
        code: ["className"],
        "*": ["id"]
      },
      protocols: {
        href: ["http","https","mailto","tel"],
        src: ["http","https","data"]
      },
      clobberPrefix: "user-",
    };

    const html = remark()
      .use(remarkParse)
      .use(remarkSlug)
      .use(remarkAutolinkHeadings, { behavior: "wrap" })
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSanitize, sanitizeSchema as any)
      .use(rehypeStringify)
      .processSync(parsed.content)
      .toString();

    const enhanced = enhanceContentHtml(html);

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
      contentHtml: enhanced,
      altLocales,
    });
  }

  return posts;
}

export function getAllPosts(): BlogPost[] {
  return loadPostsFromMarkdown();
}