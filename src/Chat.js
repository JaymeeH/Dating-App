import React from "react";
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";



require('dotenv').config();
const APP_ID = process.env.SEND_BIRD_ID
console.log(APP_ID)

const sb = new App.SendBird({appId: APP_ID});

const USER_ID = 'kjb45@njit.edu'


// The USER_ID below should be unique to your Sendbird application.
sb.connect(USER_ID, function(user, error) {
    if (error) {
        // Handle error
        console.log('sb connect error')
    }
    console.log('reached here sb connect')
    // The user is connected to Sendbird server.
});

const sb_chat = (props) => {
    
    
} 

