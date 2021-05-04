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



// TODO: Step 1: Initialize the Chat SDK
const sb_chat = (props) => {
    // TODO: Step 2: Connect to Sendbird serve
     sb.connect(USER_ID, function(user, error) {
     if (error) {
         // Handle error
         console.log('sb connect error')
     }
     console.log('reached here sb connect')
     
     });
    
    // TODO: Step 3: Create a new open channel
    sb.OpenChannel.createChannel(function(openChannel, error) {
    if (error) {
        // Handle error.
    }
});
    // TODO:Step 4: Enter the channel
    sb.OpenChannel.getChannel(CHANNEL_URL, function(openChannel, error) {
        if (error) {
        // Handle error.
        }

    // Call the instance method of the result object in the "openChannel" parameter of the callback function.
        openChannel.enter(function(response, error) {
            if (error) {
            // Handle error.
            }
    });
});
    const params = new sb.UserMessageParams();
    params.message = TEXT_MESSAGE;
    params.data = DATA;
    params.customType = CUSTOM_TYPE;
    
    openChannel.sendUserMessage(params, function(message, error) {
        if (error) {
     //Handle error.
    }
  
  
    //});
    console.log('reached sb_chat')
    return (
        <div className="sb_chat">
            <h1>SendBird App</h1>
            <SendbirdApp appid={APP_ID} userid={USER_ID} />
        </div>
    );
} 

export default sb_chat
