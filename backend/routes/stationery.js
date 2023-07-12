const express = require("express");
const app = express();
var cors = require("cors");
const router = express.Router();
// app.use(express.json());

const Stationery = require("../models/stationery.models");

router.get("/", cors(), async (req, res) => {
  try {
    // const stationeries = await Stationery.find();
    // res.json(stationeries);
    return res.status(200).send("Stationery API working!");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
