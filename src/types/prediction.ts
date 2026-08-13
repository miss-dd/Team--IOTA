/**
 * These types mirror the API contract of the future backend
 * (API Gateway -> Lambda -> SageMaker endpoint).
 *
 * IMPORTANT: The order of fields in `PropertyDetails` and the order in
 * which `toFeatureArray()` builds the array both matter. The SageMaker
 * model was trained on features in this exact order:
 *
 *   1. OverallQual
 *   2. GrLivArea
 *   3. GarageCars
 *   4. TotalBsmtSF
 *   5. FullBath
 *   6. YearBuilt
 */

/** Raw form values, keyed by the backend's feature names. */
export interface PropertyDetails {
  OverallQual: number
  GrLivArea: number
  GarageCars: number
  TotalBsmtSF: number
  FullBath: number
  YearBuilt: number
}

/** Request body sent to POST /predict */
export interface PredictionRequest {
  features: number[][]
}

/** Response body returned from POST /predict */
export interface PredictionResponse {
  prediction: number[]
}

/**
 * Converts form values into the exact ordered array the model expects.
 * This is the ONLY place feature order is defined — keep it in sync
 * with the SageMaker inference script if that ever changes.
 */
export function toFeatureArray(details: PropertyDetails): number[] {
  return [
    details.OverallQual,
    details.GrLivArea,
    details.GarageCars,
    details.TotalBsmtSF,
    details.FullBath,
    details.YearBuilt,
  ]
}

/** Discriminated union describing the state of a prediction attempt. */
export type PredictionState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; value: number }
  | { status: 'error'; message: string }
