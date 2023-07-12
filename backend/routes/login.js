const express = require("express");
const app = express();
var cors = require("cors");
const router = express.Router();
// app.use(express.json());

const Login = require("../models/login.models");

router.get("/", cors(), async (req, res) => {
  try {
    return res.status(200).send("Login API working!");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
