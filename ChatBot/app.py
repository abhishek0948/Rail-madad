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
    # Access the uploaded image
    image = request.files.get('image')
    if image:
        # Save the image to a directory (e.g., 'uploads/')
        # upload_dir = 'uploads'
        # os.makedirs(upload_dir, exist_ok=True)  # Ensure the directory exists
        # image_path = os.path.join(upload_dir, image.filename)
        # image.save(image_path)
        # print("Image saved at:", image_path)

        # Call the imageProcessing.py function
        try:
            generated_description = describe_image(image_path)
            print("Generated Description:", generated_description)

            return jsonify({
                "message": "Image and description processed successfully",
                "image_path": image_path,
                "generated_description": generated_description,
                "ok": True
            })
        except Exception as e:
            print("Error processing image:", e)
            return jsonify({"error": "Error processing image"}), 500
    else:
        return jsonify({"error": "No image provided"}), 400

if __name__ == "__main__":
    app.run(debug=True)