'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-accent-primary text-ivory',
    'hover:bg-[#5a9080]',
    'border border-transparent',
    'transition-colors duration-200',
  ].join(' '),
  outline: [
    'bg-transparent text-ivory',
    'border border-[--color-border-accent]',
    'hover:border-accent-primary hover:text-ivory',
    'transition-colors duration-200',
  ].join(' '),
  ghost: [
    'bg-transparent text-mid border border-transparent',
    'hover:text-ivory',
    'transition-colors duration-200',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm tracking-wide',
  md: 'px-6 py-3 text-sm tracking-wide',
  lg: 'px-8 py-4 text-base tracking-wide',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-[var(--font-geist)] font-medium',
          'cursor-pointer select-none',
          'disabled:pointer-events-none disabled:opacity-40',
          'focus-visible:outline-accent-primary focus-visible:outline-2 focus-visible:outline-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
