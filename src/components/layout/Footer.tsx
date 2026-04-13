import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Separator } from '@/components/ui/Separator'

const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[--color-border-default] py-12" aria-label="Site footer">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-ivory text-sm font-[var(--font-geist)] font-semibold tracking-[0.2em] transition-opacity hover:opacity-70"
            aria-label="Blooming Group — Home"
          >
            BLOOMING
          </Link>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6" role="list">
              {footerLinks.map((link) => (
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
          </nav>

          {/* Social */}
          <a
            href="https://linkedin.com/company/blooming-group"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mid hover:text-ivory transition-colors duration-200"
            aria-label="Blooming Group on LinkedIn"
          >
            {/* LinkedIn SVG — not in lucide-react */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-mid text-xs tracking-wide">
            © {currentYear} Blooming Group. All rights reserved.
          </p>
          <p className="text-mid text-xs tracking-wide">blooming-group.eu</p>
        </div>
      </Container>
    </footer>
  )
}
