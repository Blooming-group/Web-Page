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

const SWEEP_BG: Record<'primary' | 'outline', string> = {
  primary: 'linear-gradient(to top, #c8a96e 0%, #d4be8a 100%)',
  outline: 'linear-gradient(to top, rgba(74,124,111,0.28) 0%, rgba(74,124,111,0.08) 100%)',
}

const SWEEP_EASE = [0.76, 0, 0.24, 1] as const

/**
 * Button with rounded corners and a bottom-to-top fill sweep on hover.
 *
 * Works for both plain <Button> and <Button asChild><Link>.
 * When asChild is used, the sweep is injected into the Link's children via
 * React.cloneElement so Radix Slot receives a single merged element while
 * the animation still works correctly.
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

    const baseClass = cn(
      'inline-flex items-center justify-center',
      'relative overflow-hidden rounded-xl',
      'font-medium',
      'cursor-pointer select-none',
      'disabled:pointer-events-none disabled:opacity-40',
      'focus-visible:outline-accent-primary focus-visible:outline-2 focus-visible:outline-offset-2',
      variantBase[variant],
      sizeStyles[size],
      className
    )

    const hasSweep = variant === 'primary' || variant === 'outline'

    // The animated sweep + content layer, wrapping innerChildren
    const sweepContent = (innerChildren: React.ReactNode) => (
      <>
        <motion.span
          className="pointer-events-none absolute inset-0 origin-bottom"
          aria-hidden="true"
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.52, ease: SWEEP_EASE }}
          style={{ background: SWEEP_BG[variant as 'primary' | 'outline'] }}
        />
        <span
          className="relative z-10 inline-flex items-center gap-2 transition-colors duration-500"
          style={{
            color: variant === 'primary' && hovered ? 'var(--color-base)' : undefined,
          }}
        >
          {innerChildren}
        </span>
      </>
    )

    // Decide what to render as children of Comp
    let renderedChildren: React.ReactNode

    if (hasSweep) {
      if (asChild && React.isValidElement(children)) {
        // Inject sweep inside the child element so Slot gets a single merged node.
        // cloneElement replaces the child's children with sweep + content wrapper.
        const child = children as React.ReactElement<{ children?: React.ReactNode }>
        renderedChildren = React.cloneElement(child, {}, sweepContent(child.props.children))
      } else {
        renderedChildren = sweepContent(children)
      }
    } else {
      // ghost — no sweep, just a gap wrapper
      renderedChildren = <span className="inline-flex items-center gap-2">{children}</span>
    }

    return (
      <Comp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={baseClass}
        style={{ ...dynamicStyle, ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {renderedChildren}
      </Comp>
    )
  }
)

Button.displayName = 'Button'
export { Button }
export type { ButtonProps }
