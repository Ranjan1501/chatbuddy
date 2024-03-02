import React from "react";
import io from "socket.io-client";
import axios from "axios";
import { useState, useEffect } from "react";
import Chat from "../Component/Chat";

const socket = io.connect("http://localhost:4500");
export function SocketConnection() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <>
      <h3> Welcome to bot🤖</h3>
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
      <Chat socket={socket} username={username} room={room} />
    </>
  );
}
