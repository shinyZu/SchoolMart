const express = require("express");
const jwt = require("jsonwebtoken");
const {
  authenticateAdminToken,
  authenticateCustomerToken,
} = require("../middleware/auth");

const crypto = require("crypto");
const sharp = require("sharp");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

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

// Search stationery by Id
// Authorized only for Admins
router.get("/admin/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    // const stationeryExist = await Stationery.findOne({
    //   st_code: req.params.id,
    // });
    // if (stationeryExist == null) {
    //   return res
    //     .status(404)
    //     .send({ status: 404, message: "Stationery not found." });
    // }

    const stationeryExist = await checkStationeryExist(req.params.id, res);
    return res.send({
      status: 200,
      data: stationeryExist,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Save stationery as json req body
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

// Get Image By Id
router.get("/image/:id", cors(), async (req, res) => {
  try {
    // const stationeryExist = await Stationery.findOne({
    //   st_code: req.params.id,
    // });
    // if (stationeryExist == null) {
    //   return res
    //     .status(404)
    //     .send({ status: 404, message: "Stationery not found." });
    // }

    const stationeryExist = await checkStationeryExist(req.params.id, res);

    const stationeries = await Stationery.find();

    for (const st of stationeries) {
      if (st.st_code == req.params.id) {
        return res.send({
          status: 200,
          st_code: st.st_code,
          image_url: st.image_url,
        });
      }
    }
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Get All Images from S3
router.get("/images", cors(), async (req, res) => {
  try {
    const stationeries = await Stationery.find();

    const imagesList = [];
    for (const st of stationeries) {
      imagesList.push({ st_code: st.st_code, image_url: st.image_url });
    }
    return res.send({
      status: 200,
      images: imagesList,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Upload Images to S3 & Save Stationery as form-data
router.post(
  "/savewithimage",
  cors(),
  upload.single("product_image"),
  // authenticateAdminToken,
  async (req, res) => {
    // console.log(req.body);
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
    saveProductDetailsToDB(req.body, res, params.Key);
  }
);

// Upload Image only
router.put(
  "/image/:id",
  cors(),
  upload.single("product_image"),
  authenticateAdminToken,
  async (req, res) => {
    try {
      // const stationeryExist = await Stationery.findOne({
      //   st_code: req.params.id,
      // });

      // if (!stationeryExist) {
      //   return res
      //     .status(404)
      //     .send({ status: 404, message: "Stationery not found." });
      // }

      const stationeryExist = await checkStationeryExist(req.params.id);

      // resize image
      const buffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();

      // create put command
      const put_params = {
        Bucket: bucketName,
        Key: randomImageName(),
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      const put_command = new PutObjectCommand(put_params);

      // Send the image to S3 bucket & save
      await s3.send(put_command);

      // Create image url
      const getObjectParams = {
        Bucket: bucketName,
        Key: put_params.Key,
      };
      const get_command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, get_command, { expiresIn: 3600 });

      // Update the stationery in the database
      stationeryExist.image_name = put_params.Key;
      stationeryExist.image_url = url;

      const updatedStationery = await stationeryExist.save();
      return res.send({
        status: 200,
        data: updatedStationery,
        message: "Image updated successfully!",
      });
    } catch (err) {
      return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

// Update Stationery only (no img) in DB
// Authorized only for Admin
router.put("/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const body = req.body;
    // const stationeryExist = await Stationery.findOne({
    //   st_code: req.params.id,
    // });

    // if (stationeryExist == null) {
    //   return res
    //     .status(404)
    //     .send({ status: 404, message: "Stationery not found." });
    // }

    const stationeryExist = await checkStationeryExist(req.params.id, res);

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

// Update QtyOnHand -Admin
router.put(
  "/qty/:id/:qty",
  cors(),
  authenticateAdminToken,
  async (req, res) => {
    try {
      const body = req.body;
      // const stationeryExist = await Stationery.findOne({
      //   st_code: req.params.id,
      // });

      // if (!stationeryExist) {
      //   return res
      //     .status(404)
      //     .send({ status: 404, message: "Stationery not found." });
      // }

      const stationeryExist = await checkStationeryExist(req.params.id);

      stationeryExist.qty_on_hand = req.params.qty;

      // Update the stationery qty in the database
      const updatedStationery = await stationeryExist.save();
      return res.send({
        status: 200,
        user: updatedStationery,
        message: "Quantity updated successfully!",
      });
    } catch (err) {
      return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

// Update Both Image in S3 & Stationery in DB
router.put(
  "/updatewithimage/:id",
  cors(),
  upload.single("product_image"),
  authenticateAdminToken,
  async (req, res) => {
    try {
      // const stationeryExist = await Stationery.findOne({
      //   st_code: req.params.id,
      // });

      // if (stationeryExist == null) {
      //   return res
      //     .status(404)
      //     .send({ status: 404, message: "Stationery not found." });
      // }

      const stationeryExist = await checkStationeryExist(req.params.id, res);

      // resize image
      const buffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();

      // create delete command to delete image from s3 before updating
      // const delete_params = {
      //   Bucket: bucketName,
      //   Key: stationeryExist.image_name,
      // };

      // const delete_command = new DeleteObjectCommand(delete_params);
      // await s3.send(delete_command);

      deleteImage(stationeryExist.image_name);

      // create put command
      const put_params = {
        Bucket: bucketName,
        Key: randomImageName(),
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      const put_command = new PutObjectCommand(put_params);

      // Send the image to S3 bucket & save
      await s3.send(put_command);

      // Create image url
      const getObjectParams = {
        Bucket: bucketName,
        Key: put_params.Key,
      };
      const get_command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, get_command, { expiresIn: 3600 });

      // Update the stationery in the database

      stationeryExist.st_name = req.body.st_name;
      stationeryExist.description = req.body.description;
      stationeryExist.image_name = put_params.Key;
      stationeryExist.image_url = url;
      stationeryExist.unit_price = req.body.unit_price;
      stationeryExist.qty_on_hand = req.body.qty_on_hand;
      stationeryExist.category_id = req.body.category_id;

      const updatedStationery = await stationeryExist.save();
      return res.send({
        status: 200,
        user: updatedStationery,
        message: "Stationery updated successfully!",
      });
    } catch (err) {
      return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

// Delete Stationery
// Authorized only for Admin
router.delete("/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    // const stationeryExist = await Stationery.findOne({
    //   st_code: req.params.id,
    // });
    // if (stationeryExist == null) {
    //   return res
    //     .status(404)
    //     .send({ status: 404, message: "Stationery not found." });
    // }

    const stationeryExist = await checkStationeryExist(req.params.id, res);

    // // delete image from s3 bucket
    // const delete_params = {
    //   Bucket: bucketName,
    //   Key: stationeryExist.image_name,
    // };

    // const delete_command = new DeleteObjectCommand(delete_params);
    // await s3.send(delete_command);
    deleteImage(stationeryExist.image_name);

    // delete image from DB
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

// Delete Image from s3
// Authorized only for Admin
router.delete(
  "/image/:id",
  cors(),
  authenticateAdminToken,
  async (req, res) => {
    try {
      // const stationeryExist = await Stationery.findOne({
      //   st_code: req.params.id,
      // });

      // if (stationeryExist == null) {
      //   return res
      //     .status(404)
      //     .send({ status: 404, message: "Stationery not found." });
      // }

      const stationeryExist = await checkStationeryExist(req.params.id, res);

      // // delete image from s3 bucket
      // const delete_params = {
      //   Bucket: bucketName,
      //   Key: stationeryExist.image_name,
      // };

      // const delete_command = new DeleteObjectCommand(delete_params);
      // await s3.send(delete_command);

      deleteImage(stationeryExist.image_name);

      // Update the stationery in the database
      stationeryExist.image_name = null;
      stationeryExist.image_url = null;

      const updatedStationery = await stationeryExist.save();
      return res.send({
        status: 200,
        data: updatedStationery,
        message: "Image deleted successfully!",
      });
    } catch (err) {
      return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

const saveProductDetailsToDB = async (body, res, imageName) => {
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

    // Create image url
    const getObjectParams = {
      Bucket: bucketName,
      Key: imageName,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    // Create a new stationery instance
    const newStationery = new Stationery({
      st_code: nextCode,
      st_name: body.st_name,
      description: body.description,
      image_name: imageName,
      image_url: url,
      unit_price: body.unit_price,
      qty_on_hand: body.qty_on_hand,
      category_id: body.category_id,
    });

    // Save the stationery to the database
    const savedStationery = await newStationery.save();
    res.send({
      status: 201,
      category: savedStationery,
      message: "Stationery saved successfully!",
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
};

const checkStationeryExist = async (id, res) => {
  const stationeryExist = await Stationery.findOne({
    st_code: id,
  });

  if (!stationeryExist) {
    return res
      .status(404)
      .send({ status: 404, message: "Stationery not found." });
  } else {
    return stationeryExist;
  }
};

const deleteImage = async (imageName) => {
  // delete image from s3 bucket
  const delete_params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const delete_command = new DeleteObjectCommand(delete_params);
  await s3.send(delete_command);
};

module.exports = router;
