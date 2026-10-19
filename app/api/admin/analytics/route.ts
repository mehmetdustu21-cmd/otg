import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "private, no-store, max-age=0" };

export async function GET(request: NextRequest) {
  if (!hasAdminSession(request)) {
    return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401, headers });
  }

  try {
    const sql = getDb();
    const [summaryRows, pathRows, eventRows] = await Promise.all([
      sql`
        SELECT
          COUNT(*) FILTER (WHERE visited_at >= date_trunc('day', NOW() AT TIME ZONE 'Europe/Istanbul') AT TIME ZONE 'Europe/Istanbul')::int AS today_views,
          COUNT(*) FILTER (WHERE visited_at >= NOW() - INTERVAL '7 days')::int AS week_views,
          COUNT(*) FILTER (WHERE visited_at >= NOW() - INTERVAL '30 days')::int AS month_views,
          COUNT(*)::int AS total_views,
          COUNT(DISTINCT visitor_hash) FILTER (WHERE visited_at >= date_trunc('day', NOW() AT TIME ZONE 'Europe/Istanbul') AT TIME ZONE 'Europe/Istanbul')::int AS today_visitors,
          COUNT(DISTINCT visitor_hash) FILTER (WHERE visited_at >= NOW() - INTERVAL '7 days')::int AS week_visitors,
          COUNT(DISTINCT visitor_hash) FILTER (WHERE visited_at >= NOW() - INTERVAL '30 days')::int AS month_visitors,
          COUNT(DISTINCT visitor_hash)::int AS total_visitors
        FROM site_visits
      `,
      sql`
        SELECT path, COUNT(*)::int AS views
        FROM site_visits
        WHERE visited_at >= NOW() - INTERVAL '30 days'
        GROUP BY path
        ORDER BY views DESC
        LIMIT 10
      `,
      sql`
        SELECT event_name, COUNT(*)::int AS events
        FROM site_events
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY event_name
        ORDER BY events DESC
        LIMIT 10
      `
    ]);

    const summary = summaryRows[0] || {};
    return NextResponse.json({
      summary: {
        todayViews: Number(summary.today_views || 0),
        weekViews: Number(summary.week_views || 0),
        monthViews: Number(summary.month_views || 0),
        totalViews: Number(summary.total_views || 0),
        todayVisitors: Number(summary.today_visitors || 0),
        weekVisitors: Number(summary.week_visitors || 0),
        monthVisitors: Number(summary.month_visitors || 0),
        totalVisitors: Number(summary.total_visitors || 0)
      },
      topPaths: pathRows.map((row) => ({ path: row.path, views: Number(row.views) })),
      topEvents: eventRows.map((row) => ({ eventName: row.event_name, events: Number(row.events) }))
    }, { headers });
  } catch {
    return NextResponse.json(
      { error: "Ziyaret verileri alınamıyor. Neon veritabanında db/002_analytics.sql dosyasını çalıştırın." },
      { status: 503, headers }
    );
  }
}
