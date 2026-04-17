import { cn } from '@/lib/utils'

type SilenceVariant = 'section' | 'breath' | 'editorial' | 'pre-cta'

const variantMap: Record<SilenceVariant, string> = {
  section: 'h-[--space-silence-section]',
  breath: 'h-[--space-silence-breath]',
  editorial: 'h-[--space-editorial-lg]',
  'pre-cta': 'h-[--space-editorial-xl]',
}

export function SilenceBlock({
  variant,
  className,
}: {
  variant: SilenceVariant
  className?: string
}) {
  return <div className={cn(variantMap[variant], className)} aria-hidden="true" />
}
