const express = require("express");
const jwt = require("jsonwebtoken");
const {
  authenticateAdminToken,
  authenticateCustomerToken,
} = require("../middleware/auth");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const sharp = require("sharp");

require("dotenv").config();

const app = express();
const cors = require("cors");
const router = express.Router();
// app.use(express.json());

const Stationery = require("../models/stationery.models");
const Category = require("../models/category.models");
const upload = require("../middleware/upload");

// -----------S3 related variables ------------------

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// -------------Generate Random Unique Image Name---------------------

const randomImageName = (bytes = 16) =>
  crypto.randomBytes(bytes).toString("hex");

// ------------------------------------------------------

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
  console.log(body);

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

// Image Upload
router.post(
  "/upload",
  cors(),
  upload.single("product_image"),
  async (req, res) => {
    console.log(req.body);
    // console.log(req.file);
    // console.log(req.file.buffer); // buffer is the actual image data need to be sent to s3

    // resize image
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    // create put command
    const params = {
      Bucket: bucketName,
      // Key: req.file.originalname,
      Key: randomImageName(),
      Body: req.file.buffer,
      // Body: buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    // Send the image to S3 bucket & save
    await s3.send(command);

    // res.send({
    //   status: 201,
    //   message: "Image saved successfully!",
    // });

    // Save stationery details in db
    saveProductDetailsToDB(req.body, res);
  }
);

// Update Stationery
// Authorized only for Admin
router.put("/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const body = req.body;
    const stationeryExist = await Stationery.findOne({
      st_code: req.params.id,
    });

    if (stationeryExist == null) {
      return res
        .status(404)
        .send({ status: 404, message: "Category not found." });
    }
    stationeryExist.st_name = body.st_name;
    stationeryExist.description = body.description;
    stationeryExist.unit_price = body.unit_price;
    stationeryExist.qty_on_hand = body.qty_on_hand;
    stationeryExist.category_id = body.category_id;

    // Update the stationery in the database
    const updatedStationery = await stationeryExist.save();
    return res.send({
      status: 200,
      user: updatedStationery,
      message: "Stationery updated successfully!",
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

const saveProductDetailsToDB = async (body, res) => {
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
};
module.exports = router;
