import React from 'react';
import { GoogleLogin } from 'react-google-login';
// initiallizing a refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

//Load the contents of .env variables
require('dotenv').config()


const clientId = process.env.REACT_APP_CLIENT_ID;



console.log(clientId)

const Login = () => {
   const onSuccess = (res) => {
     console.log('[Login Success] currentUser:', res.profileObj);  
     alert(
         `Logged in successfully welcome ${res.profileObj.name} 😍  `
         );
   
     // initializing the setup  
     refreshTokenSetup(res)  
   };
   
   const onFailure = (res) => {
       console.log('[Login failed] res:', res);
   };
    return (
        <>
        <GoogleLogin
    clientId={clientId}
    buttonText="Log in with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    style={{ marginTop: '100px' }}
    isSignedIN={true}
    />
        
        </>
        
        )
    
};

export default Login;