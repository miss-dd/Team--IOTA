import { AlertTriangle, RotateCcw } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex h-full flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/60 p-10 text-center"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertTriangle className="h-5 w-5" strokeWidth={2} />
      </span>
      <p className="mt-4 font-display text-lg text-ink">We hit a snag</p>
      <p className="mt-1 max-w-xs text-sm text-ink-soft">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line-strong bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2} />
          Try again
        </button>
      )}
    </div>
  )
}
