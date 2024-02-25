// const express = require("express");
// const app = express();
require("dotenv").config();
// const port = process.env.PORT;

// app.listen(port, () => {
//   console.log("Server is listening on port " + port);
// });

// app.get("/", (req, res) => {
//   res.send("Welcome to chatbot!");
// });
// app.get("chatbot", (req, res) => {});
const mongo_uri = process.env.MONGO_URI;
const mongoose = require("mongoose");
const connect = () => {
  return mongoose.connect(mongo_uri, {});
};

module.exports = connect;
