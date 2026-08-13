# HomeValue AI

An end-to-end machine learning project that predicts residential house sale prices and serves those predictions through a live web application. The model is trained on the Ames Housing dataset using Linear Regression, deployed as an AWS SageMaker endpoint, and exposed to a React frontend via API Gateway and Lambda.

**Live demo:** https://d3mcytab0tueon.cloudfront.net

---

## Architecture

```
User Browser
    │
    ▼
CloudFront (CDN)
    │  serves static files
    ▼
S3 Bucket (private)
    │  stores built frontend

User Browser
    │
    ▼
API Gateway (HTTP API)
    │  POST /predict
    ▼
Lambda Function
    │  forwards request
    ▼
SageMaker Endpoint
    │  runs inference
    ▼
Prediction response
```

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS, Vite |
| CDN | Amazon CloudFront |
| Static hosting | Amazon S3 (private bucket, OAC) |
| API | Amazon API Gateway (HTTP API) |
| Compute | AWS Lambda |
| ML inference | Amazon SageMaker endpoint |
| Model | scikit-learn Linear Regression |
| Training environment | Google Colab / Jupyter |

---

## ML Model

### Dataset

- **Source**: Ames Housing dataset (`train.csv`)
- **Size**: 1,460 rows × 81 columns
- **Target variable**: `SalePrice`

### Features

The model was trained on six features chosen for their strong correlation with sale price:

| Feature | Description | Range |
|---|---|---|
| `OverallQual` | Overall material and finish quality | 1 – 10 |
| `GrLivArea` | Above-ground living area (sq ft) | 100 – 15,000 |
| `GarageCars` | Garage capacity in car spaces | 0 – 5 |
| `TotalBsmtSF` | Total basement area (sq ft) | 0 – 10,000 |
| `FullBath` | Number of full bathrooms | 0 – 6 |
| `YearBuilt` | Original construction year | 1800 – present |

### Preprocessing

1. Missing numerical values filled with the column median
2. Missing categorical values filled with `"None"`
3. Categorical variables one-hot encoded
4. Features standardized with `StandardScaler` before training

### Training

```
Train / test split: 80 / 20
Model: sklearn.linear_model.LinearRegression
Scaling: sklearn.preprocessing.StandardScaler
```

### Results

| Metric | Value |
|---|---|
| RMSE | $39,711 |
| MAE | $25,320 |
| R² Score | 0.7944 |

The model explains ~79% of the variance in house prices. On average, predictions are within ~$25,300 of the actual price. Accuracy decreases for very high-value homes, which is expected behaviour for a linear model.

`GrLivArea` (living area) and `OverallQual` (overall quality) had the strongest influence on predicted price.

### Notebook

The full training workflow is in `Team_Success.ipynb` (runnable in Google Colab):

1. Import libraries
2. Load and preview the dataset
3. Inspect data types and missing values
4. Feature engineering and encoding
5. Feature selection (6 features)
6. Train/test split
7. Scale features and train the model
8. Evaluate with RMSE, MAE, R²
9. Visualize actual vs. predicted, residuals, and feature importance
10. Deploy to SageMaker endpoint

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/miss-dd/Team--IOTA/blob/main/Team_Success.ipynb)

---

## Frontend

A single-page React app where users enter six property details and receive an instant price estimate.

### How it works

1. User fills in the property form (pre-populated with typical values)
2. Client-side validation runs before the request is sent
3. A `POST /predict` request is made to API Gateway with the feature array:
   ```json
   { "features": [[7, 1710, 2, 856, 2, 2003]] }
   ```
4. The SageMaker endpoint returns a prediction:
   ```json
   { "prediction": [208500] }
   ```
5. The result is displayed as a formatted currency estimate

### Project structure

```
src/
├── components/
│   ├── Header.tsx          # App header with logo
│   ├── PropertyForm.tsx    # Six-field input form with validation
│   ├── PredictionCard.tsx  # Displays the price estimate
│   ├── LoadingState.tsx    # Spinner shown during inference
│   ├── ErrorMessage.tsx    # Error display with retry
│   └── FormField.tsx       # Reusable labelled input component
├── services/
│   └── predictionApi.ts    # fetch wrapper for POST /predict
├── types/
│   └── prediction.ts       # TypeScript types + feature array builder
├── utils/
│   └── validation.ts       # Field and form validation rules
└── App.tsx                 # Root component, state management
```

---

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repo
git clone https://github.com/miss-dd/Team--IOTA.git
cd homevalue-ai

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL to your API Gateway URL
```

### Environment variables

```bash
# .env
VITE_API_BASE_URL=https://<api-id>.execute-api.eu-west-1.amazonaws.com/dev
```

### Run

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build → dist/
npm run lint      # Run ESLint
```

---

## Deployment

### Frontend (S3 + CloudFront)

```bash
# Build
npm run build

# Upload dist/ contents to S3 bucket
# (via AWS Console or CLI)
aws s3 sync dist/ s3://your-bucket-name --delete

# CloudFront will serve the updated files after cache invalidation
```

The S3 bucket is kept fully private. CloudFront accesses it via an Origin Access Control (OAC) policy. Custom error responses for `403` and `404` redirect to `index.html` to support client-side routing.

### API (API Gateway → Lambda → SageMaker)

The backend infrastructure is managed separately. The frontend only needs the `VITE_API_BASE_URL` environment variable pointing at the deployed API Gateway stage.

---

## API Contract

**POST** `{VITE_API_BASE_URL}/predict`

Request:
```json
{
  "features": [[OverallQual, GrLivArea, GarageCars, TotalBsmtSF, FullBath, YearBuilt]]
}
```

Response:
```json
{
  "prediction": [208500.0]
}
```

The feature order in the array is fixed and must match the order the model was trained on. This is enforced in `src/types/prediction.ts` via the `toFeatureArray()` function.

---

## Limitations

- Prediction accuracy is lower for houses with extreme (very high or very low) prices
- Only six features are used — incorporating more could improve accuracy
- The model is trained on Ames, Iowa housing data and may not generalize well to other markets
- Estimates are not a substitute for a professional appraisal

---

## Team

Team IOTA

---

## License

This project is intended for educational purposes.
