'''
Server driver code
'''
import os
import requests
import love_calculator
from database import db
from flask import Flask, send_from_directory, json, request
from flask_cors import CORS
from models import UserProfile, MatchStatusTable
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


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
    if __name__ == '__main__':
        db.init_app(app)
        with app.app_context():
            db.create_all()
    return app


app = create_app()

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


@app.route('/api/v1/login', methods=['GET', 'POST'])
def login():
    '''
    REST api for saving NJIT login data
    '''
    request_data = request.get_json()
    db_user = UserProfile.query.filter_by(email=request_data['email']).first()
    if db_user is None:
        add_to_db(request_data['email'],
                  request_data['name'],
                  )
    print(request_data)
    return {'success': True}


@app.route('/api/v1/user_profile', methods=['GET', 'POST'])
def user_profile():
    '''
    REST api for saving/fetching the user's profile
    '''
    if request.method == 'POST':
        # Write data to DB
        request_data = request.get_json()
        update_user_data(request_data)
        print(request_data)
        return {'success': True}
    else:
        # Get data from DB
        if 'email' in request.args:
            # query db with email for other columns
            data = get_profile_from_db(request.args['email'])
            print(data)
            '''mock_data = {
                'email': 'mockdb@email',
                'googleName': 'Zachary Chuba',
                'nickName': 'Zach',
                'age': 20,
                'gender': 'Male',
                #'bio': 'A person',
            }'''
            return data
        else:
            return {'success': False, 'error': 'Invalid request arguments'}
    return {
        'success':
        False,
        'error':
        'This is literally impossible, if you see this error message somethings wrong'
    }


@app.route('/api/v1/match', methods=['POST'])
def match_clicked():
    '''
    REST api for when match is clicked from user profile
    Posts the user's name and gender
    '''
    print("Match Clicked")
    request_data = request.get_json()
    match_email = love_calculator.find_best_match(request_data['name'], request_data['gender'], request_data['email'])
    user_profile = get_profile_from_db(match_email)
    user_profile['success'] = True
    
    return user_profile


def get_profile_from_db(email):
    '''
    Given an email return a dictionary of their profile info
    '''
    db_user = mock_out_query(email)
    if db_user is None:
        return {'error': True}
    else:
        return get_db_user_attributes(db_user)


def update_user_data(user_data):
    '''
    Given a dictionary of user data, add it to the database
    '''
    email = user_data['email']
    oath_name = user_data['oath_name']
    nickname = user_data['nickname']
    age = int(user_data['age']) if user_data['age'] != '' else None
    gender = user_data['gender']
    bio = user_data['bio']

    db_user = UserProfile.query.filter_by(email=user_data['email']).first()

    if db_user is None:
        # Add new record to db
        add_to_db(email, oath_name, nickname, age, gender, bio)
    else:
        update_in_db(db_user, nickname, age, gender, bio)

def add_to_db(email,
              oath_name,
              nickname=None,
              age=None,
              gender=None,
              bio=None,
              profile_image=None):
    '''
    Creates a new record in the db with the given parameters,
    if any are none, does not create those parameters
    '''
    if nickname is None:
        new_user = UserProfile(email=email,
                               oath_name=oath_name,
                               )
    else:
        new_user = UserProfile(email=email,
                               oath_name=oath_name,
                               nickname=nickname,
                               age=age,
                               gender=gender,
                               bio=bio)
    print(new_user)
    db.session.add(new_user)
    db.session.commit()


def mock_out_query(email):
    '''
    Mock out query for a profile with email
    '''
    return UserProfile.query.filter_by(email=email).first()
    

def get_db_user_attributes(db_user):
    return {
            'error': False,
            'email': db_user.email,
            'oath_name': db_user.oath_name,
            'nickname': db_user.nickname,
            'age': db_user.age,
            'gender': db_user.gender,
            'bio': db_user.bio,
            'image_url': db_user.image_url,
        }


def update_in_db(db_row, nickname, age, gender, bio):
    '''
    If a column exists in the db, update it with the parameter values,
    If any are none, do not update it
    '''
    db_row.nickname = nickname
    db_row.age = age
    db_row.gender = gender
    db_row.bio = bio
    db.session.merge(db_row)
    db.session.commit()

if __name__ == '__main__':
    app.run(
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )