import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { authenticated: hasAdminSession(request) },
    { headers: { "Cache-Control": "private, no-store, max-age=0" } }
  );
}
