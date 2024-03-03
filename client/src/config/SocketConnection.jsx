import React from "react";
import io from "socket.io-client";
import axios from "axios";
import { useState, useEffect } from "react";
import Chat from "../Component/Chat";
import "./SocketConnection.css";
const socket = io.connect("http://localhost:4500");
export function SocketConnection() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3> Join A Chat</h3>
          <input
            type="text"
            placeholder="name.."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Room Id"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>join chat</button>
        </div>
      ) : (
        <Chat key={socket.id} socket={socket} username={username} room={room} />
      )}
    </div>
  );
}
