import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, createAdminSessionToken, credentialsMatch, hasSameOrigin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Geçersiz istek kaynağı." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }

  const body = (await request.json().catch(() => null)) as { username?: unknown; password?: unknown } | null;
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!credentialsMatch(username, password)) {
    return NextResponse.json(
      { error: "Kullanıcı adı veya parola hatalı." },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(ADMIN_COOKIE, createAdminSessionToken(), adminCookieOptions);
    return response;
  } catch {
    return NextResponse.json(
      { error: "Yönetici oturumu yapılandırılmamış. Vercel ortam değişkenlerini kontrol edin." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
