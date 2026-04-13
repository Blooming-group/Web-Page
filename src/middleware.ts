import { NextResponse, type NextRequest } from 'next/server'

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
  /curl\/[0-9]/i, // raw curl (automated probing) — NOTE: remove if you use curl in legit workflows
  /libwww-perl/i,
  /jakarta/i,
  /winhttp/i,
]

// ─── Rate limiting (edge, in-memory) ──────────────────────────────────────
// Per-IP request counter. Resets on cold start.
// Vercel runs multiple edge instances — use Upstash/Redis for global limits at scale.
const requestCounts = new Map<string, { count: number; resetAt: number }>()
const RATE_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_GENERAL = 120 // requests/min for normal pages
const RATE_LIMIT_API = 20 // requests/min for API routes

function getRateLimit(pathname: string): number {
  if (pathname.startsWith('/api/')) return RATE_LIMIT_API
  return RATE_LIMIT_GENERAL
}

function isRateLimited(ip: string, pathname: string): boolean {
  const now = Date.now()
  const key = `${ip}:${pathname.startsWith('/api/') ? 'api' : 'page'}`
  const record = requestCounts.get(key)
  const limit = getRateLimit(pathname)

  if (!record || now > record.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  if (record.count >= limit) return true
  record.count++
  return false
}

// ─── Middleware ─────────────────────────────────────────────────────────────
export function middleware(request: NextRequest) {
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

  // ── 3. Rate limiting ──────────────────────────────────────────────────────
  if (isRateLimited(ip, pathname)) {
    return new NextResponse(JSON.stringify({ error: 'Too many requests.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '60',
      },
    })
  }

  // ── 4. Security response headers ─────────────────────────────────────────
  // These supplement the headers set in next.config.ts.
  // Middleware headers are applied at the edge, before the response body is built.
  const response = NextResponse.next()

  response.headers.set('X-Request-ID', crypto.randomUUID())
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')

  // Remove headers that leak server info
  response.headers.delete('Server')
  response.headers.delete('X-Powered-By')

  return response
}

// ─── Matcher ────────────────────────────────────────────────────────────────
// Apply middleware to all routes except Next.js internals and static files.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
}
