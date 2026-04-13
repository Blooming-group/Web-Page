import * as React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  size?: 'default' | 'narrow' | 'wide'
}

const sizeMap = {
  default: 'max-w-7xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-screen-2xl',
}

function Container({
  as: Tag = 'div',
  size = 'default',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeMap[size], className)} {...props}>
      {children}
    </Tag>
  )
}

export { Container }
export type { ContainerProps }
