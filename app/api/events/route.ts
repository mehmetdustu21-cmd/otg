import { NextRequest, NextResponse } from "next/server";
import { recordEvent } from "@/lib/analytics";
import { rateLimit, requestAddress } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const privateHeaders = { "Cache-Control": "no-store" };
const allowedEvents = new Set(["quote_click", "sample_click", "whatsapp_click", "email_click", "phone_click", "form_start", "form_submit", "brochure_download"]);

export async function POST(request: NextRequest) {
  const limit = rateLimit(`event:${requestAddress(request)}`, 60, 60_000);
  if (!limit.allowed) return NextResponse.json({ ok: false }, { status: 429, headers: { ...privateHeaders, "Retry-After": String(limit.retryAfter) } });
  const body = await request.json().catch(() => null) as { eventName?: unknown; path?: unknown } | null;
  const eventName = typeof body?.eventName === "string" ? body.eventName : "";
  const path = typeof body?.path === "string" ? body.path.slice(0, 500) : "/";
  if (!allowedEvents.has(eventName)) return NextResponse.json({ ok: false }, { status: 400, headers: privateHeaders });
  await recordEvent(eventName, path);
  return NextResponse.json({ ok: true }, { headers: privateHeaders });
}
