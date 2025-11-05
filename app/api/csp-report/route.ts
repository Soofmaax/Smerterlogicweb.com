export const runtime = "nodejs";

async function parseBody(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json") || contentType.includes("application/reports+json")) {
      return await req.json();
    }
    // Some browsers send "application/csp-report"
    if (contentType.includes("application/csp-report")) {
      return await req.json();
    }
    // Fallback
    const text = await req.text();
    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const report = await parseBody(req);
  // Intentionally minimal: just log on server for diagnostics
  try {
    console.warn("CSP report:", JSON.stringify(report));
  } catch {
    // ignore
  }
  return new Response(null, { status: 204 });
}