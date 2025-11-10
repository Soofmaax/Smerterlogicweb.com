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
  return posts.map((p, i) => ({ ...p, publishAt: dates[i] }));
}

export function getPublishedPosts(posts: ScheduledPost[], now = new Date()): ScheduledPost[] {
  return posts.filter((p) => p.publishAt.getTime() <= now.getTime());
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