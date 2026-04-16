'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Separator } from '@/components/ui/Separator'
import { BloomingMarkAnimated } from '@/components/ui/BloomingMarkAnimated'
import { ParticleField } from '@/components/sections/ParticleField'

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Thinking', href: '/thinking' },
  { label: 'The Diagnostic', href: '/diagnostic' },
  { label: 'Contact', href: '/contact' },
]

const serviceLinks = [
  { label: 'Web Development', href: '/services#web' },
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
      style={{ background: 'var(--color-base)' }}
    >
      {/* ── Particle background ─────────────────────────── */}
      <ParticleField mode="background" variant="footer" />

      <Container className="relative z-10">
        {/*
         * ── Main grid ────────────────────────────────────
         * Desktop: [Brand + Nav (1fr)] [Logo (auto)]
         * All columns top-aligned (items-start)
         */}
        <div className="grid grid-cols-1 items-start gap-y-16 pt-24 pb-20 md:grid-cols-[1fr_auto] md:gap-x-20">
          {/* ── Left: Brand + Nav ── */}
          <div>
            {/* Brand block */}
            <div className="mb-14">
              <h2
                className="mb-4 leading-none font-light tracking-[-0.02em]"
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 4.2rem)',
                  color: 'var(--color-ivory)',
                }}
              >
                BLOOMING
              </h2>
              <p className="mb-1 text-sm leading-relaxed" style={{ color: 'var(--color-mid)' }}>
                Dense Intelligence.
              </p>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-mid)' }}>
                Strategy and technology as one.
              </p>
              <a
                href="https://linkedin.com/company/blooming-group"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-200 hover:opacity-80"
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

            {/* ── Nav columns ── */}
            <div className="flex flex-wrap gap-10 md:gap-14">
              {/* Company */}
              <div>
                <p
                  className="mb-4 text-xs font-medium tracking-[0.12em] uppercase"
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
                  className="mb-4 text-xs font-medium tracking-[0.12em] uppercase"
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
                  className="mb-4 text-xs font-medium tracking-[0.12em] uppercase"
                  style={{ color: 'var(--color-mid)' }}
                >
                  Get started
                </p>
                <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--color-mid)' }}>
                  45-min diagnostic.
                  <br />
                  No pitch. No obligation.
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
          </div>

          {/* ── Right: Logo — top-aligned ── */}
          <div className="hidden md:flex md:items-start md:pt-1">
            <BloomingMarkAnimated size={240} />
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
