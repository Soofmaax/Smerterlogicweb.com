export type RateLimitInfo = {
  ok: boolean;
  limit: number;
  remaining: number;
  resetAt: number; // epoch ms
};

type Entry = {
  count: number;
  resetAt: number;
};

const g = globalThis as unknown as { __RATE_LIMIT_STORE?: Map<string, Entry> };
const store: Map<string, Entry> = g.__RATE_LIMIT_STORE || new Map();
g.__RATE_LIMIT_STORE = store;

/**
 * In-memory rate limiter (best-effort).
 * Note: In serverless environments it is not shared across instances.
 */
export function checkRateLimit(key: string, limit = 60, windowMs = 60_000): RateLimitInfo {
  const now = Date.now();
  const e = store.get(key);

  if (!e || now >= e.resetAt) {
    const fresh: Entry = { count: 1, resetAt: now + windowMs };
    store.set(key, fresh);
    return { ok: true, limit, remaining: limit - 1, resetAt: fresh.resetAt };
  }

  e.count += 1;
  store.set(key, e);

  const ok = e.count <= limit;
  return {
    ok,
    limit,
    remaining: ok ? Math.max(0, limit - e.count) : 0,
    resetAt: e.resetAt,
  };
}