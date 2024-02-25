const connect = require("./config/db");
const app = require(".");
require("dotenv").config();
const port = process.env.PORT || 3000;
app.listen(port, async (req, res) => {
  await connect();
  console.log(`Server is listening on port ${port}`);
  //   res.send("Welcome to chatbot!");
  console.log("Welcome to chatbot!");
});
