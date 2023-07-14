const express = require("express");
const jwt = require("jsonwebtoken");
const {
  authenticateAdminToken,
  authenticateCustomerToken,
} = require("../middleware/auth");

const app = express();
const cors = require("cors");
const router = express.Router();
// app.use(express.json());

const Stationery = require("../models/stationery.models");
const Category = require("../models/category.models");

// Get all stationery
router.get("/getAll", cors(), async (req, res) => {
  try {
    const stationeries = await Stationery.find();
    return res.status(200).json({ status: 200, data: stationeries });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Save stationery
// Authorized only for Admin
router.post("/", cors(), authenticateAdminToken, async (req, res) => {
  const body = req.body;

  try {
    // Check if stationery already exists
    const stationeryExist = await Stationery.findOne({ st_name: body.st_name });
    if (stationeryExist) {
      return res
        .status(400)
        .json({ status: 400, message: "Similar stationery already exists." });
    }

    // Get the last inserted st_code from the database
    const lastCode = await Stationery.findOne(
      {},
      {},
      { sort: { st_code: -1 } }
    );
    let nextCode = 1;

    if (lastCode) {
      nextCode = lastCode.st_code + 1;
    }

    // Get the category by name
    const categoryExist = await Category.findOne({
      category_id: body.category_id,
    });
    if (categoryExist == null) {
      return res
        .status(404)
        .send({ status: 404, message: "Category not found." });
    }

    // Create a new stationery instance
    const newStationery = new Stationery({
      st_code: nextCode,
      st_name: body.st_name,
      description: body.description,
      unit_price: body.unit_price,
      qty_on_hand: body.qty_on_hand,
      category_id: body.category_id,
    });

    // Save the stationery to the database
    const savedStationery = await newStationery.save();
    res.send({
      status: 201,
      category: savedStationery,
      message: "New stationery saved successfully!",
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Delete Stationery
// Authorized only for Admin
router.delete("/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const stationeryExist = await Stationery.findOne({
      st_code: req.params.id,
    });
    if (stationeryExist == null) {
      return res
        .status(404)
        .send({ status: 404, message: "Stationery not found." });
    }
    let deletedStationery = await Stationery.deleteOne(stationeryExist);

    return res.send({
      status: 200,
      message: "Stationery deleted successfully!",
      data: deletedStationery,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

module.exports = router;
