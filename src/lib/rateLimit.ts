import { NextRequest } from "next/server";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const map = new Map<string, RateLimitEntry>();

/** Simple in-memory rate limiter (per-IP). */
export function rateLimit(
  request: NextRequest,
  limit = 5,
  windowMs = 60_000
): { success: boolean; remaining: number } {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "anon";

  const now = Date.now();
  const entry = map.get(ip);

  if (!entry || now > entry.resetTime) {
    map.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: limit - entry.count };
}
