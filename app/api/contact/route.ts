import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const privateHeaders = { "Cache-Control": "no-store" };

function cleanText(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: NextRequest) {
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
  const phone = cleanText(body.phone, 50);
  const email = cleanText(body.email, 254).toLowerCase();
  const company = cleanText(body.company, 200) || null;
  const country = cleanText(body.country, 100);
  const message = cleanText(body.message, 5000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (fullName.length < 2 || phone.length < 6 || !emailPattern.test(email) || country.length < 2 || message.length < 8) {
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
      INSERT INTO inquiries (full_name, phone, email, company, country, message, ip_address, user_agent)
      VALUES (${fullName}, ${phone}, ${email}, ${company}, ${country}, ${message}, ${ipAddress}, ${userAgent})
    `;
    return NextResponse.json({ ok: true }, { status: 201, headers: privateHeaders });
  } catch {
    return NextResponse.json(
      { error: "Talebiniz şu anda kaydedilemedi. Lütfen doğrudan e-posta veya telefonla iletişime geçin." },
      { status: 503, headers: privateHeaders }
    );
  }
}
