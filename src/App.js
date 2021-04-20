import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Logout from "./components/Logout";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import UserProfileGrid from "./UserProfile";

function App() {
  function isLoggedIn() {
    // stub: todo get isLoggedIn from server session
    return true;
  }

  const [activeProfile, changeProfile] = useState("", "", "");
  function getMatch() {
    console.log("reached getMatch function");
    document.getElementById("profile").style.display = "block";
    fetch("/api/v1/match", {
      method: "POST",
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const newList = [...activeProfile];
        newList[0] = responseData.name;
        newList[1] = responseData.percentage;
        newList[2] = responseData.email;
        changeProfile(newList);
      });
  }

  function unMatch() {
    document.getElementById("profile").style.display = "none";
    console.log("reached unMatch function");
    fetch("/api/v1/unMatch", {
      method: "POST",
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {});
  }

  function expandProfile() {
    if (document.getElementById("profileViewer").style.display === "none") {
      document.getElementById("profileViewer").style.display = "block";
    } else {
      document.getElementById("profileViewer").style.display = "none";
    }
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <Login />
              <Logout />
              <button type="button" onClick={() => getMatch()}>
                Match
              </button>
              <div className="Profile" id="profile">
                <p>
                  <button type="button" onClick={() => expandProfile()}>
                    {activeProfile[0]}
                  </button>
                  <button type="button" onClick={() => unMatch()}>
                    Unmatch
                  </button>
                  <br></br>
                  <div className="profileViewer" id="profileViewer">
                    Percentage compatability: {activeProfile[1]}%<br></br>
                  </div>
                </p>
              </div>
            </div>
          </Route>
          <Route path="/profile">
            {isLoggedIn() ? <UserProfileGrid /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
