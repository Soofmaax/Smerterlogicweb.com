/**
 * Extract client IP from common proxy headers.
 * Not guaranteed and can be spoofed — use upstream WAF for enforcement.
 */
export function getClientIpFromHeaders(req: Request): string {
  const h = req.headers;
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const ip = xff.split(",")[0]?.trim();
    if (ip) return ip;
  }
  return (
    h.get("x-real-ip") ||
    h.get("x-client-ip") ||
    h.get("cf-connecting-ip") ||
    h.get("x-nf-client-connection-ip") || // Netlify
    "unknown"
  );
}

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const e = email.trim();
  if (!e || e.length > 254) return false;
  // Simple but robust-enough validation; backend must still handle bounces
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(e);
}

/**
 * Read and parse JSON body with a byte limit. Throws Error codes:
 * - "unsupported_content_type"
 * - "payload_too_large"
 * - "invalid_json"
 */
export async function readJsonWithLimit(req: Request, maxBytes = 20_000): Promise<any> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();
  if (!ct.startsWith("application/json")) {
    const err: any = new Error("unsupported_content_type");
    err.code = "unsupported_content_type";
    throw err;
  }
  const text = await req.text();
  if (text.length > maxBytes) {
    const err: any = new Error("payload_too_large");
    err.code = "payload_too_large";
    throw err;
  }
  try {
    return JSON.parse(text);
  } catch {
    const err: any = new Error("invalid_json");
    err.code = "invalid_json";
    throw err;
  }
}