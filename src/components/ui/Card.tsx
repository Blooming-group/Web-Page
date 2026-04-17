import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

function Card({ className, hoverable = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm border p-6',
        hoverable
          ? 'card-interactive group cursor-pointer'
          : 'border-[--card-border-default] bg-white/[0.02]',
        className
      )}
      {...props}
    >
      {hoverable && (
        <span
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-[--duration-short] group-hover:scale-x-100"
          style={{ background: 'var(--card-topline-color)' }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  )
}

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn('mb-4 flex items-start gap-3', className)} {...props}>
      {children}
    </div>
  )
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>
function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardContent }
