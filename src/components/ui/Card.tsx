import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

function Card({ className, hoverable = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-sm border border-[--color-border-default]',
        'bg-white/[0.02] p-6',
        hoverable && [
          'transition-colors duration-300',
          'hover:border-[--color-border-accent]',
          'hover:bg-white/[0.04]',
          'cursor-pointer',
        ],
        className
      )}
      {...props}
    >
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
