import React, { useState, useEffect } from "react";
import { Channel, SendBirdProvider } from "sendbird-uikit";
import SendBird from 'sendbird';
import "sendbird-uikit/dist/index.css";
import "./sb_chat.css"


const path = require('path');
require('dotenv').config();
const APP_ID = process.env.SEND_BIRD_ID;
const MASTER_KEY = process.env.MASTER_KEY
console.log(APP_ID);


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
    const [channelUrl, setChannelUrl] = useState(null);
    useEffect(() => {
        sb.connect(USER_ID, function(user, error) {
            if (error) {
             // Handle error
             console.log('sb connect error')
            }
            console.log('reached here sb connect')
        // The user is connected to Sendbird server.
        }).then(() => {
            const CREATE_GROUP_URL = 'https://api-' + APP_ID + '.sendbird.com/v3/group_channels';
            const payload = {
                users: ['kjb45@njit.edu', 'test@njit']
            };
                
            fetch(CREATE_GROUP_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Token': 'MASTER_KEY',
                },
                body: JSON.stringify(payload)
            }).then((response) => response.json()).then((data) => {
                console.log(data);
                const FETCH_URL = 'https://api-' + APP_ID +'.sendbird.com/v3/users/kjb45@njit.edu/my_group_channels';
                fetch(FETCH_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Api-Token': MASTER_KEY,
                    },
                }).then((response) => response.json()).then((data) => {
                        console.log(data);
                });
            });
        });
    }, []);
    
    //const channelUrl = 'a'
    //const channelUrl = createGroupChannel(['kjb45@njit.edu', 'test2@njit']).channel_url;
    console.log(channelUrl);
    
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
