'''
Server driver code
'''
import os
from database import db
from flask import Flask, send_from_directory, json,request
import requests
from flask_socketio import SocketIO
from flask_cors import CORS
from models import UserProfile, Conversations
from dotenv import load_dotenv, find_dotenv
import re

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
    #db.create_all()
    return app

if __name__ == '__main__':
    app = create_app()

'''

love calculator api 

'''
love_calculator_url = "https://love-calculator.p.rapidapi.com/getPercentage"

headers = {
    'x-rapidapi-key': os.getenv('L_C_KEY'),
    'x-rapidapi-host': "love-calculator.p.rapidapi.com"
}

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


mock_male_list = [
                    {
                        'name' : 'Chris',
                        'email' : 'chris@njit.edu'
                        
                        
                    }, 
                    {
                        'name' : 'Michael',
                        'email' : 'michael@njit.edu'
                        
                    }, 
                    {
                        'name' : 'Johnny',
                        'email' : 'johnny@njit.edu'
                        
                    }
                ]
                
mock_female_list = [ 
                    {
                        'name' : 'Jessica',
                        'email' : 'jessica@njit.edu'
                        
                        
                    }, 
                    {
                        'name' : 'Jenny',
                        'email' : 'jenny@njit.edu'
                        
                    }, 
                    {
                        'name' : 'ChiChi',
                        'email' : 'chichi@njit.edu'
                        
                    }
                ]

@app.route('/api/v1/match', methods=['POST'])
def match_clicked():
    '''
    REST api for when match is clicked from user profile
    Posts the user's name and gender
    '''
    print("match clicked")
    #request_data = request.json()
    mock_user = {
        'name': 'Kadeem',
        'gender': 'male',
        'email' : 'kadeem@njit.edu'
    }
                
    mock_user2 = {
        'name': 'Karen',
        'gender' : 'female',
        'email' : 'karen@njit.edu'
    }
    
    #testUser = mock_user2
    testUser = mock_user
    mock_percentage = 0
    mock_match = {}
    
    
    if testUser['gender'] is 'male':
        rating = {}
        for name in mock_female_list:
            #print("this is name")
            #print(name)
            rating = do_match_function(testUser, name)
            #print("under this")
            check_percentage = int(rating['percentage'])
            #print(type(check_percentage))
            #print("this is rating")
            #print(type(rating['percentage']))
            #print(type(mock_percentage))
            if check_percentage > mock_percentage:
               mock_percentage = int(rating['percentage'])
               mock_match['name'] = rating['name']
               mock_match['email'] = rating['email']
               mock_match['percentage'] = rating['percentage']

            
        print("this is return match")    
        print(mock_match)
        return(mock_match)
            
    else:    
        rating = {}
        for name in mock_male_list:
            #print("this is name")
            #print(name)
            rating = do_match_function(testUser, name)
            #print("under this")
            check_percentage = int(rating['percentage'])
            print(type(check_percentage))
            #print("this is rating")
            #print(type(rating['percentage']))
            print(type(mock_percentage))
            if check_percentage > mock_percentage:
                mock_percentage = int(rating['percentage'])
                mock_match['name'] = rating['name']
                mock_match['email'] = rating['email']
                mock_match['percentage'] = rating['percentage']
                
        print("this is return match")    
        print(mock_match)
        return(mock_match)

    #return {'success': True}

#@app.route('/api/v1/unMatch', methods=['POST'])
#def unMatch():
    #id1 = current user id2 = user id1 wants to unmatch
    #DB.session.query(models.userProfile).filter(models.userProfile.uid == id1).delete(models.userProfile.message_ids == id2)
    #DB.session.query(models.userProfile).filter(models.userProfile.uid == id2).delete(models.userProfile.message_ids == id1)
    #DB.session.commit()
    

def do_match_function(name1,name2):
    querystring = {"fname": name1['name'],"sname": name2['name']}
    response = requests.request("GET", love_calculator_url, headers=headers, params=querystring)
    print(response.text)
    m = re.search('percentage.*,',response.text)
    #print(m.group(0))
    percent = m.group(0)
    newpercent = percent[13:15]
    match_info = {}
    
    match_info['name'] = name2['name']
    match_info['percentage'] = newpercent
    match_info['email'] = name2['email']
    
    #print(newpercent)
    # if (mock_percentage < int(newpercent)):
    #     mock_percentage = int(newpercent)
    #     print("this is current mock percent")
    #     print(str(mock_percentage))
    return match_info



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
    new_user = UserProfile(email=email, oath_name=oath_name, nickname=nickname, age=age, gender=gender, bio=bio)
    db.session.add(new_user)
    db.session.commit()


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


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
