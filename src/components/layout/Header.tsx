'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Thinking', href: '/thinking' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50',
          'transition-all duration-300',
          scrolled
            ? 'border-b border-[--color-border-default] bg-[--color-base]/90 backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between md:h-20"
            aria-label="Main navigation"
          >
            {/* Wordmark */}
            <Link
              href="/"
              className="text-ivory text-base font-[var(--font-geist)] font-semibold tracking-[0.2em] transition-opacity hover:opacity-70"
              aria-label="Blooming Group — Home"
            >
              BLOOMING
            </Link>

            {/* Desktop nav */}
            <ul className="hidden items-center gap-8 md:flex" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm tracking-wide transition-colors duration-200',
                      pathname === link.href ? 'text-ivory' : 'text-mid hover:text-ivory'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Start conversation</Link>
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="text-mid hover:text-ivory flex items-center justify-center transition-colors md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-base fixed inset-0 z-40 flex flex-col md:hidden"
            aria-modal="true"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <Container className="flex flex-1 flex-col justify-center">
              <motion.ul
                className="flex flex-col gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.07 } },
                }}
                role="list"
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={link.href}
                      className="type-h2 text-ivory hover:text-accent-primary block transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                <Button size="lg" asChild>
                  <Link href="/contact">Start conversation</Link>
                </Button>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
