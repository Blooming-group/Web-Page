import * as React from 'react'
import { cn } from '@/lib/utils'

/* ─── Display ─── */
interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'p'
}

function Display({ as: Tag = 'h1', className, children, ...props }: DisplayProps) {
  return (
    <Tag className={cn('type-display', className)} {...props}>
      {children}
    </Tag>
  )
}

/* ─── H1 ─── */
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>

function H1({ className, children, ...props }: HeadingProps) {
  return (
    <h1 className={cn('type-h1', className)} {...props}>
      {children}
    </h1>
  )
}

/* ─── H2 ─── */
function H2({ className, children, ...props }: HeadingProps) {
  return (
    <h2 className={cn('type-h2', className)} {...props}>
      {children}
    </h2>
  )
}

/* ─── H3 ─── */
function H3({ className, children, ...props }: HeadingProps) {
  return (
    <h3 className={cn('type-h3', className)} {...props}>
      {children}
    </h3>
  )
}

/* ─── Body ─── */
interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'div' | 'span'
}

function Body({ as: Tag = 'p', className, children, ...props }: BodyProps) {
  return (
    <Tag className={cn('type-body', className)} {...props}>
      {children}
    </Tag>
  )
}

/* ─── Caption ─── */
interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'p' | 'div'
}

function Caption({ as: Tag = 'span', className, children, ...props }: CaptionProps) {
  return (
    <Tag className={cn('type-caption', className)} {...props}>
      {children}
    </Tag>
  )
}

export { Display, H1, H2, H3, Body, Caption }
