from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import skfuzzy as fuzz

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests if needed

# Load model and scaler once at startup
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

cntr = model['cntr']
m = model['m']
error = model['error']
maxiter = model['maxiter']
scaler = model['scaler']

@app.route('/api/predict', methods=['POST'])
def predict_cluster():
    try:
        data = request.get_json()

        # Extract features in the correct order
        features = [
            data["Heart_Rate"],
            data["Blood_Oxygen_Level"],
            data["Sleep_Duration"],
            data["Steps"],
            data["Calories_Burned"],
            data["Distance_Covered"]
        ]

        # Convert to 2D numpy array
        new_data = np.array([features])

        # Scale and transpose
        new_data_scaled = scaler.transform(new_data)
        new_data_T = new_data_scaled.T

        # Predict cluster
        result = fuzz.cluster.cmeans_predict(
            test_data=new_data_T,
            cntr_trained=cntr,
            m=m,
            error=error,
            maxiter=maxiter
        )

        u = result[0] if isinstance(result, tuple) else result
        cluster_index = int(np.argmax(u))
        membership = u.flatten().tolist()

        return jsonify({
            "membership_probabilities": membership,
            "predicted_cluster": cluster_index
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
