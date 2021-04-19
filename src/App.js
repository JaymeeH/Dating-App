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

  return (
    <div className="App">
      <Login />
      <Logout />
    </div>
    );
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            exact
            path="/"
          >
            <UserProfileGrid />
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
  ;
}


export default App;
