export const runtime = "nodejs";

import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIpFromHeaders, isValidEmail, readJsonWithLimit } from "@/lib/security";

function json(data: any, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    status: init?.status || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...init?.headers,
    },
  });
}

function getDownloadUrl() {
  return process.env.NEXT_PUBLIC_GUIDE_PDF_URL || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
}

export async function POST(req: Request) {
  const ip = getClientIpFromHeaders(req);
  const rl = checkRateLimit(`subscribe:${ip}`, 10, 10 * 60 * 1000); // 10 req / 10 min per IP
  if (!rl.ok) {
    return json(
      { ok: false, error: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": String(rl.limit),
          "X-RateLimit-Remaining": String(rl.remaining),
          "X-RateLimit-Reset": String(Math.round(rl.resetAt / 1000)),
        },
      }
    );
  }

  // Enforce JSON only, with size limit
  let body: any = null;
  try {
    body = await readJsonWithLimit(req, 20_000);
  } catch (err: any) {
    const code = err?.code || err?.message;
    if (code === "unsupported_content_type") {
      return json({ ok: false, error: "unsupported_content_type" }, { status: 415 });
    }
    if (code === "payload_too_large") {
      return json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    return json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = String((body && body.email) || "").trim();

  if (!isValidEmail(email)) {
    return json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const payload = {
    email,
    ts: new Date().toISOString(),
    ip,
    ua: req.headers.get("user-agent") || null,
    path: req.headers.get("x-pathname") || null,
  };

  // Option 1: webhook (Zapier/Make/Sheet monkey)
  const webhook = process.env.SUBSCRIBE_WEBHOOK || "";
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // ignore webhook failures
    }
  }

  // Option 2: local ephemeral storage (/tmp) — not persistent across serverless runs
  if ((process.env.SUBSCRIBE_LOCAL_FALLBACK || "").toString() === "1") {
    try {
      const fs = await import("fs/promises");
      const p = "/tmp/subscribers.json";
      let existing: any[] = [];
      try {
        const txt = await fs.readFile(p, "utf-8");
        existing = JSON.parse(txt);
      } catch {}
      existing.push(payload);
      await fs.writeFile(p, JSON.stringify(existing, null, 2), "utf-8");
    } catch {
      // ignore write errors
    }
  }

  return json(
    { ok: true, downloadUrl: getDownloadUrl() },
    {
      headers: {
        "X-RateLimit-Limit": String(rl.limit),
        "X-RateLimit-Remaining": String(Math.max(0, rl.remaining - 1)),
        "X-RateLimit-Reset": String(Math.round(rl.resetAt / 1000)),
      },
    }
  );
}