import { Stamp, RotateCcw } from 'lucide-react'

interface PredictionCardProps {
  value: number
  onReset: () => void
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function PredictionCard({ value, onReset }: PredictionCardProps) {
  return (
    <div className="relative animate-stamp-in reduced-motion-safe overflow-hidden rounded-2xl border border-appraisal-200 bg-white p-10 text-center shadow-stamp">
      <div className="pointer-events-none absolute inset-4 rounded-xl border border-dashed border-appraisal-100" />

      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-appraisal-500 text-appraisal-500">
        <Stamp className="h-5 w-5" strokeWidth={2} />
      </span>

      <p className="relative mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-appraisal-600">
        Estimated House Value
      </p>

      <p className="relative mt-3 font-display text-5xl font-medium tracking-tight text-ink sm:text-6xl">
        {formatCurrency(value)}
      </p>

      <p className="relative mx-auto mt-4 max-w-xs text-sm text-ink-soft">
        Based on the property details you provided. This is an estimate, not an appraisal.
      </p>

      <button
        onClick={onReset}
        className="relative mt-8 inline-flex items-center gap-2 rounded-lg border border-line-strong bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
      >
        <RotateCcw className="h-4 w-4" strokeWidth={2} />
        Estimate Again
      </button>
    </div>
  )
}
