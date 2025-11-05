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
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/site.webmanifest") {
    const url = req.nextUrl.clone();
    url.pathname = "/manifest.webmanifest";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/favicon.ico", "/favicon-16x16.png", "/favicon-32x32.png", "/site.webmanifest"],
};