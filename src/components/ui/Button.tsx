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
 * Button with a cursor-tracking gold spotlight effect.
 *
 * Primary: a gold radial blob follows the cursor inside the button,
 * creating a "backlit" spotlight on the green surface. At cursor center
 * it reaches 55% gold opacity — visible and alive, not subtle.
 * Slight scale on hover amplifies the physical feeling.
 *
 * Outline: a green glow radiates from the cursor position inside the border.
 *
 * For the magnetic attraction effect (Cuberto-style), wrap with
 * <MagneticWrapper> from @/components/ui/MagneticWrapper.
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

    const dynamicStyle = React.useMemo((): React.CSSProperties => {
      if (variant === 'primary') {
        if (hovered) {
          return {
            // Gold spotlight at cursor + green base
            backgroundImage: [
              `radial-gradient(circle 90px at ${pos.x}% ${pos.y}%,`,
              `  rgba(200,169,110,0.55) 0%,`,
              `  rgba(200,169,110,0.18) 45%,`,
              `  transparent 75%`,
              `)`,
            ].join(' '),
            backgroundColor: 'var(--color-accent-primary)',
            boxShadow: ['0 6px 32px rgba(74,124,111,0.45)', '0 0 0 1px rgba(74,124,111,0.25)'].join(
              ', '
            ),
            transform: 'scale(1.03)',
          }
        }
        return {
          backgroundImage: 'none',
          backgroundColor: 'var(--color-accent-primary)',
          transform: 'scale(1)',
        }
      }

      if (variant === 'outline') {
        if (hovered) {
          return {
            backgroundImage: `radial-gradient(circle 80px at ${pos.x}% ${pos.y}%, rgba(74,124,111,0.18) 0%, transparent 65%)`,
            borderColor: 'rgba(74,124,111,0.85)',
            boxShadow: '0 0 24px rgba(74,124,111,0.18), inset 0 0 20px rgba(74,124,111,0.07)',
            transform: 'scale(1.02)',
          }
        }
        return { transform: 'scale(1)' }
      }

      return {}
    }, [variant, hovered, pos.x, pos.y])

    const variantBase: Record<ButtonVariant, string> = {
      primary: cn(
        'bg-accent-primary text-ivory border border-transparent',
        'transition-[box-shadow,background-image,transform] duration-250'
      ),
      outline: cn(
        'bg-transparent text-ivory',
        'border border-[--color-border-accent]',
        'transition-[border-color,box-shadow,background-image,transform] duration-250'
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
