const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: true, message: "Welcome to chatbot!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "error in getting data from bit: " + err.message,
    });
  }
});

module.exports = router;
