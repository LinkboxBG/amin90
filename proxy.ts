import { NextRequest, NextResponse } from "next/server";

/**
 * Canonical host is always without "www." (amin90.vercel.app, amin90.com, …).
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":")[0].toLowerCase();

  if (!hostname.startsWith("www.")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.hostname = hostname.slice(4);
  url.protocol = "https:";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
