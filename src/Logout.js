import React from 'react';
import { GoogleLogout } from 'react-google-login';

require('dotenv').config()

const clientId = process.env.CLIENT_ID;;

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