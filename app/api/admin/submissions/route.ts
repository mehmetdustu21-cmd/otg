import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
import { hasAdminSession, hasSameOrigin } from "@/lib/admin-auth";
=======
import { hasAdminSession } from "@/lib/admin-auth";
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
<<<<<<< HEAD
const validStatuses = new Set(["new", "contacted", "qualified", "sample_sent", "quoted", "won", "lost"]);
=======
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728

export async function GET(request: NextRequest) {
  const headers = { "Cache-Control": "private, no-store, max-age=0" };
  if (!hasAdminSession(request)) {
    return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401, headers });
  }

  const cursor = request.nextUrl.searchParams.get("before");
  if (cursor && !/^\d{1,20}$/.test(cursor)) {
    return NextResponse.json({ error: "Sayfalama imleci geçersiz." }, { status: 400, headers });
  }

  try {
    const sql = getDb();
    const rows = cursor
      ? await sql`
          SELECT id, full_name, phone, email, company, country, message,
<<<<<<< HEAD
                 ip_address, user_agent, buyer_type, product_interest,
                 estimated_volume, packaging_preference, locale, lead_status, submitted_at
=======
                 ip_address, user_agent, submitted_at
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728
          FROM inquiries
          WHERE id < ${cursor}::bigint
          ORDER BY id DESC
          LIMIT 501
        `
      : await sql`
          SELECT id, full_name, phone, email, company, country, message,
<<<<<<< HEAD
                 ip_address, user_agent, buyer_type, product_interest,
                 estimated_volume, packaging_preference, locale, lead_status, submitted_at
=======
                 ip_address, user_agent, submitted_at
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728
          FROM inquiries
          ORDER BY id DESC
          LIMIT 501
        `;

    const hasMore = rows.length > 500;
    const submissions = hasMore ? rows.slice(0, 500) : rows;
    const nextCursor = hasMore ? String(submissions[submissions.length - 1].id) : null;
    return NextResponse.json({ submissions, nextCursor }, { headers });
  } catch {
    return NextResponse.json(
      { error: "Kayıtlar şu anda alınamıyor. Veritabanı bağlantısını ve tablo kurulumunu kontrol edin." },
      { status: 503, headers }
    );
  }
}
<<<<<<< HEAD

export async function PUT(request: NextRequest) {
  const headers = { "Cache-Control": "private, no-store, max-age=0" };
  if (!hasSameOrigin(request) || !hasAdminSession(request)) return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401, headers });
  const body = await request.json().catch(() => null) as { id?: unknown; status?: unknown } | null;
  const id = typeof body?.id === "string" && /^\d{1,20}$/.test(body.id) ? body.id : "";
  const status = typeof body?.status === "string" && validStatuses.has(body.status) ? body.status : "";
  if (!id || !status) return NextResponse.json({ error: "Başvuru durumu geçersiz." }, { status: 400, headers });
  try {
    const sql = getDb();
    const rows = await sql`UPDATE inquiries SET lead_status = ${status} WHERE id = ${id}::bigint RETURNING id, lead_status`;
    if (!rows[0]) return NextResponse.json({ error: "Başvuru bulunamadı." }, { status: 404, headers });
    return NextResponse.json({ id: String(rows[0].id), status: rows[0].lead_status }, { headers });
  } catch {
    return NextResponse.json({ error: "Başvuru durumu kaydedilemedi." }, { status: 503, headers });
  }
}
=======
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728
