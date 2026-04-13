import * as React from 'react'
import { cn } from '@/lib/utils'

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
}

function Separator({ className, orientation = 'horizontal', ...props }: SeparatorProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'border-0',
        orientation === 'horizontal'
          ? 'h-px w-full bg-[--color-border-default]'
          : 'h-full w-px bg-[--color-border-default]',
        className
      )}
      {...props}
    />
  )
}

export { Separator }
