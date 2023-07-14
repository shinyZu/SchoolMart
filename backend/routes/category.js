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

// Search category by Id
// Authorized only for Admins
router.get("/admin/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const categoryExist = await Category.findOne({
      category_id: req.params.id,
    });
    if (categoryExist == null) {
      return res
        .status(404)
        .send({ status: 404, message: "Category not found." });
    }
    return res.send({
      status: 200,
      data: categoryExist,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
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
    const lastCategory = await Category.findOne(
      {},
      {},
      { sort: { category_id: -1 } }
    );
    let nextCategoryId = 1;

    console.log("lastCategory: " + lastCategory);

    if (lastCategory) {
      nextCategoryId = lastCategory.category_id + 1;
    }
    console.log("nextCategoryId: " + nextCategoryId);

    // Create a new category instance
    const newCategory = new Category({
      category_id: nextCategoryId,
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
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Update Category
// Authorized only for Admin
router.put("/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const body = req.body;
    const categoryExist = await Category.findOne({
      category_id: req.params.id,
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
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Delete Category
// Authorized only for Admin
router.delete("/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const categoryExist = await Category.findOne({
      category_id: req.params.id,
    });
    if (categoryExist == null) {
      return res
        .status(404)
        .send({ status: 404, message: "Category not found." });
    }
    let deletedCategory = await Category.deleteOne(categoryExist);

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
