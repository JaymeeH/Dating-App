import os
from flask import Flask, send_from_directory, json, request, requests
from flask_socketio import SocketIO
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS




load_dotenv(find_dotenv())
app = Flask(__name__, static_folder='./build/static')
cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

#love calculator url and headers
love_calculator_url = "https://love-calculator.p.rapidapi.com/getPercentage"

headers = {
    'x-rapidapi-key': os.getenv('L_C_KEY'),
    'x-rapidapi-host': "love-calculator.p.rapidapi.com"
    }


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)
    


@socketio.on('match')
def match(user1,user2):
    querystring = {"fname":user1,"sname":user2}
    response = requests.request("GET", love_calculator_url, headers=headers, params=querystring)
    print(response.text)

    
    

app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
