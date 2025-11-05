import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Keep only manifest redirect if a legacy path is requested
  if (pathname === "/site.webmanifest") {
    const url = req.nextUrl.clone();
    url.pathname = "/manifest.webmanifest";
    const res = NextResponse.redirect(url, 308);
    res.headers.set("Cache-Control", "no-store, must-revalidate");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/site.webmanifest"],
};