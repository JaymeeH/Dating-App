'''
Server driver code
'''
import os
from database import db
from flask import Flask, send_from_directory, json, request
from flask_socketio import SocketIO
from flask_cors import CORS
from models import UserProfile, Conversations
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

if __name__ == '__main__':
    app = create_app()

def create_app():
    '''
    Create the Flask app in this function to avoid 
    Circular imports with the database
    '''
    app = Flask(__name__, static_folder='./build/static')
    # Point SQLAlchemy to your Heroku database
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    # Gets rid of a warning
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.create_all()
    return app


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
        if 'email' in request.args:
            # query db with email for other columns
            mock_data = {
                'email': 'mockdb@email',
                'googleName': 'Zachary Chuba',
                'nickName': 'Zach',
                'age': 20,
                'gender': 'Male',
                #'bio': 'A person',
            }
            return mock_data
        else:
            return {'success': False, 'error': 'Invalid request arguments'}
    return {
        'success':
        False,
        'error':
        'This is literally impossible, if you see this error message somethings wrong'
    }


@app.route('api/v1/match', methods=['POST'])
def match_clicked():
    '''
    REST api for when match is clicked from user profile
    Posts the user's name and gender
    '''
    request_data = request.json()
    do_match_function(request_data['name'], request_data['gender'])
    return {'success': True}


def do_match_function(name, gender):
    pass


def get_profile_from_db(email):
    '''
    Given an email return a dictionary of their profile info
    '''
    db_user = UserProfile.query.filter_by(email=email).first()
    if db_user is None:
        return {'error': True}
    else:
        return {
            'error': False,
            'email': email,
            'oath_name': db_user.oath_name,
            'nickname': db_user.nickname,
            'age': db_user.age,
            'gender': db_user.gender,
            'bio': db_user.bio,
            'image_url': db_user.image_url,
        }


def update_user_data(user_data):
    '''
    Given a dictionary of user data, add it to the database
    '''
    email = user_data['email']
    oath_name = user_data['oath_name']
    nickname = user_data['nickname']
    age = user_data['age']
    gender = user_data['gender']
    bio = user_data['bio']
    
    db_user = UserProfile.query.filter_by(email=user_data['email']).first()
    
    if db_user is None:
        # Add new record to db
        add_to_db(email, oath_name, nickname, age, gender, bio)
    else:
        update_in_db(db_user, nickname, age, gender, bio)


def add_to_db(email, oath_name, nickname=None, age=None, gender=None, bio=None):
    '''
    Creates a new record in the db with the given parameters,
    if any are none, does not create those parameters
    '''
    


def update_in_db(db_row, nickname, age, gender, bio):
    '''
    If a column exists in the db, update it with the parameter values,
    If any are none, do not update it
    '''
    


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
