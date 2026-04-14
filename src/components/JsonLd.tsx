// Server component — renders a <script type="application/ld+json"> tag.
// Pass any valid schema.org object as `data`.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
