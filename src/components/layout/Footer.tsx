import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Separator } from '@/components/ui/Separator'
import { BloomingMark } from '@/components/ui/BloomingMark'

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
      className="border-t border-[--color-border-default] pt-16 pb-10"
      aria-label="Site footer"
    >
      <Container>
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {/* Logomark + wordmark + tagline + social */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="mb-5 flex items-center gap-2 transition-opacity hover:opacity-75"
              aria-label="Blooming Group — Home"
            >
              <BloomingMark size={24} />
              <span
                className="text-sm font-semibold tracking-[0.2em]"
                style={{ color: 'var(--color-ivory)' }}
                aria-hidden="true"
              >
                BLOOMING
              </span>
            </Link>
            <p className="mb-6 text-xs leading-relaxed" style={{ color: 'var(--color-mid)' }}>
              Strategic thinking. Real technology.
              <br />
              European mid-market.
            </p>
            <a
              href="https://linkedin.com/company/blooming-group"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'var(--color-mid)' }}
              aria-label="Blooming Group on LinkedIn"
            >
              <svg
                width="16"
                height="16"
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

          {/* Start CTA */}
          <div>
            <p
              className="mb-4 text-xs font-medium tracking-[0.12em] uppercase"
              style={{ color: 'var(--color-mid)' }}
            >
              Get started
            </p>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--color-mid)' }}>
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

        <Separator className="my-10" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
