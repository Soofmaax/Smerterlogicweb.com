export const runtime = "nodejs";

function json(data: any, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...init?.headers,
    },
    ...init,
  });
}

export async function GET() {
  const now = new Date();
  const uptime = typeof process !== "undefined" && process.uptime ? Math.round(process.uptime()) : null;

  const payload = {
    status: "ok",
    time: now.toISOString(),
    uptime_seconds: uptime,
    env: {
      provider: "netlify",
      branch: process.env.BRANCH || null,
      context: process.env.CONTEXT || null,
      commit: process.env.COMMIT_REF || null,
    },
  };

  return json(payload);
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: {
      "cache-control": "no-store",
    },
  });
}