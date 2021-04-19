import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UserProfileGrid from './UserProfile';

function App() {
  const [Email, setEmail] = useState('');
  const [LogState, setLogState] = useState(false);
  const [ifNJIT, setIfNJIT] = useState(false);
  const isLoggedIn = () => {
    //console.log('[Login Success] currentUser:',res.profileObj );
    if(LogState === true){
      if(ifNJIT === true){
        return Email;
      }
    }
    return false;
    
    
  };
    
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            exact
            path="/"
          >
            <div className="App">
              <Login onClick={isLoggedIn} email={Email} setter={setEmail} 
              logState={LogState} logSetter={setLogState} 
              Id={ifNJIT} setId={setIfNJIT}/>
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
