import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { getDb } from "@/lib/db";

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export async function recordPageView(path: string): Promise<void> {
  try {
    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
    const userAgent = requestHeaders.get("user-agent") || "unknown";
    const salt = process.env.ANALYTICS_HASH_SALT || process.env.SESSION_SECRET || "development-analytics-salt";
    const visitorHash = hash(`${salt}|${ip}|${userAgent}`);
    const sql = getDb();

    await sql`
      INSERT INTO site_visits (path, visitor_hash)
      VALUES (${path.slice(0, 500)}, ${visitorHash})
    `;
  } catch {
    // Analytics must never prevent a public page from rendering.
  }
}
