import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UserProfileGrid from './UserProfile';
import DisplayMatchPage from './AfterMatchPage';


function App() {
  const [Email, setEmail] = useState('');
  const [LogState, setLogState] = useState(false);
  const [ifNJIT, setIfNJIT] = useState(false);
  const isLoggedIn = () => {
    //console.log('[Login Success] currentUser:',res.profileObj );
    if(LogState){
      if(ifNJIT){
        return Email;
      }
    }
    return false;
  };
  
  const [matchEmail, setMatchEmail] = useState('');
  return (
    <div>
    {isLoggedIn() && matchEmail !== '' &&
      <DisplayMatchPage email={matchEmail} setMatchEmail={setMatchEmail}/>
    }
    {isLoggedIn() && matchEmail === '' &&
        <UserProfileGrid email={Email} setMatchEmail={setMatchEmail} />
    }
    {!isLoggedIn() &&
      <div className="App">
        <Login onClick={isLoggedIn} email={Email} setter={setEmail} 
          logState={LogState} logSetter={setLogState} 
                Id={ifNJIT} setId={setIfNJIT}/>
              <Logout logState={LogState} logSetter={setLogState}/>
            </div>
            }>
          </Route>
        </Switch>

    }
    </div>
  );
}


export default App;
