
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/ghg_emissions"
mongo = PyMongo(app)

@app.route('/api/emissions', methods=['POST'])
def add_emission_data():
    data = request.get_json()
    data['timestamp'] = datetime.utcnow()
    mongo.db.emissions.insert_one(data)
    return jsonify({"msg": "Data added"}), 201

@app.route('/api/emissions', methods=['GET'])
def get_emission_data():
    emissions = list(mongo.db.emissions.find())
    for emission in emissions:
        emission['_id'] = str(emission['_id'])
    return jsonify(emissions), 200

if __name__ == '__main__':
    app.run(debug=True)

