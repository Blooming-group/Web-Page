import { NextResponse, type NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// ─── Bot / Scanner Detection ───────────────────────────────────────────────
// Block known vulnerability scanners, scrapers, and exploit frameworks.
// Legitimate crawlers (Googlebot, etc.) are NOT blocked — they have real UAs.
const BLOCKED_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /zgrab/i,
  /nuclei/i,
  /python-requests\/[0-9]/i, // raw Python requests (most scanners use this)
  /go-http-client\/[0-9]/i, // raw Go HTTP (scanner default)
  /curl\/[0-9]/i, // raw curl (automated probing)
  /libwww-perl/i,
  /jakarta/i,
  /winhttp/i,
]

// ─── Redis-backed Rate Limiting ───────────────────────────────────────────
// Module-level singletons — one per edge worker instance.
// When Redis env vars are present, counters are shared across ALL Vercel
// instances globally (real protection). Without them, falls back to in-memory
// (development only — resets on cold start, not global).

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

// 120 requests / minute for normal pages
const generalLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(120, '1 m'),
      prefix: 'bl:page',
      analytics: false,
    })
  : null

// 20 requests / minute for API routes
const apiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 m'),
      prefix: 'bl:api',
      analytics: false,
    })
  : null

// In-memory fallback — used only when Redis is not configured (local dev)
const memoryMap = new Map<string, { count: number; resetAt: number }>()

function memoryRateLimit(ip: string, isApi: boolean): boolean {
  const now = Date.now()
  const limit = isApi ? 20 : 120
  const key = `${ip}:${isApi ? 'api' : 'page'}`
  const record = memoryMap.get(key)

  if (!record || now > record.resetAt) {
    memoryMap.set(key, { count: 1, resetAt: now + 60_000 })
    return false
  }
  if (record.count >= limit) return true
  record.count++
  return false
}

async function isRateLimited(ip: string, isApi: boolean): Promise<boolean> {
  const limiter = isApi ? apiLimiter : generalLimiter

  if (limiter) {
    const { success } = await limiter.limit(ip)
    return !success
  }

  return memoryRateLimit(ip, isApi)
}

// ─── Middleware ─────────────────────────────────────────────────────────────
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  // ── 1. Block known malicious User-Agents ─────────────────────────────────
  const userAgent = request.headers.get('user-agent') ?? ''
  const isBlockedUA = BLOCKED_UA_PATTERNS.some((pattern) => pattern.test(userAgent))

  if (isBlockedUA) {
    return new NextResponse(null, { status: 403 })
  }

  // ── 2. Block path traversal and common exploit probes ────────────────────
  const probePatterns = [
    /\.\.[/\\]/, // directory traversal
    /\.(env|git|svn|htaccess|htpasswd|DS_Store)/i, // sensitive files
    /(wp-admin|wp-login|phpMyAdmin|phpmyadmin|admin\.php)/i, // WordPress/PHP probes
    /\.(php|asp|aspx|jsp|cgi|pl|sh|bash)$/i, // server-side script probes
    /<script/i, // XSS in URL
    /(%3C|%3E|%27|%22)/i, // encoded HTML/XSS chars
    /(union.*select|select.*from|insert.*into|drop.*table)/i, // SQL injection
  ]

  const isProbe = probePatterns.some((p) => p.test(pathname))
  if (isProbe) {
    return new NextResponse(null, { status: 404 })
  }

  // ── 3. Rate limiting (Redis-backed, globally consistent) ─────────────────
  const isApi = pathname.startsWith('/api/')
  const rateLimited = await isRateLimited(ip, isApi)

  if (rateLimited) {
    return new NextResponse(JSON.stringify({ error: 'Too many requests.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '60',
      },
    })
  }

  // ── 4. Security response headers ─────────────────────────────────────────
  const response = NextResponse.next()

  response.headers.set('X-Request-ID', crypto.randomUUID())
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')

  response.headers.delete('Server')
  response.headers.delete('X-Powered-By')

  return response
}

// ─── Matcher ────────────────────────────────────────────────────────────────
// Apply middleware to all routes except:
// - Next.js internals (_next/static, _next/image)
// - Static files (favicon, public assets)
// - Sanity Studio (/studio/*) — Studio has its own auth, skip our bot filter
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/|studio).*)'],
}
