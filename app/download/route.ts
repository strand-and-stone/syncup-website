import { NextRequest, NextResponse } from "next/server";

import { STORE_LINKS } from "@/lib/constants";

/**
 * GET /download → App Store (307).
 * Forwards query string (e.g. utm_*) for campaign tracking in your analytics tools.
 */
export function GET(request: NextRequest) {
  const dest = new URL(STORE_LINKS.appStore);
  request.nextUrl.searchParams.forEach((value, key) => {
    dest.searchParams.append(key, value);
  });
  return NextResponse.redirect(dest, 307);
}
