// Lightweight in-memory fixed-window rate limiter.
//
// NOTE: state lives in a single server-instance's memory. On serverless
// (Vercel) this reliably blocks rapid bursts hitting a warm instance, but is
// not a global guarantee across all instances. It is a cheap first line of
// defense against form spam and login brute-forcing. For a hard global limit,
// back this with Upstash Redis or a Supabase table keyed by IP + window.

interface Bucket {
  count: number;
  resetAt: number;
}

const store = new Map<string, Bucket>();

// Cap memory: when the map grows large, drop expired buckets.
function sweep(now: number) {
  if (store.size < 10_000) return;
  for (const [key, bucket] of store) {
    if (bucket.resetAt <= now) store.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = store.get(key);

  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, retryAfterSeconds: 0 };
}

// Read the originating client IP. `req.ip` was removed in Next.js 15, so we
// rely on the proxy-set forwarded headers (Vercel sets `x-forwarded-for`).
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}
