import { NextRequest, NextResponse } from "next/server";

/**
 * GET /support → /faq (301).
 */
export function GET(request: NextRequest) {
  const dest = new URL("/faq", request.url);
  request.nextUrl.searchParams.forEach((value, key) => {
    dest.searchParams.append(key, value);
  });
  return NextResponse.redirect(dest, 301);
}

