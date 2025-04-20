from flask import Flask, request, jsonify
import chatbot

app = Flask(__name__)

from flask_cors import CORS
CORS(app)  # Enable CORS for all routes

@app.route('/chatbot', methods=['POST'])
def chatbot_endpoint():
    data = request.get_json()
    prompt = data.get('prompt', '')
    username = data.get('username', 'admin')
    context = data.get('context', "{'user': [], 'fitz': []}")
    data = chatbot.chatbot(prompt, username, context)

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)