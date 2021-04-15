import os
from flask import Flask, send_from_directory, json, request
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv


app = Flask(__name__, static_folder='./build/static')


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

@app.route('/api/v1/user_profile', methods=['GET', 'POST'])
def user_profile():
    '''
    REST api for saving/fetching the user's profile
    '''
    if request.method == 'POST':
        # Write data to DB
        request_data = request.get_json()
        print(request_data)
        return {'success': True}
    else:
        # Get data from DB
        return {'success': True}
    return {'success': False}


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
