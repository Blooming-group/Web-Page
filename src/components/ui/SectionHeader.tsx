import * as React from 'react'
import { cn } from '@/lib/utils'
import { H2 } from '@/components/ui/Typography'

export function SectionHeader({
  overline,
  title,
  action,
  id,
  className,
}: {
  overline?: string
  title: string
  action?: React.ReactNode
  id?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className="max-w-xl">
        {overline && <p className="type-overline mb-6">{overline}</p>}
        <H2 id={id}>{title}</H2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
