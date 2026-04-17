'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0)
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 h-[2px] origin-left"
      style={{
        backgroundColor: 'var(--color-accent-primary)',
        scaleX: progress,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0.01 ? 1 : 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }}
    />
  )
}
