import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * Resend Inbound: when mail hits your verified receiving domain, Resend POSTs here.
 * Forwards e.g. support@syncupalarm.com → hello@strandandstonellc.com.
 *
 * Setup: https://resend.com/docs/knowledge-base/forward-emails-with-resend-inbound
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  const forwardTo = process.env.RESEND_FORWARD_TO;
  const forwardFrom = process.env.RESEND_FORWARD_FROM;

  if (!apiKey || !webhookSecret) {
    console.error("resend webhook: missing RESEND_API_KEY or RESEND_WEBHOOK_SECRET");
    return new NextResponse("Not configured", { status: 503 });
  }

  if (!forwardTo || !forwardFrom) {
    console.error("resend webhook: missing RESEND_FORWARD_TO or RESEND_FORWARD_FROM");
    return new NextResponse("Forwarding not configured", { status: 503 });
  }

  const resend = new Resend(apiKey);
  const payload = await req.text();
  const id = req.headers.get("svix-id");
  const timestamp = req.headers.get("svix-timestamp");
  const signature = req.headers.get("svix-signature");

  if (!id || !timestamp || !signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  let event: ReturnType<typeof resend.webhooks.verify>;
  try {
    event = resend.webhooks.verify({
      payload,
      headers: { id, timestamp, signature },
      webhookSecret,
    });
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type !== "email.received") {
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  const allowedRecipients = (process.env.RESEND_INBOUND_RECIPIENTS ??
    "support@syncupalarm.com")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const toAddresses = event.data.to.map((a) => a.toLowerCase());
  const shouldForward = toAddresses.some((addr) => allowedRecipients.includes(addr));

  if (!shouldForward) {
    return NextResponse.json({ ok: true, skipped: true, to: event.data.to });
  }

  const { data, error } = await resend.emails.receiving.forward({
    emailId: event.data.email_id,
    to: forwardTo,
    from: forwardFrom,
    passthrough: true,
  });

  if (error) {
    console.error("resend forward error:", error);
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json({ ok: true, forwardedId: data?.id });
}

export function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
