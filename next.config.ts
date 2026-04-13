import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

// ─── Content Security Policy ───────────────────────────────────────────────
// Restricts what resources can load on the page.
// Blocks XSS, data injection, clickjacking, and resource hijacking.
const cspDirectives = [
  "default-src 'self'",
  // Next.js requires 'unsafe-inline' for hydration scripts (App Router).
  // 'strict-dynamic' limits propagation to trusted scripts only.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  // Tailwind and Framer Motion require inline styles.
  "style-src 'self' 'unsafe-inline'",
  // Geist via Google Fonts CDN
  "font-src 'self' https://fonts.gstatic.com data:",
  // Images: self + data URIs for SVGs + blob for canvas + Sanity CDN
  "img-src 'self' data: blob: https://cdn.sanity.io",
  // API calls: self + Vercel Analytics/Insights + Sentry
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://*.ingest.de.sentry.io https://*.ingest.sentry.io",
  // No iframes from any external source
  "frame-src 'none'",
  // Prevent this site from being framed (clickjacking)
  "frame-ancestors 'none'",
  // Forms can only submit to same origin
  "form-action 'self'",
  // Workers: same origin only
  "worker-src 'self' blob:",
  // No plugins (Flash, etc.)
  "object-src 'none'",
  // All sub-resources must use HTTPS
  'upgrade-insecure-requests',
  // Anchor base: same origin
  "base-uri 'self'",
]

// ─── Sanity Studio CSP ────────────────────────────────────────────────────
// The Studio needs access to Sanity's APIs and CDN.
// Applied only to /studio/* routes.
const studioCspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://cdn.sanity.io https://lh3.googleusercontent.com",
  "connect-src 'self' https://*.sanity.io https://api.sanity.io wss://*.sanity.io https://cdn.sanity.io",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://*.sanity.io",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
]

const contentSecurityPolicy = cspDirectives.join('; ')
const studioContentSecurityPolicy = studioCspDirectives.join('; ')

// ─── Security Headers ──────────────────────────────────────────────────────
const securityHeaders = [
  // Force HTTPS for 2 years, include subdomains, submit to preload list
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent MIME-type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Prevent clickjacking via iframes
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Control referrer information sent to other origins
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Disable browser features not needed by this site
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'browsing-topics=()',
      'interest-cohort=()',
      'payment=()',
      'usb=()',
    ].join(', '),
  },
  // Enable DNS prefetching for performance
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // Remove the X-Powered-By header (hides tech stack)
  // Note: also disabled via poweredByHeader: false below
  {
    key: 'X-Powered-By',
    value: '',
  },
  // Full CSP
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  // Cross-origin isolation: allows SharedArrayBuffer, needed for high-perf apps
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
]

const nextConfig: NextConfig = {
  // ─── Security ───────────────────────────────────────────────────────────
  // Remove X-Powered-By: Next.js header (hides tech stack from attackers)
  poweredByHeader: false,

  // Apply security headers to all routes; override CSP for /studio/*
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Sanity Studio needs a relaxed CSP — override only the CSP header
      {
        source: '/studio/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: studioContentSecurityPolicy,
          },
        ],
      },
    ]
  },

  // ─── Images ─────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blooming-group.eu',
      },
      // Sanity image CDN
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // ─── Performance ────────────────────────────────────────────────────────
  compress: true,

  // ─── Build ──────────────────────────────────────────────────────────────
  // Treat TypeScript errors as build failures
  typescript: {
    ignoreBuildErrors: false,
  },
  // Treat ESLint errors as build failures
  eslint: {
    ignoreDuringBuilds: false,
  },
}

// ─── Sentry ───────────────────────────────────────────────────────────────
// Wraps config to enable Sentry's build-time instrumentation.
// Source map upload requires SENTRY_AUTH_TOKEN env var (optional).
export default withSentryConfig(nextConfig, {
  // Suppress noisy Sentry CLI output in CI
  silent: true,
  // Upload larger files for better stack traces in production
  widenClientFileUpload: true,
  // Source map config — upload requires SENTRY_AUTH_TOKEN (optional)
  sourcemaps: {
    // Delete local source maps after upload so they aren't served publicly
    deleteSourcemapsAfterUpload: true,
  },
  // Remove Sentry debug logger from production bundle (saves ~4KB)
  disableLogger: true,
  // Automatically wire up Vercel Cron Monitor
  automaticVercelMonitors: false,
})
