import { Loader2 } from 'lucide-react'

export default function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong bg-white/40 p-10 text-center"
    >
      <Loader2 className="h-7 w-7 animate-spin text-appraisal-500 reduced-motion-safe" strokeWidth={2} />
      <p className="mt-4 font-display text-lg text-ink">Generating your estimate</p>
      <p className="mt-1 text-sm text-ink-soft">
        Weighing quality, size, and age against comparable properties.
      </p>
    </div>
  )
}
