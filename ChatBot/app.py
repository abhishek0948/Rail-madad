from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
from imageProcessing import describe_image
from chat import get_response

app = Flask(__name__)
CORS(app)

@app.get("/")
def index():
    return render_template("base.html") 

@app.post("/predict")
def predict():
    text = request.get_json().get("msg")
    response = get_response(text)
    print("The input was", text)
    message = {"answer": response["answer"], "tag": response["tag"], "complaint": response["complaint"]}
    return jsonify(message)

@app.post("/image")
def process_image():
    data = request.get_json()
    image_url = data.get('image_url')

    if image_url:
        # Call the imageProcessing.py function
        try:
            generated_description = describe_image(image_url)
            response = get_response(generated_description)
            print("Generated Description:", generated_description)
            print("Response from get_response:", response)

            return jsonify({
                "message": "Image and description processed successfully",
                "image_path": image_url,
                "generated_description": generated_description,
                "tag": response["tag"], 
            })
        except Exception as e:
            print("Error processing image:", e)
            return jsonify({"error": "Error processing image"}), 500
    else:
        return jsonify({"error": "No image provided"}), 400

if __name__ == "__main__":
    app.run(debug=True)