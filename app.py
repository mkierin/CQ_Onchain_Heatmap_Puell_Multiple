from flask import Flask, render_template
from dotenv import load_dotenv
import requests
import json
import os
load_dotenv()
API_ACCESS_TOKEN = os.environ.get('CRYPTOQUANT_API_KEY')

app = Flask(__name__)

@app.route("/")
def index():
    data = get_puell_multiple_data()
    return render_template("index.html", data=json.dumps(data))

def get_puell_multiple_data():
    headers = {
        "Authorization": f"Bearer {API_ACCESS_TOKEN}"
    }
    response = requests.get("https://api.cryptoquant.com/v1/btc/network-indicator/puell-multiple?window=day&from=20190101&limit=1000", headers=headers)
    return response.json()


if __name__ == "__main__":
    app.run(debug=True)
