// Simple blog scheduling helpers: publish posts automatically on Mon/Wed/Fri.
// No CMS required — posts live in the repo, scheduled at runtime via SSR.
// This works on Netlify with Next.js functions because pages are server-rendered.

export type BlogLocale = "fr" | "en";

export type BlogPost = {
  slug: string;
  locale: BlogLocale;
  title: string;
  summary?: string;
  contentHtml: string;
  tags?: string[];
  coverImage?: string;
  /**
   * Optional explicit publish date (ISO string).
   * If provided, scheduling will respect this date instead of the automatic Mon/Wed/Fri cadence.
   */
  publishAt?: string;
  /**
   * Optional flags:
   * - published: force immediate publication (uses "now" as publishAt if not set)
   * - draft: hide from publication regardless of schedule
   */
  published?: boolean;
  draft?: boolean;
};

export type ScheduledPost = BlogPost & {
  publishAt: Date;
};

function parseDateEnv(key: string): Date | null {
  const value = process.env[key];
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function withHour(date: Date, hour: number): Date {
  const d = new Date(date);
  d.setHours(hour, 0, 0, 0);
  return d;
}

function parseDateISO(value?: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function isMWF(day: number) {
  // JS: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  return day === 1 || day === 3 || day === 5;
}

function nextScheduledDay(from: Date): Date {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  while (!isMWF(d.getDay())) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

function addToNextSlot(date: Date): Date {
  const dow = date.getDay(); // 1,3,5
  const inc = dow === 1 ? 2 : dow === 3 ? 2 : 3; // Mon->Wed(+2), Wed->Fri(+2), Fri->Mon(+3)
  const d = new Date(date);
  d.setDate(d.getDate() + inc);
  return d;
}

function getPublishHour(): number {
  const raw = process.env.BLOG_PUBLISH_HOUR;
  const h = raw ? Number(raw) : 9;
  if (Number.isFinite(h) && h >= 0 && h <= 23) return h;
  return 9;
}

export function getScheduleStart(locale: BlogLocale): Date {
  const key = locale === "fr" ? "BLOG_SCHEDULE_START_FR" : "BLOG_SCHEDULE_START_EN";
  const envDate = parseDateEnv(key);
  const base = envDate ?? nextScheduledDay(new Date());
  return withHour(base, getPublishHour());
}

export function scheduleDates(count: number, start: Date): Date[] {
  const dates: Date[] = [];
  let cursor = nextScheduledDay(start);
  cursor = withHour(cursor, getPublishHour());
  for (let i = 0; i < count; i += 1) {
    dates.push(new Date(cursor));
    cursor = withHour(addToNextSlot(cursor), getPublishHour());
  }
  return dates;
}

export function schedulePosts(posts: BlogPost[], locale: BlogLocale): ScheduledPost[] {
  const start = getScheduleStart(locale);
  const dates = scheduleDates(posts.length, start);
  return posts.map((p, i) => {
    const explicit = parseDateISO(p.publishAt);
    const publishNow = p.published === true && !explicit ? new Date() : null;
    return { ...p, publishAt: explicit ?? publishNow ?? dates[i] };
  });
}

export function getScheduledPostBySlug(posts: BlogPost[], slug: string, locale: BlogLocale, now = new Date()):
  | { post: ScheduledPost; isPublished: boolean }
  | null {
  const ordered = schedulePosts(posts.filter((p) => p.locale === locale), locale);
  const match = ordered.find((p) => p.slug === slug);
  if (!match) return null;
  const isPublished = match.publishAt.getTime() <= now.getTime();
  return { post: match, isPublished };
}

export function formatDate(d: Date, locale: BlogLocale): string {
  return d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Initial burst: publish the first N posts immediately, then follow M/W/F schedule for the rest.
function getInitialPublishCount(locale: BlogLocale): number {
  const key = locale === "fr" ? "BLOG_INITIAL_PUBLISH_COUNT_FR" : "BLOG_INITIAL_PUBLISH_COUNT_EN";
  const raw = process.env[key];
  const n = raw ? Number(raw) : 10;
  return Number.isFinite(n) && n >= 0 ? n : 10;
}

function getOverrideSlugs(locale: BlogLocale): string[] {
  const key = locale === "fr" ? "BLOG_PUBLISH_OVERRIDE_FR" : "BLOG_PUBLISH_OVERRIDE_EN";
  const raw = process.env[key] || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getPublishedPostsBurst(allPosts: BlogPost[], locale: BlogLocale, now = new Date()): ScheduledPost[] {
  const ordered = schedulePosts(allPosts.filter((p) => p.locale === locale), locale);
  const initialCount = getInitialPublishCount(locale);
  const overrides = new Set(getOverrideSlugs(locale));
  return ordered.filter(
    (p, idx) =>
      p.draft !== true &&
      (p.published === true ||
        idx < initialCount ||
        p.publishAt.getTime() <= now.getTime() ||
        overrides.has(p.slug))
  );
}

export function getScheduledPostBySlugBurst(
  posts: BlogPost[],
  slug: string,
  locale: BlogLocale,
  now = new Date()
):
  | { post: ScheduledPost; isPublished: boolean }
  | null {
  const ordered = schedulePosts(posts.filter((p) => p.locale === locale), locale);
  const matchIdx = ordered.findIndex((p) => p.slug === slug);
  if (matchIdx === -1) return null;
  const post = ordered[matchIdx];
  const initialCount = getInitialPublishCount(locale);
  const overrides = new Set(getOverrideSlugs(locale));
  const isPublished =
    post.draft !== true &&
    (post.published === true ||
      matchIdx < initialCount ||
      post.publishAt.getTime() <= now.getTime() ||
      overrides.has(slug));
  return { post, isPublished };
}