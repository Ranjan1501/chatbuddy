import React, { useEffect } from "react";
import { useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getDate() +
          ":" +
          parseInt(new Date().getMonth() + 1) +
          ":" +
          new Date(Date.now()).getFullYear() +
          " " +
          "at:" +
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Received user message data in frontend :", data);
    });
  }, [socket]);
  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message"
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>
          <strong> ➡️</strong>
        </button>
      </div>
    </div>
  );
}

export default Chat;
