import "./Match.css";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { unMatch } from "./unMatch.js";

export const socket = io();

function App() {
  var matches;
  return unMatch();
}
export default App;
reportWebVitals();
