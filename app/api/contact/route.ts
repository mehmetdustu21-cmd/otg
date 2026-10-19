import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { rateLimit, requestAddress } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const privateHeaders = { "Cache-Control": "no-store" };

function cleanText(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: NextRequest) {
  const limit = rateLimit(`contact:${requestAddress(request)}`, 5, 60 * 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Çok fazla form gönderildi. Lütfen daha sonra tekrar deneyin." }, { status: 429, headers: { ...privateHeaders, "Retry-After": String(limit.retryAfter) } });
  }
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 20_000) {
    return NextResponse.json({ error: "Form verisi çok büyük." }, { status: 413, headers: privateHeaders });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: "Form verisi okunamadı." }, { status: 400, headers: privateHeaders });
  }

  // Quietly accept bot honeypot submissions without storing them.
  if (cleanText(body.website, 200)) {
    return NextResponse.json({ ok: true }, { headers: privateHeaders });
  }

  const fullName = cleanText(body.fullName, 140);
  const phone = cleanText(body.phone, 50) || null;
  const email = cleanText(body.email, 254).toLowerCase();
  const company = cleanText(body.company, 200) || null;
  const country = cleanText(body.country, 100);
  const message = cleanText(body.message, 5000);
  const buyerType = cleanText(body.buyerType, 120) || null;
  const productInterest = cleanText(body.productInterest, 160) || null;
  const estimatedVolume = cleanText(body.estimatedVolume, 160) || null;
  const packagingPreference = cleanText(body.packagingPreference, 160) || null;
  const locale = cleanText(body.locale, 10) || null;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (fullName.length < 2 || !emailPattern.test(email) || country.length < 2 || message.length < 8) {
    return NextResponse.json(
      { error: "Lütfen zorunlu alanları kontrol edin ve geçerli bir e-posta adresi girin." },
      { status: 400, headers: privateHeaders }
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = cleanText(forwardedFor?.split(",")[0] || request.headers.get("x-real-ip"), 128) || "Unavailable";
  const userAgent = cleanText(request.headers.get("user-agent"), 1000) || "Unavailable";

  try {
    const sql = getDb();
    await sql`
      INSERT INTO inquiries (full_name, phone, email, company, country, message, ip_address, user_agent, buyer_type, product_interest, estimated_volume, packaging_preference, locale)
      VALUES (${fullName}, ${phone}, ${email}, ${company}, ${country}, ${message}, ${ipAddress}, ${userAgent}, ${buyerType}, ${productInterest}, ${estimatedVolume}, ${packagingPreference}, ${locale})
    `;
    const webhook = process.env.INQUIRY_NOTIFICATION_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "new_inquiry", fullName, phone, email, company, country, message, buyerType, productInterest, estimatedVolume, packagingPreference, locale }),
        signal: AbortSignal.timeout(3_000)
      }).catch(() => undefined);
    }
    return NextResponse.json({ ok: true }, { status: 201, headers: privateHeaders });
  } catch {
    return NextResponse.json(
      { error: "Talebiniz şu anda kaydedilemedi. Lütfen doğrudan e-posta veya telefonla iletişime geçin." },
      { status: 503, headers: privateHeaders }
    );
  }
}
