// Common time & scheduling helpers for the blog (DST-safe, Europe/Paris aware where needed).

export function getLocalHour(): number {
  const rawLocal = process.env.BLOG_PUBLISH_LOCAL_HOUR;
  const rawUtc = process.env.BLOG_PUBLISH_HOUR;
  const base = rawLocal ?? rawUtc;
  const h = base ? Number(base) : 9;
  if (Number.isFinite(h) && h >= 0 && h <= 23) return h;
  return 9;
}

export function isEuropeParisTz(): boolean {
  const tz = (process.env.BLOG_PUBLISH_TZ || "").trim();
  return tz.toLowerCase() === "europe/paris";
}

export function lastSunday(year: number, monthIndex: number): Date {
  // monthIndex: 0..11 UTC
  const last = new Date(Date.UTC(year, monthIndex + 1, 0, 0, 0, 0));
  const day = last.getUTCDay(); // 0..6
  const diff = day === 0 ? 0 : day; // how many days since Sunday
  last.setUTCDate(last.getUTCDate() - diff);
  return last;
}

export function isDstEuropeParis(d: Date): boolean {
  const y = d.getUTCFullYear();
  const start = lastSunday(y, 2); // March
  // DST starts at 01:00 UTC on last Sunday of March
  const dstStart = new Date(Date.UTC(y, start.getUTCMonth(), start.getUTCDate(), 1, 0, 0));
  const end = lastSunday(y, 9); // October
  // DST ends at 01:00 UTC on last Sunday of October
  const dstEnd = new Date(Date.UTC(y, end.getUTCMonth(), end.getUTCDate(), 1, 0, 0));
  return d.getTime() >= dstStart.getTime() && d.getTime() < dstEnd.getTime();
}

export function withHourUTC(date: Date, hour: number): Date {
  const d = new Date(date);
  d.setHours(hour, 0, 0, 0);
  return d;
}

export function withLocalHourEuropeParis(date: Date, localHour: number): Date {
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

export function applyPublishTime(date: Date): Date {
  const localHour = getLocalHour();
  if (isEuropeParisTz()) {
    return withLocalHourEuropeParis(date, localHour);
  }
  return withHourUTC(date, localHour);
}

/**
 * Compute an ISO publish datetime (UTC) from a calendar date in YYYY-MM-DD.
 * Used when inferring publishAt from the filename.
 */
export function computePublishAtISO(dateStr: string): string | undefined {
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return undefined;
  const y = Number(m[1]);
  const mm = Number(m[2]) - 1;
  const dd = Number(m[3]);
  const localHour = getLocalHour();

  const base = new Date(Date.UTC(y, mm, dd, 0, 0, 0));
  if (isEuropeParisTz()) {
    const d = withLocalHourEuropeParis(base, localHour);
    return d.toISOString();
  }
  const d = new Date(Date.UTC(y, mm, dd, localHour, 0, 0));
  return d.toISOString();
}