const express = require("express");
const app = express();
const botController = require("./controllers/bot.controllers");
app.use(express.json());
app.use("/", botController);

module.exports = app;
