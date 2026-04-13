'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

const serviceOptions = [
  { value: 'web', label: 'Web Design & Development' },
  { value: 'process-automation', label: 'Process Automation' },
  { value: 'communications-automation', label: 'Communications Automation' },
  { value: 'ai-chatbots', label: 'AI Chatbots' },
  { value: 'ai-agents', label: 'AI Agents' },
  { value: 'strategic', label: 'Strategic conversation' },
]

const fieldStyles = cn(
  'w-full bg-transparent border-b border-[--color-border-default]',
  'py-3 text-sm text-ivory placeholder:text-mid',
  'focus:outline-none focus:border-accent-primary',
  'transition-colors duration-200',
  'font-[var(--font-sohne)]'
)

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false)
  const [serverError, setServerError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormValues) {
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error ?? 'Something went wrong')
      }

      setSubmitted(true)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[400px] flex-col items-start justify-center space-y-4">
        <CheckCircle size={32} className="text-accent-primary" aria-hidden="true" />
        <h2 className="text-ivory text-xl font-[var(--font-geist)] font-semibold">
          Message received.
        </h2>
        <p className="type-body max-w-sm">
          We will review your situation and respond within 24 hours to confirm your diagnostic
          session.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="space-y-8"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="sr-only">
          Your name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          className={cn(fieldStyles, errors.name && 'border-red-500/60')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-xs text-red-400" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="sr-only">
          Company
        </label>
        <input
          id="company"
          type="text"
          placeholder="Company"
          autoComplete="organization"
          className={cn(fieldStyles, errors.company && 'border-red-500/60')}
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? 'company-error' : undefined}
          {...register('company')}
        />
        {errors.company && (
          <p id="company-error" className="mt-2 text-xs text-red-400" role="alert">
            {errors.company.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email address"
          autoComplete="email"
          className={cn(fieldStyles, errors.email && 'border-red-500/60')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-xs text-red-400" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="sr-only">
          Area of interest
        </label>
        <select
          id="service"
          className={cn(
            fieldStyles,
            'cursor-pointer appearance-none',
            errors.service && 'border-red-500/60'
          )}
          style={{ backgroundColor: 'var(--color-base)' }}
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? 'service-error' : undefined}
          {...register('service')}
          defaultValue=""
        >
          <option value="" disabled>
            Area of interest
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="service-error" className="mt-2 text-xs text-red-400" role="alert">
            {errors.service.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="sr-only">
          Anything we should know (optional)
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Anything we should know (optional)"
          className={cn(fieldStyles, 'resize-none')}
          {...register('message')}
        />
      </div>

      {/* Server error */}
      {serverError && (
        <p className="text-sm text-red-400" role="alert">
          {serverError}
        </p>
      )}

      {/* Submit */}
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Sending…' : 'Send message'}
        {!isSubmitting && <ArrowRight size={16} aria-hidden="true" />}
      </Button>
    </form>
  )
}
