import type { PredictionRequest, PredictionResponse } from '../types/prediction'

/**
 * The backend base URL. Read from the environment so the same build
 * artifact can be pointed at different backends without a code change.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Thrown for any failure talking to the prediction API. `kind` lets the
 * UI decide which friendly message to show without needing to know
 * anything about HTTP status codes or network internals.
 */
export class PredictionApiError extends Error {
  kind: 'network' | 'server' | 'validation'

  constructor(message: string, kind: 'network' | 'server' | 'validation') {
    super(message)
    this.name = 'PredictionApiError'
    this.kind = kind
  }
}

/**
 * Sends a feature array to the backend's /predict endpoint and returns
 * the predicted house price.
 */
export async function predictHousePrice(features: number[][]): Promise<number> {
  if (!API_BASE_URL) {
    console.error('VITE_API_BASE_URL is not set. Check your .env file.')
    throw new PredictionApiError(
      "We couldn't connect to the prediction service. Please try again.",
      'network',
    )
  }

  const requestBody: PredictionRequest = { features }

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
  } catch (networkError) {
    console.error('Network error calling /predict:', networkError)
    throw new PredictionApiError(
      "We couldn't connect to the prediction service. Please try again.",
      'network',
    )
  }

  if (!response.ok) {
    const bodyText = await safeReadText(response)
    console.error(`Prediction API returned ${response.status}:`, bodyText)

    if (response.status >= 500) {
      throw new PredictionApiError(
        'Something went wrong while generating your estimate.',
        'server',
      )
    }

    if (response.status === 408 || response.status === 504) {
      throw new PredictionApiError(
        'The estimate is taking longer than expected. Please try again.',
        'server',
      )
    }

    throw new PredictionApiError(
      'We could not process those property details. Please check your inputs and try again.',
      'validation',
    )
  }

  let data: PredictionResponse
  try {
    data = await response.json()
  } catch (parseError) {
    console.error('Failed to parse prediction response:', parseError)
    throw new PredictionApiError(
      'Something went wrong while generating your estimate.',
      'server',
    )
  }

  const value = data.prediction?.[0]

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    console.error('Prediction response missing a valid prediction value:', data)
    throw new PredictionApiError(
      'Something went wrong while generating your estimate.',
      'server',
    )
  }

  return value
}

async function safeReadText(response: Response): Promise<string> {
  try {
    return await response.text()
  } catch {
    return '<unreadable response body>'
  }
}
