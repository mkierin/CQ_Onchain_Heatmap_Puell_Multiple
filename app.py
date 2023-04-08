from flask import Flask, render_template
from dotenv import load_dotenv
import requests
import json
import os

load_dotenv()

app = Flask(__name__)

CRYPTOQUANT_API_URL = "https://api.cryptoquant.com/v1"

@app.route("/")
def index():
    data_puell = get_data("/btc/network-indicator/puell-multiple", from_date="20190101", limit=1000)
    data_mvrv = get_data("/btc/market-indicator/mvrv", from_date="20191001", limit=1000)
    data_nupl = get_data("/btc/network-indicator/nupl", from_date="20191001", limit=1000)
   
    return render_template("index.html", data_puell=json.dumps(data_puell), data_mvrv=json.dumps(data_mvrv), data_nupl=json.dumps(data_nupl))

def get_data(endpoint, **params):
    url = CRYPTOQUANT_API_URL + endpoint
    headers = {
        "Authorization": f"Bearer {os.environ.get('CRYPTOQUANT_API_KEY')}"
    }
    with requests.get(url, headers=headers, params=params) as response:
        response.raise_for_status()
        return response.json()

if __name__ == "__main__":
    app.run(debug=True)
