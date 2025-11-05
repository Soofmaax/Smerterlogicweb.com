import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect old favicon and manifest paths to the new ones
  if (
    pathname === "/favicon.ico" ||
    pathname === "/favicon-16x16.png" ||
    pathname === "/favicon-32x32.png"
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/icon.svg";
    const res = NextResponse.redirect(url, 308);
    // Prevent long-term CDN/browser cache of legacy paths
    res.headers.set("Cache-Control", "no-store, must-revalidate");
    return res;
  }

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
  matcher: ["/favicon.ico", "/favicon-16x16.png", "/favicon-32x32.png", "/site.webmanifest"],
};