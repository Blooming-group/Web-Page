'use client'

import { motion } from 'framer-motion'

const items = [
  'Strategy',
  'Execution',
  'Web',
  'Process Automation',
  'AI Agents',
  'Communications',
  'Mid-market',
  'Clarity',
  'Technology',
  'Results',
  'Dense Intelligence',
  'AI Chatbots',
  'Precision',
  'Architecture',
]

// Duplicate for seamless loop
const allItems = [...items, ...items]

export function Marquee() {
  return (
    <div
      className="relative overflow-hidden border-y border-[--color-border-default] py-4"
      aria-hidden="true"
    >
      {/* Left fade */}
      <div className="from-base pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r to-transparent" />
      {/* Right fade */}
      <div className="from-base pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l to-transparent" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.15em] uppercase"
            style={{ color: 'var(--color-mid)' }}
          >
            <span
              className="inline-block h-px w-4 shrink-0"
              style={{ background: 'var(--color-accent-primary)', opacity: 0.5 }}
            />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
