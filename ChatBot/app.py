from flask import Flask, render_template,request, jsonify
from flask_cors import CORS
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
    print("The input was",text)
    message = {"answer": response["answer"], "tag": response["tag"] ,"complaint" : response["complaint"]}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)