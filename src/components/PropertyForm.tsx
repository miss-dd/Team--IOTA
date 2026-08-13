import { useState } from 'react'
import { Gauge, Ruler, Car, Layers, Bath, CalendarClock, ArrowRight } from 'lucide-react'
import FormField from './FormField'
import { FIELD_RULES, validateField, validateForm, type FieldErrors } from '../utils/validation'
import type { PropertyDetails } from '../types/prediction'

type FormValues = Record<keyof PropertyDetails, string>

const DEFAULT_VALUES: FormValues = {
  OverallQual: '7',
  GrLivArea: '1710',
  GarageCars: '2',
  TotalBsmtSF: '856',
  FullBath: '2',
  YearBuilt: '2003',
}

interface PropertyFormProps {
  onSubmit: (details: PropertyDetails) => void
  isSubmitting: boolean
}

export default function PropertyForm({ onSubmit, isSubmitting }: PropertyFormProps) {
  const [values, setValues] = useState<FormValues>(DEFAULT_VALUES)
  const [errors, setErrors] = useState<FieldErrors>({})

  function handleChange(field: keyof PropertyDetails, next: string) {
    setValues((prev) => ({ ...prev, [field]: next }))
    // Clear the error for this field as soon as the user edits it again.
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handleBlur(field: keyof PropertyDetails) {
    const error = validateField(field, values[field])
    setErrors((prev) => ({ ...prev, [field]: error ?? undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (isSubmitting) return // guard against duplicate requests

    const formErrors = validateForm(values)
    setErrors(formErrors)

    if (Object.keys(formErrors).length > 0) {
      return
    }

    onSubmit({
      OverallQual: Number(values.OverallQual),
      GrLivArea: Number(values.GrLivArea),
      GarageCars: Number(values.GarageCars),
      TotalBsmtSF: Number(values.TotalBsmtSF),
      FullBath: Number(values.FullBath),
      YearBuilt: Number(values.YearBuilt),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-white/70 p-6 shadow-card sm:p-8">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-appraisal-600">
            Property specification
          </p>
          <h2 className="mt-1 font-display text-xl font-medium text-ink">
            Tell us about the property
          </h2>
        </div>
        <span className="font-mono text-xs text-ink-soft">6 fields</span>
      </div>

      <div className="divide-y divide-line">
        <FormField
          index={1}
          id="OverallQual"
          icon={Gauge}
          label="Overall Quality"
          description="Overall material and finish quality, rated 1 (poor) to 10 (excellent)."
          value={values.OverallQual}
          onChange={(v) => handleChange('OverallQual', v)}
          onBlur={() => handleBlur('OverallQual')}
          error={errors.OverallQual}
          min={FIELD_RULES.OverallQual.min}
          max={FIELD_RULES.OverallQual.max}
        />

        <FormField
          index={2}
          id="GrLivArea"
          icon={Ruler}
          label="Living Area"
          unit="sq ft"
          value={values.GrLivArea}
          onChange={(v) => handleChange('GrLivArea', v)}
          onBlur={() => handleBlur('GrLivArea')}
          error={errors.GrLivArea}
          min={FIELD_RULES.GrLivArea.min}
          max={FIELD_RULES.GrLivArea.max}
        />

        <FormField
          index={3}
          id="GarageCars"
          icon={Car}
          label="Garage Capacity"
          description="Number of cars the garage can accommodate."
          value={values.GarageCars}
          onChange={(v) => handleChange('GarageCars', v)}
          onBlur={() => handleBlur('GarageCars')}
          error={errors.GarageCars}
          min={FIELD_RULES.GarageCars.min}
          max={FIELD_RULES.GarageCars.max}
        />

        <FormField
          index={4}
          id="TotalBsmtSF"
          icon={Layers}
          label="Basement Area"
          unit="sq ft"
          value={values.TotalBsmtSF}
          onChange={(v) => handleChange('TotalBsmtSF', v)}
          onBlur={() => handleBlur('TotalBsmtSF')}
          error={errors.TotalBsmtSF}
          min={FIELD_RULES.TotalBsmtSF.min}
          max={FIELD_RULES.TotalBsmtSF.max}
        />

        <FormField
          index={5}
          id="FullBath"
          icon={Bath}
          label="Full Bathrooms"
          value={values.FullBath}
          onChange={(v) => handleChange('FullBath', v)}
          onBlur={() => handleBlur('FullBath')}
          error={errors.FullBath}
          min={FIELD_RULES.FullBath.min}
          max={FIELD_RULES.FullBath.max}
        />

        <FormField
          index={6}
          id="YearBuilt"
          icon={CalendarClock}
          label="Year Built"
          value={values.YearBuilt}
          onChange={(v) => handleChange('YearBuilt', v)}
          onBlur={() => handleBlur('YearBuilt')}
          error={errors.YearBuilt}
          min={FIELD_RULES.YearBuilt.min}
          max={FIELD_RULES.YearBuilt.max}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={[
          'mt-8 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-medium text-paper transition-all',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          isSubmitting
            ? 'cursor-not-allowed bg-ink-soft'
            : 'bg-ink hover:bg-appraisal-600 active:scale-[0.99]',
        ].join(' ')}
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />
            Estimating...
          </>
        ) : (
          <>
            Estimate House Price
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </>
        )}
      </button>
    </form>
  )
}
