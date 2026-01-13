import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import { env } from '@/lib/env';

const globalStore = global as unknown as { rateLimiter: RateLimiterMemory };

const rateLimiter = globalStore.rateLimiter ?? new RateLimiterMemory({
  points: env.RATE_LIMIT,
  duration: 60,
});

if (env.NODE_ENV !== 'production') globalStore.rateLimiter = rateLimiter;

export async function checkRateLimit(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(',')[0] ?? "127.0.0.1";
  const isLocalhost = ip === "127.0.0.1" || ip === "::1";

  if (isLocalhost && env.NODE_ENV === 'production') {
    return { success: false, reset: 0 };
  }

  try {
    await rateLimiter.consume(ip);
    return { success: true, reset: 0 };
  } catch (res) {
    const reset = Math.round((res as RateLimiterRes).msBeforeNext / 1000) || 1;
    return { success: false, reset };
  }
}
