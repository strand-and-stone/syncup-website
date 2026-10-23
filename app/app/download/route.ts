import { NextRequest, NextResponse } from "next/server";

/**
 * GET /app/download → /download (301).
 * /download itself 308s to the App Store and keeps the query string.
 */
export function GET(request: NextRequest) {
  const dest = new URL("/download", request.url);
  request.nextUrl.searchParams.forEach((value, key) => {
    dest.searchParams.append(key, value);
  });
  return NextResponse.redirect(dest, 301);
}
