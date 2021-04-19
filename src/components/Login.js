import React,{ useState, useRef, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
// initiallizing a refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

//Load the contents of .env variables
require('dotenv').config();
const clientId = process.env.REACT_APP_CLIENT_ID;
console.log(clientId);
const LOGIN_URL = '/api/v1/login';



const Login = (props) => {
    //USE STATES TO CHECK EMAIL ADDRESS
    //const [Email, setEmail] = useState('');
    const [LogState, setLogState] = useState(false);
    const [ifNJIT, setIfNJIT] = useState(false);
    const [fullID, setFullID] = useState('');
    
    const onSuccess = (res) => {
     console.log('[Login Success] currentUser:', res.profileObj);
     props.setter(res.profileObj.email)
     props.logSetter(true);
     checkEmail(res);
    alert(
         `Logged in successfully welcome ${res.profileObj.name} `
     ); 
    
     // initializing the setup  
     refreshTokenSetup(res);  
   };
   
   const onFailure = (res) => {
       console.log('[Login failed] res:', res);
       
   };
   
   const checkEmail = (res) => {
       const emailCopy = Email;
       if (emailCopy.includes('@njit.edu')) {
           props.setId(true);
           //setIfNJIT(true);
           saveLoginData(res.profileObj.name,res.profileObj.givenName,
            res.profileObj.email,res.profileObj.image_url);
       }
      
       
   };
   const saveLoginData = (name,nickname,email,image_url) => {
       const loginInfo = {
           email: email,
           name: name,
           nickname: nickname,
           image: image_url,
       };
       fetch(LOGIN_URL, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
         body: JSON.stringify(loginInfo)  
       }).then((response)=>response.json()).then((data)=>{
           console.log(data);
       });
   };
   console.log(Email);
    return (
        <>
        <div>
        <GoogleLogin
    clientId={clientId}
    buttonText="Log in with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    style={{ marginTop: '100px' }}
    isSignedIN={true}
    />
    </div>
   
        
        </>
        
        )
    
};

export default Login;