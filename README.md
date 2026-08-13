# Team--IOTA
# House Price Prediction Using Linear Regression

A machine learning project that predicts residential house sale prices using the Ames Housing dataset and a Linear Regression model.

## Overview

This project applies Linear Regression to predict house prices (`SalePrice`) based on selected structural and quality features. The dataset contains information on 1,460 houses, including size, overall quality, number of rooms, and year built. The workflow covers the full pipeline: data loading, cleaning, feature engineering, model training, evaluation, and visualization.

## Dataset

- **Source**: Ames Housing dataset (`train.csv`)
- **Size**: 1,460 rows × 81 columns
- **Target variable**: `SalePrice`
- **Features used**: Includes numerical variables (e.g., house size, number of rooms) and categorical variables (e.g., neighborhood, roof type)

## Project Structure

The notebook (`Team_Success.ipynb`) is organized into the following sections:

1. **Importing Libraries** – Loads `pandas`, `numpy`, `seaborn`, and `matplotlib`
2. **Loading the Dataset** – Reads `train.csv` into a DataFrame
3. **Dataset Preview** – Inspects the first five rows to confirm the data loaded correctly
4. **Dataset Shape** – Confirms 1,460 records and 81 columns
5. **Data Types** – Reviews numerical vs. categorical variables
6. **Missing Values** – Identifies columns with missing data
7. **Feature Engineering**
   - Missing numerical values filled with the median
   - Missing categorical values filled with `"None"`
   - Categorical variables converted to numerical form via one-hot encoding
8. **Feature Selection** – Narrows the model down to six key features
9. **Train/Test Split** – Splits data 80/20 for training and evaluation
10. **Model Training** – Standardizes features and fits a Linear Regression model
11. **Model Evaluation** – Scores the model using RMSE, MAE, and R²
12. **Visualization** – Plots actual vs. predicted prices, residuals, and feature importance
13. **Conclusion** – Summarizes findings and suggests future improvements

## Selected Features

The model was trained on six features chosen for their strong relationship with sale price:

| Feature | Description |
|---|---|
| `OverallQual` | Overall material and finish quality |
| `GrLivArea` | Above-ground living area (sq ft) |
| `GarageCars` | Size of garage in car capacity |
| `TotalBsmtSF` | Total basement area (sq ft) |
| `FullBath` | Number of full bathrooms |
| `YearBuilt` | Original construction year |

## Methodology

1. **Preprocessing**: Missing values were imputed (median for numerical, most frequent category for categorical) rather than dropped, to preserve data.
2. **Encoding**: Categorical variables were one-hot encoded.
3. **Scaling**: Features were standardized using `StandardScaler` before training.
4. **Modeling**: A `LinearRegression` model from scikit-learn was fit on the scaled training data.
5. **Evaluation**: Performance was measured with RMSE, MAE, and R² on a held-out test set.

## Results

| Metric | Value |
|---|---|
| RMSE | $39,711 |
| MAE | $25,320 |
| R² Score | 0.7944 |

The model explains roughly **79%** of the variance in house prices. On average, predictions differ from actual prices by about $25,300 (MAE), with larger errors concentrated among higher-priced homes (as reflected in the higher RMSE).

### Visualizations

- **Actual vs. Predicted Prices** – Scatter plot comparing predictions against true values, with a reference diagonal line
- **Residual Plot** – Shows prediction errors relative to predicted price to check for bias or heteroscedasticity
- **Feature Importance** – Horizontal bar chart of Linear Regression coefficients

Living area (`GrLivArea`) and overall quality (`OverallQual`) were found to have the strongest influence on predicted prices.

## Requirements

```
pandas
numpy
seaborn
matplotlib
scikit-learn
```

## Usage

1. Open `Team_Success.ipynb` in Google Colab or Jupyter Notebook.
2. Upload `train.csv` (the Ames Housing training data) when prompted.
3. Run all cells sequentially to reproduce data preprocessing, model training, evaluation, and visualizations.

## Deployment Status (AWS SageMaker)

This project is intended to eventually be trained and hosted on **AWS SageMaker**. At the moment, the model has been developed and validated locally (in this notebook, outside of SageMaker) because the AWS Free Tier account currently available has been exhausted.

**Current status:**
- ✅ Data preprocessing, feature engineering, and model training/evaluation are complete and working (see Results above)
- ⏳ SageMaker integration (training job, endpoint hosting/deployment) has not yet been implemented
- ⏳ Blocked on AWS account access — the existing Free Tier account has run out of usage

**Next steps:**
- Obtain a new/active AWS account or upgrade the existing one (a team member with available AWS access is needed to move this forward)
- Port the existing preprocessing and training logic into a SageMaker-compatible training script (e.g., using the SageMaker scikit-learn container or a custom entry point)
- Set up an S3 bucket for data storage and a SageMaker training job
- Deploy the trained model to a SageMaker endpoint for inference

If you have an active AWS account and are able to help with this step, reach out to the project owner to get access set up.

## Limitations & Future Work

- Prediction accuracy decreases for houses with extreme (very high or very low) prices.
- Only six features were used; incorporating additional features could improve accuracy.
- Future iterations could explore more advanced models such as Random Forest, Gradient Boosting, or XGBoost to better capture non-linear relationships in the data.

## License

This project is intended for educational purposes.
