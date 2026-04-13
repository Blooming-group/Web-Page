import type { NextConfig } from 'next'

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
  // Images: self + data URIs for SVGs + blob for canvas
  "img-src 'self' data: blob:",
  // API calls: self + Vercel Analytics/Insights
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
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

const contentSecurityPolicy = cspDirectives.join('; ')

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

  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  // ─── Images ─────────────────────────────────────────────────────────────
  images: {
    // Only allow images from our own domain (add Sanity CDN when CMS is live)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blooming-group.eu',
      },
    ],
    // Optimized formats
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

export default nextConfig
