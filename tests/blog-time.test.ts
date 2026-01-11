import { describe, it, expect, afterEach } from "vitest";
import { applyPublishTime, computePublishAtISO } from "@/lib/blog-time";

function withEnv<T>(env: Record<string, string | undefined>, fn: () => T): T {
  const prev: Record<string, string | undefined> = {};
  for (const key of Object.keys(env)) {
    prev[key] = process.env[key];
    const val = env[key];
    if (val === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = val;
    }
  }
  const result = fn();
  for (const key of Object.keys(env)) {
    const val = prev[key];
    if (val === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = val;
    }
  }
  return result;
}

describe("blog-time", () => {
  afterEach(() => {
    delete process.env.BLOG_PUBLISH_LOCAL_HOUR;
    delete process.env.BLOG_PUBLISH_HOUR;
    delete process.env.BLOG_PUBLISH_TZ;
  });

  it("computePublishAtISO respecte l'heure locale et Europe/Paris hors DST", () => {
    const iso = withEnv(
      {
        BLOG_PUBLISH_LOCAL_HOUR: "9",
        BLOG_PUBLISH_TZ: "Europe/Paris",
      },
      () => computePublishAtISO("2025-02-10") as string,
    );

    const d = new Date(iso);
    expect(d.getUTCHours()).toBe(8); // 9h Paris = 8h UTC en hiver
    expect(d.getUTCFullYear()).toBe(2025);
    expect(d.getUTCMonth()).toBe(1);
    expect(d.getUTCDate()).toBe(10);
  });

  it("computePublishAtISO respecte l'heure locale et Europe/Paris en DST", () => {
    const iso = withEnv(
      {
        BLOG_PUBLISH_LOCAL_HOUR: "9",
        BLOG_PUBLISH_TZ: "Europe/Paris",
      },
      () => computePublishAtISO("2025-06-10") as string,
    );

    const d = new Date(iso);
    expect(d.getUTCHours()).toBe(7); // 9h Paris = 7h UTC en été
    expect(d.getUTCFullYear()).toBe(2025);
    expect(d.getUTCMonth()).toBe(5);
    expect(d.getUTCDate()).toBe(10);
  });

  it("applyPublishTime applique l'heure locale sur un slot de date (Europe/Paris)", () => {
    const base = new Date(Date.UTC(2025, 1, 10, 0, 0, 0));

    const scheduled = withEnv(
      {
        BLOG_PUBLISH_LOCAL_HOUR: "10",
        BLOG_PUBLISH_TZ: "Europe/Paris",
      },
      () => applyPublishTime(base),
    );

    expect(scheduled.getUTCFullYear()).toBe(2025);
    expect(scheduled.getUTCMonth()).toBe(1);
    expect(scheduled.getUTCDate()).toBe(10);
    expect(scheduled.getUTCHours()).toBe(9);
  });

  it("applyPublishTime retombe sur BLOG_PUBLISH_HOUR si BLOG_PUBLISH_LOCAL_HOUR est absent", () => {
    const base = new Date(Date.UTC(2025, 1, 10, 0, 0, 0));

    const scheduled = withEnv(
      {
        BLOG_PUBLISH_HOUR: "6",
        BLOG_PUBLISH_TZ: "",
      },
      () => applyPublishTime(base),
    );

    expect(scheduled.getUTCHours()).toBe(6);
  });
});