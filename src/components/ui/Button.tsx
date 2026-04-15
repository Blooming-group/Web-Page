'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm tracking-wide',
  md: 'px-6 py-3 text-sm tracking-wide',
  lg: 'px-8 py-4 text-base tracking-wide',
}

// Fill that sweeps bottom → top on hover
const SWEEP_BG: Record<'primary' | 'outline', string> = {
  primary: 'linear-gradient(to top, #c8a96e 0%, #d4be8a 100%)',
  outline: 'linear-gradient(to top, rgba(74,124,111,0.28) 0%, rgba(74,124,111,0.08) 100%)',
}

// Cubic-bezier matching Cuberto's fluid feel
const SWEEP_EASE = [0.76, 0, 0.24, 1] as const

/**
 * Button with rounded corners and a bottom-to-top fill sweep on hover.
 *
 * Primary: green base, gold sweep rises from bottom. Text transitions
 * ivory → dark as gold fills the button, matching the fill speed.
 *
 * Outline: transparent base, subtle green tint sweeps up on hover.
 *
 * Ghost: simple color transition, no sweep.
 *
 * For magnetic attraction wrap with <MagneticWrapper> from
 * @/components/ui/MagneticWrapper.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      asChild = false,
      children,
      onMouseEnter,
      onMouseLeave,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const [hovered, setHovered] = React.useState(false)

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setHovered(true)
        onMouseEnter?.(e)
      },
      [onMouseEnter]
    )

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setHovered(false)
        onMouseLeave?.(e)
      },
      [onMouseLeave]
    )

    const dynamicStyle = React.useMemo((): React.CSSProperties => {
      if (variant === 'primary') {
        return {
          backgroundColor: 'var(--color-accent-primary)',
          boxShadow: hovered
            ? '0 8px 36px rgba(200,169,110,0.35), 0 0 0 1px rgba(200,169,110,0.18)'
            : '0 2px 8px rgba(74,124,111,0.18)',
          transform: hovered ? 'scale(1.025)' : 'scale(1)',
          transition: 'box-shadow 0.38s ease, transform 0.38s ease',
        }
      }
      if (variant === 'outline') {
        return {
          borderColor: hovered ? 'rgba(74,124,111,0.85)' : undefined,
          transform: hovered ? 'scale(1.015)' : 'scale(1)',
          transition: 'border-color 0.3s ease, transform 0.38s ease',
        }
      }
      return {}
    }, [variant, hovered])

    const variantBase: Record<ButtonVariant, string> = {
      primary: 'bg-accent-primary text-ivory border border-transparent',
      outline: 'bg-transparent text-ivory border border-[--color-border-accent]',
      ghost:
        'bg-transparent text-mid border border-transparent hover:text-ivory transition-colors duration-200',
    }

    // Sweep only applies to non-asChild primary/outline
    const hasSweep = !asChild && variant !== 'ghost'

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center',
          'relative overflow-hidden rounded-xl',
          'font-medium',
          'cursor-pointer select-none',
          'disabled:pointer-events-none disabled:opacity-40',
          'focus-visible:outline-accent-primary focus-visible:outline-2 focus-visible:outline-offset-2',
          variantBase[variant],
          sizeStyles[size],
          className
        )}
        style={{ ...dynamicStyle, ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {hasSweep ? (
          <>
            {/* ── Sweep fill — rises from bottom ── */}
            <motion.span
              className="pointer-events-none absolute inset-0 origin-bottom"
              aria-hidden="true"
              animate={{ scaleY: hovered ? 1 : 0 }}
              transition={{ duration: 0.52, ease: SWEEP_EASE }}
              style={{ background: SWEEP_BG[variant as 'primary' | 'outline'] }}
            />
            {/* ── Content above sweep ── */}
            <span
              className="relative z-10 inline-flex items-center gap-2 transition-colors duration-500"
              style={{
                color: variant === 'primary' && hovered ? 'var(--color-base)' : undefined,
              }}
            >
              {children}
            </span>
          </>
        ) : (
          <span className="inline-flex items-center gap-2">{children}</span>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'
export { Button }
export type { ButtonProps }
