'use client'

import { cn } from '@/lib/utils'

export function StickyMetadata({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn('hidden xl:sticky xl:top-28 xl:block xl:self-start', className)}
      aria-label="Article metadata"
    >
      <div className="space-y-4">{children}</div>
    </aside>
  )
}
