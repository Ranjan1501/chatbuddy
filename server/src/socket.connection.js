const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("id:", socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);

    console.log(`User having socket id ${socket.id} joioned the room ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("user message data:", data);
  });

  socket.on("disconnect", () => {
    console.log(`User having socket id ${socket.id} is  disconnected now `);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
