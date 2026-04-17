import * as React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'highlight'
}

function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        'border px-3 py-1',
        'text-xs font-semibold tracking-[0.12em] uppercase',
        variant === 'default' && ['border-[--color-border-accent]', 'text-accent-primary'],
        variant === 'highlight' && [
          'border-[--color-accent-secondary]/30',
          'text-[--color-accent-secondary]',
        ],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
export type { BadgeProps }
