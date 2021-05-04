import React from "react";
import { App as SendbirdApp } from "sendbird-uikit";
import SendBird from 'sendbird';
import "sendbird-uikit/dist/index.css";
import "./sb_chat.css"


require('dotenv').config();
const APP_ID = process.env.SEND_BIRD_ID
console.log(APP_ID)

const sb = new SendBird({appId: APP_ID});
let previousMessageQuery = null;

const USER_ID = 'kjb45@njit.edu'

// const CHAT_URL = 'api/v1/chat';

// The USER_ID below should be unique to your Sendbird application.

function createGroupChannel(userEmailList) {
    return new Promise((resolve, reject) => {
        let params = new sb.GroupChannelParams();
        params.addUserIds(userEmailList);
        sb.GroupChannel.createChannel(params, (groupChannel, error) => {
            error ? reject(error) : resolve(groupChannel);
      });
    });
}

function getMessageHistory(channel, isInit = false) {
    if (isInit || isNull(this.previousMessageQuery)) {
      previousMessageQuery = channel.createPreviousMessageListQuery();
    }
    return new Promise((resolve, reject) => {
      if (previousMessageQuery.hasMore && !previousMessageQuery.isLoading) {
        previousMessageQuery.load(50, false, (messageList, error) => {
          error ? reject(error) : resolve(messageList);
        });
      } else {
        resolve([]);
      }
    });
}

const Chat = (props) => {
    sb.connect(USER_ID, function(user, error) {
        if (error) {
         // Handle error
         console.log('sb connect error')
        }
        console.log('reached here sb connect')
    // The user is connected to Sendbird server.
    });
    
    console.log('reached sb_chat')
    return (
        <div className="sb_chat">
            <h1>SendBird App</h1>
            <SendbirdApp appid={APP_ID} userid={USER_ID} />
        </div>
    );
} 

export default Chat;
