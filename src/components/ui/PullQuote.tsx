import { cn } from '@/lib/utils'

export function PullQuote({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <blockquote
      className={cn(
        'my-[--space-editorial-lg] border-l-2 py-4 pl-6',
        'text-lg leading-relaxed font-light italic',
        className
      )}
      style={{
        borderColor: 'var(--color-accent-primary)',
        color: 'var(--color-ivory)',
      }}
    >
      <span
        className="pull-quote__mark mr-1 not-italic"
        style={{ color: 'var(--color-accent-primary)' }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      {children}
      <span
        className="pull-quote__mark not-italic"
        style={{ color: 'var(--color-accent-primary)' }}
        aria-hidden="true"
      >
        &rdquo;
      </span>
    </blockquote>
  )
}
