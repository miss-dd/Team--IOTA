import { Home } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-paper">
            <Home className="h-5 w-5" strokeWidth={2} />
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-medium tracking-tight text-ink">
              HomeValue <span className="text-appraisal-500">AI</span>
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              AI-powered house price estimation
            </p>
          </div>
        </div>

        <span className="hidden items-center gap-2 rounded-full border border-line-strong bg-white/60 px-3 py-1.5 font-mono text-xs text-ink-soft sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-appraisal-500" />
          Estimator online
        </span>
      </div>
    </header>
  )
}
