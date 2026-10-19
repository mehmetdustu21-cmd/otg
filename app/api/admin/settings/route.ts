import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession, hasSameOrigin } from "@/lib/admin-auth";
import { getDb } from "@/lib/db";
import { defaultSiteSettings, getSiteSettings, type SiteSettings } from "@/lib/site-settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const responseHeaders = { "Cache-Control": "private, no-store, max-age=0" };

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validate(input: Partial<SiteSettings>): SiteSettings | null {
  const contact_email = clean(input.contact_email, 254).toLowerCase();
  const phone_primary = clean(input.phone_primary, 60);
  const phone_secondary = clean(input.phone_secondary, 60);
  const contact_locations = clean(input.contact_locations, 240);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) return null;
  if (phone_primary.length < 6 || phone_secondary.length < 6 || contact_locations.length < 2) return null;
  return { contact_email, phone_primary, phone_secondary, contact_locations };
}

export async function GET(request: NextRequest) {
  if (!hasAdminSession(request)) return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401, headers: responseHeaders });
  return NextResponse.json({ settings: await getSiteSettings() }, { headers: responseHeaders });
}

export async function PUT(request: NextRequest) {
  if (!hasSameOrigin(request)) return NextResponse.json({ error: "Geçersiz istek kaynağı." }, { status: 403, headers: responseHeaders });
  if (!hasAdminSession(request)) return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401, headers: responseHeaders });
  const body = await request.json().catch(() => null) as Partial<SiteSettings> | null;
  const settings = body ? validate(body) : null;
  if (!settings) return NextResponse.json({ error: "E-posta, telefon ve iletişim konumlarını kontrol edin." }, { status: 400, headers: responseHeaders });

  try {
    const sql = getDb();
    await sql.begin(async (transaction) => {
      for (const [setting_key, setting_value] of Object.entries(settings)) {
        await transaction`
          INSERT INTO site_settings (setting_key, setting_value, updated_at)
          VALUES (${setting_key}, ${setting_value}, NOW())
          ON CONFLICT (setting_key) DO UPDATE
          SET setting_value = EXCLUDED.setting_value, updated_at = NOW()
        `;
      }
    });
    return NextResponse.json({ settings }, { headers: responseHeaders });
  } catch {
    return NextResponse.json({ error: "İletişim ayarları kaydedilemedi. Neon'da db/003_site_settings.sql dosyasını çalıştırın." }, { status: 503, headers: responseHeaders });
  }
}
