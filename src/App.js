import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UserProfileGrid from './UserProfile';


function App() {
  function isLoggedIn() {
    // stub: todo get isLoggedIn from server session
    return true;
  }
  
  function getMatch() {
    fetch('/api/v1/match', {
      method: 'GET',
      headers: {
        
      },
    })
    .then(response => {
      return response.json();
    }).then(responseData => {
      
    })
    
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            exact
            path="/"
          >
            <div className="App">
              <Login />
              <Logout />
            </div>
          </Route>
          <Route
            path="/profile" >
            {isLoggedIn() ? 
              (
                <UserProfileGrid />
              ) : (
                <Redirect to="/" />
              )
            }
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}


export default App;
