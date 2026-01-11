import { describe, it, expect, afterEach, vi } from "vitest";
import {
  scheduleDates,
  schedulePosts,
  getPublishedPostsBurst,
  getScheduledPostBySlugBurst,
  type BlogPost,
} from "@/lib/blog";
import { applyPublishTime } from "@/lib/blog-time";

function makePost(slug: string, overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    slug,
    locale: overrides.locale ?? "fr",
    title: overrides.title ?? slug,
    contentHtml: overrides.contentHtml ?? "",
    publishAt: overrides.publishAt,
    published: overrides.published,
    draft: overrides.draft,
    altLocales: overrides.altLocales,
    authorName: overrides.authorName,
    authorUrl: overrides.authorUrl,
    summary: overrides.summary,
    tags: overrides.tags,
  };
}

describe("blog scheduling", () => {
  afterEach(() => {
    delete process.env.BLOG_SCHEDULE_START_FR;
    delete process.env.BLOG_SCHEDULE_START_EN;
    delete process.env.BLOG_INITIAL_PUBLISH_COUNT_FR;
    delete process.env.BLOG_INITIAL_PUBLISH_COUNT_EN;
    delete process.env.BLOG_PUBLISH_OVERRIDE_FR;
    delete process.env.BLOG_PUBLISH_OVERRIDE_EN;
    vi.restoreAllMocks();
  });

  it("scheduleDates génère des slots Mon/Wed/Fri", () => {
    const start = new Date("2025-01-06T00:00:00.000Z"); // lundi
    const dates = scheduleDates(5, start);
    const days = dates.map((d) => d.getUTCDay());
    expect(days).toEqual([1, 3, 5, 1, 3]); // Lundi, Mercredi, Vendredi, Lundi, Mercredi
  });

  it("schedulePosts applique une date de planning si publishAt absent", () => {
    const posts = [makePost("a"), makePost("b")];
    const scheduled = schedulePosts(posts, "fr");
    expect(scheduled).toHaveLength(2);
    expect(scheduled[0].publishAt).toBeInstanceOf(Date);
    expect(scheduled[1].publishAt).toBeInstanceOf(Date);
  });

  it("schedulePosts respecte un publishAt explicite", () => {
    const explicit = new Date("2025-01-10T09:00:00.000Z").toISOString();
    const posts = [makePost("a", { publishAt: explicit })];
    const scheduled = schedulePosts(posts, "fr");
    expect(scheduled[0].publishAt.toISOString()).toBe(explicit);
  });

  it("getPublishedPostsBurst inclut initialCount de posts même si la date est future", () => {
    process.env.BLOG_INITIAL_PUBLISH_COUNT_FR = "2";

    const posts = [makePost("a"), makePost("b"), makePost("c")];

    const now = new Date("2025-01-01T00:00:00.000Z");
    const published = getPublishedPostsBurst(posts, "fr", now);

    expect(published.map((p) => p.slug)).toEqual(["a", "b"]);
  });

  it("getPublishedPostsBurst inclut un override même si la date est future", () => {
    process.env.BLOG_INITIAL_PUBLISH_COUNT_FR = "0";
    process.env.BLOG_PUBLISH_OVERRIDE_FR = "special";

    const posts = [makePost("regular"), makePost("special")];

    const now = new Date("2025-01-01T00:00:00.000Z");
    const published = getPublishedPostsBurst(posts, "fr", now);

    expect(published.map((p) => p.slug)).toContain("special");
  });

  it("getScheduledPostBySlugBurst renvoie isPublished=true si la date est passée", () => {
    const base = new Date("2025-01-01T00:00:00.000Z");
    const publishAt = applyPublishTime(base).toISOString();
    const posts = [makePost("a", { publishAt })];

    const now = new Date("2025-01-02T00:00:00.000Z");
    const result = getScheduledPostBySlugBurst(posts, "a", "fr", now);
    expect(result).not.toBeNull();
    expect(result?.isPublished).toBe(true);
  });

  it("getScheduledPostBySlugBurst renvoie isPublished=false si la date est future et hors overrides/initialCount", () => {
    process.env.BLOG_INITIAL_PUBLISH_COUNT_FR = "0";
    const base = new Date("2025-01-02T00:00:00.000Z");
    const publishAt = applyPublishTime(base).toISOString();
    const posts = [makePost("a", { publishAt })];

    const now = new Date("2025-01-01T00:00:00.000Z");
    const result = getScheduledPostBySlugBurst(posts, "a", "fr", now);
    expect(result).not.toBeNull();
    expect(result?.isPublished).toBe(false);
  });
});