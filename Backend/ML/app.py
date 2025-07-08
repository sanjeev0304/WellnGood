from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import skfuzzy as fuzz

app = Flask(__name__)
CORS(app)

# Load fuzzy model parameters
with open('model.pkl', 'rb') as f:
    fuzzy_model = pickle.load(f)

centers = fuzzy_model['cntr']
m = fuzzy_model['m']

@app.route('/api/predict', methods=['POST'])
def predict_cluster():
    try:
        data = request.get_json()

        # Ensure all expected fields are present
        required_fields = [
            'Heart_Rate',
            'Blood_Oxygen_Level',
            'Sleep_Duration',
            'Steps',
            'Calories_Burned',
            'Distance_Covered'
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Convert input data to numpy array
        features = [
            data['Heart_Rate'],
            data['Blood_Oxygen_Level'],
            data['Sleep_Duration'],
            data['Steps'],
            data['Calories_Burned'],
            data['Distance_Covered']
        ]
        input_array = np.array(features).reshape(1, -1)

        # Make prediction deterministic (optional)
        np.random.seed(42)

        # Run fuzzy c-means prediction
        _, u, _, _, _, _ = fuzz.cluster.cmeans_predict(
            test_data=input_array.T,
            cntr_trained=centers,
            m=m,
            error=0.005,
            maxiter=1000
        )

        cluster = int(np.argmax(u, axis=0)[0])

        return jsonify({
            'cluster': cluster,
            'memberships': u[:, 0].tolist()
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
