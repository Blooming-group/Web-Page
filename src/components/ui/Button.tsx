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

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm tracking-wide',
  md: 'px-6 py-3 text-sm tracking-wide',
  lg: 'px-8 py-4 text-base tracking-wide',
}

/**
 * Button with cursor-aware gradient fill.
 *
 * Primary: a radial gradient follows the cursor position within the button,
 * shifting the green from flat → luminous. Adds a soft glow shadow on hover.
 *
 * Outline: a subtle radial highlight sweeps from the cursor position and
 * brightens the border and interior.
 *
 * These effects work via React state (mouse position) — no CSS-only hacks.
 * For magnetic attraction on top of this, wrap with <MagneticWrapper>.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      asChild = false,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const [pos, setPos] = React.useState({ x: 50, y: 50 })
    const [hovered, setHovered] = React.useState(false)

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
        onMouseMove?.(e)
      },
      [onMouseMove]
    )

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
        setPos({ x: 50, y: 50 })
        onMouseLeave?.(e)
      },
      [onMouseLeave]
    )

    // Dynamic style based on cursor position
    const dynamicStyle = React.useMemo((): React.CSSProperties => {
      if (variant === 'primary' && hovered) {
        return {
          backgroundImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, #6aaa98 0%, #4a7c6f 52%, #3d6a5e 100%)`,
          boxShadow: '0 4px 28px rgba(74,124,111,0.38), 0 0 0 1px rgba(74,124,111,0.18)',
        }
      }
      if (variant === 'primary' && !hovered) {
        return {
          backgroundImage: 'none',
          backgroundColor: 'var(--color-accent-primary)',
        }
      }
      if (variant === 'outline' && hovered) {
        return {
          backgroundImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(74,124,111,0.14) 0%, transparent 55%)`,
          borderColor: 'rgba(74,124,111,0.7)',
          boxShadow: '0 0 20px rgba(74,124,111,0.14), inset 0 0 16px rgba(74,124,111,0.06)',
        }
      }
      return {}
    }, [variant, hovered, pos.x, pos.y])

    const variantBase: Record<ButtonVariant, string> = {
      primary: cn(
        'bg-accent-primary text-ivory border border-transparent',
        'transition-[box-shadow,background-image] duration-300'
      ),
      outline: cn(
        'bg-transparent text-ivory',
        'border border-[--color-border-accent]',
        'transition-[border-color,box-shadow,background-image] duration-300'
      ),
      ghost: cn(
        'bg-transparent text-mid border border-transparent',
        'hover:text-ivory transition-colors duration-200'
      ),
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-medium',
          'cursor-pointer select-none',
          'disabled:pointer-events-none disabled:opacity-40',
          'focus-visible:outline-accent-primary focus-visible:outline-2 focus-visible:outline-offset-2',
          variantBase[variant],
          sizeStyles[size],
          className
        )}
        style={{ ...dynamicStyle, ...style }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
export { Button }
export type { ButtonProps }
