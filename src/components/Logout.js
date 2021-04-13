import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

require('dotenv').config()

const clientId = process.env.REACT_APP_CLIENT_ID;

const Logout = () => {
    const onSuccess = () => {
      alert('Logout made successfully ✌ ') ;
    };
    
    return(
        <>
        <GoogleLogout
    clientId={clientId}
    buttonText="Logout"
    onSuccess={onSuccess}
    cookiePolicy={'single_host_origin'}
    />
        
        </>
        
        );
};

export default Logout;