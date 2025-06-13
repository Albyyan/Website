from flask import Flask, request, jsonify
from classifier import classify_line

app = Flask(__name__, static_folder=None)

# ─── Add this block ──────────────────────────────────────────────────────────
@app.route('/', methods=['GET'])
def index():
    return 'OK', 200
# ─────────────────────────────────────────────────────────────────────────────

@app.route('/api/classify', methods=['POST'])
def classify():
    data  = request.get_json() or {}
    lyric = data.get('lyric', '').strip()
    if not lyric:
        return jsonify({'error': 'No lyric provided'}), 400

    try:
        scores = classify_line(lyric)
        return jsonify(scores)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
