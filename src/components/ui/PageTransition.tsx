'use client'

import { useEffect, useState, useCallback, createContext, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { BloomingMark } from '@/components/ui/BloomingMark'

const DURATION = 0.64
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

type TransitionContextType = {
  startTransition: (href: string) => void
}

const TransitionContext = createContext<TransitionContextType>({
  startTransition: () => {},
})

export function usePageTransition() {
  return useContext(TransitionContext)
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [pendingHref, setPendingHref] = useState<string | null>(null)

  const startTransition = useCallback(
    (href: string) => {
      if (href === pathname || prefersReduced) {
        router.push(href)
        return
      }
      setPendingHref(href)
      setIsOverlayVisible(true)
    },
    [pathname, router, prefersReduced]
  )

  useEffect(() => {
    if (!isOverlayVisible || !pendingHref) return

    const timer = setTimeout(() => {
      router.push(pendingHref)
      setPendingHref(null)
    }, DURATION * 600)

    return () => clearTimeout(timer)
  }, [isOverlayVisible, pendingHref, router])

  useEffect(() => {
    if (isOverlayVisible && !pendingHref) {
      const timer = setTimeout(() => {
        setIsOverlayVisible(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [pathname, isOverlayVisible, pendingHref])

  useEffect(() => {
    if (prefersReduced) return

    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
        return
      }
      if (link.hasAttribute('download') || link.getAttribute('target') === '_blank') return
      if (e.metaKey || e.ctrlKey || e.shiftKey) return
      if (href === pathname) return

      e.preventDefault()
      startTransition(href)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname, startTransition, prefersReduced])

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}
      <AnimatePresence>
        {isOverlayVisible && (
          <motion.div
            key="page-transition-overlay"
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-base)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION * 0.5, ease: EASE }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: DURATION * 0.4, delay: 0.08, ease: EASE }}
            >
              <BloomingMark size={56} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}
