import React, { useEffect } from "react";
import { useState } from "react";
import "../config/SocketConnection.css";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
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
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat 🔴</p>
      </div>
      <ScrollToBottom className="message-container">
        <div className="chat-body">
          {messageList.map((messageData) => {
            return (
              <div
                className="message"
                id={username === messageData.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageData.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageData.time}</p>
                    <p id="author">{messageData.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollToBottom>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type a message"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>
          <strong> ➡️</strong>
        </button>
      </div>
    </div>
  );
}

export default Chat;
