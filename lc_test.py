import os
import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

#love calculator url and headers
love_calculator_url = "https://love-calculator.p.rapidapi.com/getPercentage"

headers = {
    'x-rapidapi-key': os.getenv('L_C_KEY'),
    'x-rapidapi-host': "love-calculator.p.rapidapi.com"
    }

querystring = {"fname":"Kadeem","sname":"Jasmin"}
response = requests.request("GET", love_calculator_url, headers=headers, params=querystring)
print(response.text)



