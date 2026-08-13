
import os
import json
import joblib
import numpy as np


def model_fn(model_dir):
    """
    Load the trained model, scaler, and feature list.
    """

    model = joblib.load(
        os.path.join(
            model_dir,
            "house_price_model.joblib"
        )
    )

    scaler = joblib.load(
        os.path.join(
            model_dir,
            "scaler.joblib"
        )
    )

    features = joblib.load(
        os.path.join(
            model_dir,
            "features.joblib"
        )
    )

    return {
        "model": model,
        "scaler": scaler,
        "features": features
    }


def input_fn(request_body, content_type):
    """
    Read JSON input sent to the endpoint.
    """

    if content_type == "application/json":
        return json.loads(request_body)

    raise ValueError(
        f"Unsupported content type: {content_type}"
    )


def predict_fn(input_data, model_bundle):
    """
    Arrange the input values, scale them,
    and generate a prediction.
    """

    features = model_bundle["features"]

    values = [
        input_data[feature]
        for feature in features
    ]

    input_array = np.array(
        values
    ).reshape(1, -1)

    scaled_input = model_bundle[
        "scaler"
    ].transform(input_array)

    prediction = model_bundle[
        "model"
    ].predict(scaled_input)

    return prediction


def output_fn(prediction, accept):
    """
    Return the prediction as JSON.
    """

    if accept == "application/json":

        result = {
            "predicted_sale_price": float(
                prediction[0]
            )
        }

        return (
            json.dumps(result),
            accept
        )

    raise ValueError(
        f"Unsupported accept type: {accept}"
    )
