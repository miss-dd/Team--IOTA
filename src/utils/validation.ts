import type { PropertyDetails } from '../types/prediction'

/**
 * Rules used for both the HTML input constraints and the JS-level
 * validation before a request is sent. These are UX guardrails only —
 * the backend is expected to perform authoritative validation too.
 */
export const FIELD_RULES = {
  OverallQual: { min: 1, max: 10, label: 'overall quality' },
  GrLivArea: { min: 100, max: 15000, label: 'living area' },
  GarageCars: { min: 0, max: 5, label: 'garage capacity' },
  TotalBsmtSF: { min: 0, max: 10000, label: 'basement area' },
  FullBath: { min: 0, max: 6, label: 'number of full bathrooms' },
  YearBuilt: { min: 1800, max: new Date().getFullYear(), label: 'year built' },
} as const

export type FieldErrors = Partial<Record<keyof PropertyDetails, string>>

/**
 * Validates a single field value. Returns an error message, or null if valid.
 */
export function validateField(field: keyof PropertyDetails, rawValue: string): string | null {
  const rule = FIELD_RULES[field]

  if (rawValue.trim() === '') {
    return `Please enter a valid ${rule.label}.`
  }

  const value = Number(rawValue)

  if (!Number.isFinite(value)) {
    return `Please enter a valid ${rule.label}.`
  }

  if (value < rule.min || value > rule.max) {
    return `${capitalize(rule.label)} should be between ${rule.min} and ${rule.max}.`
  }

  return null
}

/**
 * Validates the full set of form values. Returns a map of field -> error
 * message for any invalid fields. An empty object means the form is valid.
 */
export function validateForm(values: Record<keyof PropertyDetails, string>): FieldErrors {
  const errors: FieldErrors = {}

  for (const field of Object.keys(FIELD_RULES) as (keyof PropertyDetails)[]) {
    const error = validateField(field, values[field])
    if (error) {
      errors[field] = error
    }
  }

  return errors
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
