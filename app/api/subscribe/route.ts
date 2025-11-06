export const runtime = "nodejs";

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

function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  return (xf && xf.split(",")[0].trim()) || null;
}

function getDownloadUrl() {
  return process.env.NEXT_PUBLIC_GUIDE_PDF_URL || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
}

export async function POST(req: Request) {
  let email = "";
  const ct = req.headers.get("content-type") || "";

  try {
    if (ct.includes("application/json")) {
      const body = await req.json();
      email = String(body.email || "").trim();
    } else {
      const fd = await req.formData();
      email = String(fd.get("email") || "").trim();
    }
  } catch {
    // fallthrough, email remains ""
  }

  // naive validation
  if (!email || !/.+@.+\..+/.test(email)) {
    return json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const payload = {
    email,
    ts: new Date().toISOString(),
    ip: getClientIp(req),
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

  return json({ ok: true, downloadUrl: getDownloadUrl() });
}