# Flask and create-react-app
#This app is deployed to:
https://link-njit.herokuapp.com/
However, in order to get passed the login page you must go to settings->clear browsing data->cached images and files
In order to overcome the issue


## Requirements
1. `npm install`
2. `pip install -r requirements.txt`


## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory
2. Go to `https://rapidapi.com/developer/` and make a new developer account
3. Create an app and generate an application key
4. Make a .env file and put this in it `export L_C_KEY='YOUR_KEY_HERE'`

## Google Login API
1. Create a new project on the Google Cloud Platform
2. On the GCP, Click Create credentials > OAuth client ID.
3. Select the Web application application type.
4. Name your OAuth 2.0 client and click Create
5. On the command line, type `npm install react-google-login`

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
*Don't do the Heroku step for assignments, you only need to deploy for Project 2*
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`
