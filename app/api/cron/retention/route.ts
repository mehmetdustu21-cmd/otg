import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function constantTimeEqual(left: string, right: string): boolean {
  return timingSafeEqual(createHash("sha256").update(left).digest(), createHash("sha256").update(right).digest());
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization") || "";
  if (!secret || !constantTimeEqual(authorization, `Bearer ${secret}`)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const sql = getDb();
    const result = await sql`
      WITH deleted AS (
        DELETE FROM inquiries
        WHERE submitted_at < NOW() - INTERVAL '60 months'
        RETURNING 1
      )
      SELECT COUNT(*)::int AS deleted_count FROM deleted
    `;
    return NextResponse.json(
      { ok: true, deletedCount: result[0]?.deleted_count ?? 0 },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ error: "Retention cleanup failed." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
