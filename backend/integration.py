from flask import Flask, request, jsonify
import os
import chatbot
import chicai

app = Flask(__name__)

from flask_cors import CORS
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = './'  # Change upload folder to project root
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the upload folder exists
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/chatbot', methods=['POST'])
def chatbot_endpoint():
    data = request.get_json()
    prompt = data.get('prompt', '')
    username = data.get('username', 'admin')
    context = data.get('context', "{'user': [], 'fitz': []}")
    data = chatbot.chatbot(prompt, username, context)

    print(data)

    return jsonify(data)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        print(f"File saved to {filepath}")

        outfit = {
        "top": chicai.imagetoText("top", "upload.jpg"),
        "bottom": chicai.imagetoText("bottom", "upload.jpg")
        }

        chicai.copilotDesigner(outfit)

        return jsonify({"message": "File uploaded successfully", "filepath": filepath}), 200
    except Exception as e:
        print(f"Error saving file: {e}")
        return jsonify({"error": "Failed to upload file"}), 500

if __name__ == '__main__':
    app.run(debug=True)