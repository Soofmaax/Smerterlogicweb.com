// Simple blog scheduling helpers: publish posts automatically on Mon/Wed/Fri.

export type BlogLocale = "fr" | "en";

export type BlogPost = {
  slug: string;
  locale: BlogLocale;
  title: string;
  summary?: string;
  contentHtml: string;
  tags?: string[];
  coverImage?: string;
  authorName?: string;
  authorUrl?: string;
  publishAt?: string;
  published?: boolean;
  draft?: boolean;
  altLocales?: Partial<Record<BlogLocale, string>>;
};

export type ScheduledPost = Omit<BlogPost, "publishAt"> & {
  publishAt: Date;
};

function parseDateEnv(key: string): Date | null {
  const value = process.env[key];
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function parseDateISO(value?: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function isMWF(day: number) {
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
  const dow = date.getDay();
  const inc = dow === 1 ? 2 : dow === 3 ? 2 : 3;
  const d = new Date(date);
  d.setDate(d.getDate() + inc);
  return d;
}

function getLocalHour(): number {
  const rawLocal = process.env.BLOG_PUBLISH_LOCAL_HOUR;
  const rawUtc = process.env.BLOG_PUBLISH_HOUR;
  const base = rawLocal ?? rawUtc;
  const h = base ? Number(base) : 9;
  if (Number.isFinite(h) && h >= 0 && h <= 23) return h;
  return 9;
}

function useEuropeParis(): boolean {
  const tz = (process.env.BLOG_PUBLISH_TZ || "").trim();
  return tz.toLowerCase() === "europe/paris";
}

function lastSunday(year: number, monthIndex: number): Date {
  // monthIndex: 0..11 UTC
  const last = new Date(Date.UTC(year, monthIndex + 1, 0, 0, 0, 0));
  const day = last.getUTCDay(); // 0..6
  const diff = day === 0 ? 0 : day; // how many days since Sunday
  last.setUTCDate(last.getUTCDate() - diff);
  return last;
}

function isDstEuropeParis(d: Date): boolean {
  const y = d.getUTCFullYear();
  const start = lastSunday(y, 2); // March
  // DST starts at 01:00 UTC on last Sunday of March
  const dstStart = new Date(Date.UTC(y, start.getUTCMonth(), start.getUTCDate(), 1, 0, 0));
  const end = lastSunday(y, 9); // October
  // DST ends at 01:00 UTC on last Sunday of October
  const dstEnd = new Date(Date.UTC(y, end.getUTCMonth(), end.getUTCDate(), 1, 0, 0));
  return d.getTime() >= dstStart.getTime() && d.getTime() < dstEnd.getTime();
}

function withHourUTC(date: Date, hour: number): Date {
  const d = new Date(date);
  d.setHours(hour, 0, 0, 0);
  return d;
}

function withLocalHourEuropeParis(date: Date, localHour: number): Date {
  const base = new Date(date);
  base.setUTCHours(0, 0, 0, 0);
  const summer = isDstEuropeParis(base);
  const offset = summer ? 2 : 1; // hours ahead of UTC
  let utcHour = localHour - offset;
  let dayShift = 0;
  while (utcHour < 0) {
    utcHour += 24;
    dayShift -= 1;
  }
  while (utcHour >= 24) {
    utcHour -= 24;
    dayShift += 1;
  }
  const y = base.getUTCFullYear();
  const m = base.getUTCMonth();
  const d = base.getUTCDate() + dayShift;
  return new Date(Date.UTC(y, m, d, utcHour, 0, 0, 0));
}

function applyPublishTime(date: Date): Date {
  const localHour = getLocalHour();
  if (useEuropeParis()) {
    return withLocalHourEuropeParis(date, localHour);
    }
  return withHourUTC(date, localHour);
}

export function getScheduleStart(locale: BlogLocale): Date {
  const key = locale === "fr" ? "BLOG_SCHEDULE_START_FR" : "BLOG_SCHEDULE_START_EN";
  const envDate = parseDateEnv(key);
  const base = envDate ?? nextScheduledDay(new Date());
  return applyPublishTime(base);
}

export function scheduleDates(count: number, start: Date): Date[] {
  const dates: Date[] = [];
  let cursor = nextScheduledDay(start);
  cursor = applyPublishTime(cursor);
  for (let i = 0; i < count; i += 1) {
    dates.push(new Date(cursor));
    cursor = applyPublishTime(addToNextSlot(cursor));
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

  const result: ScheduledPost[] = [];
  let nonDraftIndex = 0;

  for (const p of ordered) {
    const isDraft = p.draft === true;
    if (isDraft) {
      continue;
    }
    const include =
      p.published === true ||
      nonDraftIndex < initialCount ||
      p.publishAt.getTime() <= now.getTime() ||
      overrides.has(p.slug);

    if (include) {
      result.push(p);
    }
    nonDraftIndex += 1;
  }

  return result;
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
  const initialCount = getInitialPublishCount(locale);
  const overrides = new Set(getOverrideSlugs(locale));

  let match: ScheduledPost | null = null;
  let nonDraftIndex = -1;
  let cursor = 0;
  for (const p of ordered) {
    if (p.draft === true) continue;
    if (p.slug === slug) {
      match = p;
      nonDraftIndex = cursor;
      break;
    }
    cursor += 1;
  }
  if (!match) return null;

  const isPublished =
    match.published === true ||
    nonDraftIndex < initialCount ||
    match.publishAt.getTime() <= now.getTime() ||
    overrides.has(slug);

  return { post: match, isPublished };
}