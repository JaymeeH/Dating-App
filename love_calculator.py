import os
import requests
import database
import app
from models import MatchStatusTable
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

#love calculator url and headers
LC_URL = "https://love-calculator.p.rapidapi.com/getPercentage"
LC_HEADERS = {
        'x-rapidapi-key': os.getenv('L_C_KEY'),
        'x-rapidapi-host': "love-calculator.p.rapidapi.com"
    }


def find_match_percentage(name1, name2):
    '''
    Given 2 names, return their match percentage
    '''
    query_string = { 'fname' : name1, 'sname' : name2 }
    
    response = requests.request(
        'GET', LC_URL, headers=LC_HEADERS, params=query_string
    )
    response = response.json()
    
    return int(response['percentage'])


def find_best_match(name, gender, email):
    '''
    Given name, gender, and email, find and return the email
    Of the best match candidate of the opposite gender
    '''
    
    
    pass


def fetch_status_from_db(gender):
    '''
    Query for everyone looking for a match with the gender
    Return a list of their emails
    '''
    waiting_list = MatchStatusTable.query.filter_by(gender=gender, user_match_status=2)
    return list(map(lambda entry: entry.user_email, waiting_list))