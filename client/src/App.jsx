import logo from "./logo.svg";
// import "./App.css";
import React from "react";
import { SocketConnection } from "./config/SocketConnection";
function App() {
  return (
    <>
      <SocketConnection />
    </>
  );
}

export default App;
