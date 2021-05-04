import React from "react";
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import "./sb_chat.css"


require('dotenv').config();
const APP_ID = process.env.SEND_BIRD_ID
console.log(APP_ID)

//const sb = new SendbirdApp.Sendbird({appId: APP_ID});

const USER_ID = 'kjb45@njit.edu'

const CHAT_URL = 'api/v1/chat';

// The USER_ID below should be unique to your Sendbird application.


const sb_chat = (props) => {
    // sb.connect(USER_ID, function(user, error) {
    // if (error) {
    //     // Handle error
    //     console.log('sb connect error')
    // }
    // console.log('reached here sb connect')
    // // The user is connected to Sendbird server.
    // });
    
    console.log('reached sb_chat')
    return (
        <div className="sb_chat">
            <h1>SendBird App</h1>
            <SendbirdApp appid={APP_ID} userid={USER_ID} />
        </div>
    );
} 

export default sb_chat
