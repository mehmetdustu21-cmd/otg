import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { getDb } from "@/lib/db";

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

async function visitorHash(): Promise<string> {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const userAgent = requestHeaders.get("user-agent") || "unknown";
  const salt = process.env.ANALYTICS_HASH_SALT || process.env.SESSION_SECRET || "development-analytics-salt";
  return hash(`${salt}|${ip}|${userAgent}`);
}

export async function recordPageView(path: string): Promise<void> {
  try {
    const visitor = await visitorHash();
    const sql = getDb();

    await sql`
      INSERT INTO site_visits (path, visitor_hash)
      VALUES (${path.slice(0, 500)}, ${visitor})
    `;
  } catch {
    // Analytics must never prevent a public page from rendering.
  }
}

export async function recordEvent(eventName: string, path: string): Promise<void> {
  try {
    const sql = getDb();
    await sql`
      INSERT INTO site_events (event_name, path, visitor_hash)
      VALUES (${eventName.slice(0, 80)}, ${path.slice(0, 500)}, ${await visitorHash()})
    `;
  } catch {
    // Analytics must never prevent a public action from completing.
  }
}
