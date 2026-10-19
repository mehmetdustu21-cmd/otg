import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "orchard_admin_session";
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60;

export function hasSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}

function constantTimeTextEqual(left: string, right: string): boolean {
  const leftDigest = createHash("sha256").update(left).digest();
  const rightDigest = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest) && left.length === right.length;
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 characters");
  }
  return secret;
}

export function credentialsMatch(username: string, password: string): boolean {
  const expectedUsername = process.env.ADMIN_USERNAME || "mehmetdustu";
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) return false;
  return constantTimeTextEqual(username, expectedUsername) && constantTimeTextEqual(password, expectedPassword);
}

export function createAdminSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ expiresAt: Date.now() + ADMIN_SESSION_SECONDS * 1000 }),
    "utf8"
  ).toString("base64url");
  const signature = createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function hasAdminSession(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const suppliedSignature = token.slice(separator + 1);
  try {
    const expectedSignature = createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
    if (!constantTimeTextEqual(suppliedSignature, expectedSignature)) return false;

    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { expiresAt?: unknown };
    return typeof decoded.expiresAt === "number" && decoded.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export const adminCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  path: "/",
  maxAge: ADMIN_SESSION_SECONDS
};
