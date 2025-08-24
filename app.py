from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # agar frontend (HTML) bisa akses API

# Masukkan API key Gemini kamu
genai.configure(api_key="")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_msg = data.get("message")

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(user_msg)

    return jsonify({"reply": response.text})

if __name__ == "__main__":
    app.run(debug=True)
