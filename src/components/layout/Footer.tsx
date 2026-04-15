'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Separator } from '@/components/ui/Separator'
import { BloomingMarkAnimated } from '@/components/ui/BloomingMarkAnimated'
import { ParticleField } from '@/components/sections/ParticleField'

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Work', href: '/work' },
  { label: 'Thinking', href: '/thinking' },
  { label: 'The Diagnostic', href: '/diagnostic' },
  { label: 'Contact', href: '/contact' },
]

const serviceLinks = [
  { label: 'Web Design & Development', href: '/services#web' },
  { label: 'Process Automation', href: '/services#process-automation' },
  { label: 'Communications Automation', href: '/services#communications-automation' },
  { label: 'AI Chatbots', href: '/services#ai-chatbots' },
  { label: 'AI Agents', href: '/services#ai-agents' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden border-t border-[--color-border-default]"
      aria-label="Site footer"
    >
      {/* ── Particle background ─────────────────────────── */}
      <ParticleField mode="background" variant="footer" />

      <Container className="relative z-10">
        {/* ── Hero row: display wordmark + animated logo ── */}
        <div className="flex flex-col gap-10 pt-20 pb-14 md:flex-row md:items-start md:justify-between">
          {/* Left: large wordmark + tagline + social */}
          <div>
            <h2
              className="mb-5 leading-none font-light tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(3.2rem, 8vw, 7rem)',
                color: 'var(--color-ivory)',
              }}
            >
              BLOOMING
            </h2>
            <p className="mb-1 text-sm leading-relaxed" style={{ color: 'var(--color-mid)' }}>
              Strategic thinking. Real technology.
            </p>
            <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-mid)' }}>
              European mid-market.
            </p>
            <a
              href="https://linkedin.com/company/blooming-group"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-80"
              style={{ color: 'var(--color-mid)' }}
              aria-label="Blooming Group on LinkedIn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          {/* Right: animated logomark */}
          <div className="flex-shrink-0 self-start md:self-center">
            <BloomingMarkAnimated size={160} />
          </div>
        </div>

        <Separator />

        {/* ── Navigation links ────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-3">
          {/* Company */}
          <div>
            <p
              className="mb-5 text-xs font-medium tracking-[0.12em] uppercase"
              style={{ color: 'var(--color-mid)' }}
            >
              Company
            </p>
            <ul className="space-y-3" role="list">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-mid hover:text-ivory text-sm tracking-wide transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <p
              className="mb-5 text-xs font-medium tracking-[0.12em] uppercase"
              style={{ color: 'var(--color-mid)' }}
            >
              Capabilities
            </p>
            <ul className="space-y-3" role="list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-mid hover:text-ivory text-sm tracking-wide transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get started */}
          <div>
            <p
              className="mb-5 text-xs font-medium tracking-[0.12em] uppercase"
              style={{ color: 'var(--color-mid)' }}
            >
              Get started
            </p>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--color-mid)' }}>
              The diagnostic session is free. 45 minutes. No pitch.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              Book a session →
            </Link>
          </div>
        </div>

        <Separator />

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className="flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs tracking-wide" style={{ color: 'var(--color-mid)' }}>
            © {currentYear} Blooming Group. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-mid hover:text-ivory text-xs tracking-wide transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/manifesto"
              className="text-mid hover:text-ivory text-xs tracking-wide transition-colors duration-200"
            >
              Manifesto
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
