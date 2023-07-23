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

// Get all categories - in use
// Authorized only for Admin
router.get("/getAll", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ status: 200, data: categories });
  } catch (error) {
    return res.status(500).send({ status: 500, messge: error });
  }
});

// Get next category id - in use
router.get("/next/id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    // Get the last inserted st_code from the database
    const lastCode = await Category.findOne(
      {},
      {},
      { sort: { category_id: -1 } }
    );
    let nextCode = 1;

    if (lastCode) {
      nextCode = lastCode.category_id + 1;
    }

    res.send({
      status: 200,
      data: { next_id: nextCode },
    });
  } catch (error) {
    res.status(500).send(error);
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

// Save category - in use
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
    res.status(201).send({
      status: 201,
      data: savedCategory,
      message: "Category saved successfully!",
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Update Category - in use
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
    return res.status(200).send({
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

    return res.status(200).send({
      status: 200,
      message: "Category deleted successfully!",
      data: deletedCategory,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});
module.exports = router;
