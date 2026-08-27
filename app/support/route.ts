import { NextRequest, NextResponse } from "next/server";

/**
 * GET /support → /faq (301).
 */
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/faq", request.url), 301);
}

