import { cn } from '@/lib/utils'

interface BloomingMarkProps {
  /** Rendered size in pixels (width = height). Default: 40 */
  size?: number
  /** Show dark background rect — use when rendering on non-dark surfaces */
  withBackground?: boolean
  className?: string
}

/**
 * Blooming Group logomark — the 4-ellipse orbital with concentric sun core.
 *
 * By default renders transparent (no background rect) — the parent container
 * provides the background. Pass `withBackground` to include the #09090E rect,
 * which is useful for OG images, favicons embedded in light contexts, etc.
 *
 * Viewbox is 220×220; component scales uniformly via width/height props.
 */
export function BloomingMark({ size = 40, withBackground = false, className }: BloomingMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      {withBackground && <rect width="220" height="220" fill="#09090E" />}

      <g transform="translate(110,110)">
        {/* 4 ivory ellipses — orbital rings at 0° / 45° / 90° / 135° */}
        <g transform="rotate(0)">
          <path
            d="M 34,-20.3 A 88,22 0 0,1 34,20.3"
            fill="none"
            stroke="#F2EEE6"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M -34,20.3 A 88,22 0 0,1 -34,-20.3"
            fill="none"
            stroke="#F2EEE6"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
        <g transform="rotate(45)">
          <path
            d="M 34,-20.3 A 88,22 0 0,1 34,20.3"
            fill="none"
            stroke="#F2EEE6"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M -34,20.3 A 88,22 0 0,1 -34,-20.3"
            fill="none"
            stroke="#F2EEE6"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
        <g transform="rotate(90)">
          <path
            d="M 34,-20.3 A 88,22 0 0,1 34,20.3"
            fill="none"
            stroke="#F2EEE6"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M -34,20.3 A 88,22 0 0,1 -34,-20.3"
            fill="none"
            stroke="#F2EEE6"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
        <g transform="rotate(135)">
          <path
            d="M 34,-20.3 A 88,22 0 0,1 34,20.3"
            fill="none"
            stroke="#F2EEE6"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M -34,20.3 A 88,22 0 0,1 -34,-20.3"
            fill="none"
            stroke="#F2EEE6"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>

        {/* Sun — clean base, then concentric gold/green circles */}
        <circle cx="0" cy="0" r="33" fill="#09090E" />
        <circle
          cx="0"
          cy="0"
          r="28"
          fill="#C8A96E"
          fillOpacity="0.08"
          stroke="#4A7C6F"
          strokeWidth="1.1"
        />
        <circle
          cx="0"
          cy="0"
          r="22"
          fill="#C8A96E"
          fillOpacity="0.18"
          stroke="#4A7C6F"
          strokeWidth="1.4"
        />
        <circle
          cx="0"
          cy="0"
          r="16"
          fill="#C8A96E"
          fillOpacity="0.38"
          stroke="#4A7C6F"
          strokeWidth="1.7"
        />
        <circle
          cx="0"
          cy="0"
          r="10"
          fill="#C8A96E"
          fillOpacity="0.72"
          stroke="#4A7C6F"
          strokeWidth="1.2"
        />
        <circle cx="0" cy="0" r="5.5" fill="#C8A96E" />
      </g>
    </svg>
  )
}
