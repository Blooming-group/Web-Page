'use client'

import { cn } from '@/lib/utils'

export function DropCap({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'type-body first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:text-[length:var(--font-size-drop-cap)] first-letter:leading-[0.8] first-letter:font-light first-letter:text-[--color-ivory]',
        className
      )}
    >
      {children}
    </p>
  )
}
