import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    const g = globalThis as unknown as { __RATE_LIMIT_STORE?: Map<string, { count: number; resetAt: number }> };
    g.__RATE_LIMIT_STORE?.clear();
  });

  it("autorise la première requête et initialise la fenêtre", () => {
    const res = checkRateLimit("ip:test", 3, 1_000);
    expect(res.ok).toBe(true);
    expect(res.limit).toBe(3);
    expect(res.remaining).toBe(2);
    expect(typeof res.resetAt).toBe("number");
  });

  it("diminue remaining à chaque appel jusqu'à épuisement", () => {
    const key = "ip:burst";
    const r1 = checkRateLimit(key, 2, 1_000);
    const r2 = checkRateLimit(key, 2, 1_000);
    const r3 = checkRateLimit(key, 2, 1_000);

    expect(r1.ok).toBe(true);
    expect(r1.remaining).toBe(1);

    expect(r2.ok).toBe(true);
    expect(r2.remaining).toBe(0);

    expect(r3.ok).toBe(false);
    expect(r3.remaining).toBe(0);
    expect(r3.resetAt).toBe(r2.resetAt);
  });

  it("réinitialise la fenêtre après expiration", () => {
    const key = "ip:window";
    const r1 = checkRateLimit(key, 1, 10); // limit 1
    expect(r1.ok).toBe(true);

    // Simule l'expiration en avançant manuellement la fenêtre
    const g = globalThis as unknown as { __RATE_LIMIT_STORE?: Map<string, { count: number; resetAt: number }> };
    const store = g.__RATE_LIMIT_STORE!;
    const entry = store.get(key)!;
    store.set(key, { ...entry, resetAt: Date.now() - 1 });

    const r2 = checkRateLimit(key, 1, 10);
    expect(r2.ok).toBe(true);
    expect(r2.remaining).toBe(0);
    expect(r2.resetAt).toBeGreaterThan(r1.resetAt);
  });
});