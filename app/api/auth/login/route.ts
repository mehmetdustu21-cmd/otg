import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, createAdminSessionToken, credentialsMatch, hasSameOrigin } from "@/lib/admin-auth";
import { rateLimit, requestAddress } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const limit = rateLimit(`login:${requestAddress(request)}`, 8, 15 * 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Ã‡ok fazla giriÅŸ denemesi. LÃ¼tfen daha sonra tekrar deneyin." }, { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": String(limit.retryAfter) } });
  }
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "GeÃ§ersiz istek kaynaÄŸÄ±." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }

  const body = (await request.json().catch(() => null)) as { username?: unknown; password?: unknown } | null;
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!credentialsMatch(username, password)) {
    return NextResponse.json(
      { error: "KullanÄ±cÄ± adÄ± veya parola hatalÄ±." },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(ADMIN_COOKIE, createAdminSessionToken(), adminCookieOptions);
    return response;
  } catch {
    return NextResponse.json(
      { error: "YÃ¶netici oturumu yapÄ±landÄ±rÄ±lmamÄ±ÅŸ. Vercel ortam deÄŸiÅŸkenlerini kontrol edin." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
