import React from "react";
import { Channel, SendBirdProvider } from "sendbird-uikit";
import SendBird from 'sendbird';
import "sendbird-uikit/dist/index.css";
import "./sb_chat.css"

require('dotenv').config();
const APP_ID = '246B5999-217E-4ED5-94DB-09F9A67541D6'
console.log(APP_ID)

const sb = new SendBird({appId: APP_ID});
let previousMessageQuery = null;

const USER_ID = 'kjb45@njit.edu'

// const CHAT_URL = 'api/v1/chat';


function createGroupChannel(userEmailList) {
    return new Promise((resolve, reject) => {
        let params = new sb.GroupChannelParams();
        params.addUserIds(userEmailList);
        sb.GroupChannel.createChannel(params, (groupChannel, error) => {
            error ? reject(error) : resolve(groupChannel);
      });
    });
}

function isNull(item) {
    return item === null;
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
    
    const channelUrl = createGroupChannel(['test@njit', 'test2@njit']).channel_url;
    
    return (
        <div className="sb_chat">
            <h1>SendBird App</h1>
            <SendBirdProvider appId={APP_ID} userId={USER_ID}>
                <Channel channelUrl={channelUrl} />
            </SendBirdProvider>
        </div>
    );
}

export default Chat;
