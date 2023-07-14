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

const Category = require("../models/category.models");

// Get all categories
// Authorized only for Admin
router.get("/getAll", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ status: 200, data: categories });
  } catch (error) {
    return res.status(500).send({ status: 500, messge: error });
  }
});

// Save category
// Authorized only for Admin
router.post("/", cors(), authenticateAdminToken, async (req, res) => {
  const body = req.body;

  try {
    // Check if category already exists
    const categoryExist = await Category.findOne({ category: body.category });
    if (categoryExist) {
      return res
        .status(400)
        .json({ status: 400, message: "Similar category already exists." });
    }

    // Get the last inserted category_code from the database
    const lastCategoryCode = await Category.findOne(
      {},
      {},
      { sort: { category_code: -1 } }
    );
    let nextCategoryCode = 1;

    if (lastCategoryCode) {
      nextCategoryCode = lastCategoryCode.category_code + 1;
    }

    // Create a new category instance
    const newCategory = new Category({
      category_code: nextCategoryCode,
      category: body.category,
    });

    // Save the category to the database
    const savedCategory = await newCategory.save();
    res.send({
      status: 201,
      category: savedCategory,
      message: "New category saved successfully!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update Category
// Authorized only for Admin
router.put("/:id", cors(), authenticateAdminToken, async (req, res) => {
  const body = req.body;
  const categoryExist = await Category.findOne({
    category_code: req.params.id,
  });

  if (categoryExist == null) {
    return res
      .status(404)
      .send({ status: 404, message: "Category not found." });
  }
  categoryExist.category = body.category;

  // Update the category in the database
  const updatedCategory = await categoryExist.save();
  return res.send({
    status: 200,
    user: updatedCategory,
    message: "Category updated successfully!",
  });
});

// Delete Category
// Authorized only for Admin
router.delete("/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const categoryExist = await Category.findOne({
      category_code: req.params.id,
    });
    console.log("categoryExist: " + categoryExist);
    if (categoryExist == null) {
      return res
        .status(404)
        .send({ status: 404, message: "Category not found." });
    }
    let deletedCategory = await categoryExist.deleteOne(categoryExist);

    return res.send({
      status: 200,
      message: "Category deleted successfully!",
      data: deletedCategory,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});
module.exports = router;
