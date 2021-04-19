import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

APP = Flask(__name__, static_folder='./build/static')

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(APP,
                    CORS_allowed_origins="*",
                    json=json,
                    manage_session=False)


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


#@app.route('/api/v1/unmatch', methods=['GET','POST'])
#def unmatch(unmatchEmail):
#searches database for name to be unmatched and removes them from the table
#DB.session.query(models.UserProfile).filter(models.UserProfile.email == unmatchEmail).delete()
#commits the change to the database
#DB.session.commit()

APP.run(
    APP,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
