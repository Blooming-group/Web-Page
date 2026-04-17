import Image from 'next/image'
import { cn } from '@/lib/utils'

type EditorialVariant = 'bleed' | 'contained'

export function EditorialImage({
  src,
  alt,
  caption,
  variant = 'contained',
  priority = false,
  className,
}: {
  src: string
  alt: string
  caption?: string
  variant?: EditorialVariant
  priority?: boolean
  className?: string
}) {
  return (
    <figure
      className={cn(
        variant === 'bleed'
          ? '-mx-4 sm:relative sm:left-1/2 sm:mx-0 sm:w-screen sm:max-w-none sm:-translate-x-1/2'
          : '',
        className
      )}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: variant === 'bleed' ? '21/9' : '16/9' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover contrast-[1.05] grayscale"
          sizes={variant === 'bleed' ? '100vw' : '(max-width: 768px) 100vw, 800px'}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
            mixBlendMode: 'overlay',
          }}
          aria-hidden="true"
        />
      </div>
      {caption && (
        <figcaption
          className="type-caption mt-4 px-4 sm:px-0"
          style={{
            color: 'var(--color-mid)',
            fontStyle: 'italic',
            textTransform: 'none',
            letterSpacing: '0',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
