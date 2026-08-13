import type { LucideIcon } from 'lucide-react'

interface FormFieldProps {
  id: string
  icon: LucideIcon
  label: string
  description?: string
  unit?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  min: number
  max: number
  step?: number
  index: number
}

/**
 * A single labeled numeric input, styled as one row of an appraisal
 * ledger. `index` renders as the line number (01, 02, ...) which
 * doubles as a subtle progress indicator through the six required
 * fields.
 */
export default function FormField({
  id,
  icon: Icon,
  label,
  description,
  unit,
  value,
  onChange,
  onBlur,
  error,
  min,
  max,
  step = 1,
  index,
}: FormFieldProps) {
  return (
    <div className="group relative py-4 first:pt-0 last:pb-0">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 font-mono text-xs text-line-strong">
          {String(index).padStart(2, '0')}
        </span>

        <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-md bg-appraisal-50 text-appraisal-600">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>

        <div className="min-w-0 flex-1">
          <label htmlFor={id} className="block text-sm font-medium text-ink">
            {label}
          </label>
          {description && (
            <p className="mt-0.5 text-xs text-ink-soft">{description}</p>
          )}

          <div className="mt-2 flex items-center gap-2">
            <input
              id={id}
              name={id}
              type="number"
              inputMode="numeric"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${id}-error` : undefined}
              className={[
                'w-full rounded-md border bg-white px-3 py-2 font-mono text-sm text-ink shadow-sm transition-colors',
                'placeholder:text-line-strong focus:outline-none',
                error
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-line-strong focus:border-appraisal-500',
              ].join(' ')}
            />
            {unit && (
              <span className="flex-none font-mono text-xs text-ink-soft">{unit}</span>
            )}
          </div>

          {error && (
            <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
