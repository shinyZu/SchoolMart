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
  UploadPartOutputFilterSensitiveLog,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

require("dotenv").config();

const app = express();
const cors = require("cors");
const router = express.Router();

const Stationery = require("../models/stationery.models");
const Category = require("../models/category.models");
const upload = require("../middleware/upload");

// -------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  googleUpload,
  uploadFile,
  deleteFile,
  generatePublicURL,
} = require("../middleware/googleRouter"); // YT

const drive_base_url = "https://drive.google.com/uc";

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

// Get all stationery by a given category Id - in use
router.get("/bycategory/:id", cors(), async (req, res) => {
  try {
    const categoryExist = await Category.findOne({
      category_id: req.params.id,
    });
    if (categoryExist == null) {
      return res
        .status(404)
        .send({ status: 404, message: "Category not found." });
    }

    const stationeries = await Stationery.find({
      category_id: req.params.id,
    });
    return res.status(200).json({ status: 200, data: stationeries });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Get next stationery id - in use
router.get("/next/id", cors(), authenticateAdminToken, async (req, res) => {
  try {
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

    res.send({
      status: 200,
      data: { next_id: nextCode },
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get new arrvals (last 6 )- in use
router.get("/new/arrival", cors(), async (req, res) => {
  try {
    const lastSixRecords = await Stationery.find({})
      .sort({ st_code: -1 })
      .limit(6);

    res.status(200).send({
      status: 200,
      data: lastSixRecords,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get sorted stationery list - in use
router.get("/sort/:type/:id", cors(), async (req, res) => {
  try {
    const sortType = req.params.type;
    const categoryId = req.params.id;
    console.log(sortType);
    console.log(categoryId);
    let sortedList = [];

    // Sort all products
    if (categoryId == 0) {
      if (sortType === "ascending") {
        sortedList = await Stationery.find({}).sort({
          unit_price: 1,
        });
      } else if (sortType === "descending") {
        sortedList = await Stationery.find({}).sort({
          unit_price: -1,
        });
      }
    } else {
      if (sortType === "ascending") {
        sortedList = await Stationery.find({ category_id: categoryId }).sort({
          unit_price: 1,
        });
      } else if (sortType === "descending") {
        sortedList = await Stationery.find({ category_id: categoryId }).sort({
          unit_price: -1,
        });
      }
    }

    res.status(200).send({
      status: 200,
      data: sortedList,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Search stationery by Id
// Authorized only for Admins
router.get("/admin/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
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
      image_name: body.image_name,
      image_url: body.image_url,
      unit_price: body.unit_price,
      qty_on_hand: body.qty_on_hand,
      category_id: body.category_id,
    });

    // Save the stationery to the database
    const savedStationery = await newStationery.save();
    res.status(201).send({
      status: 201,
      category: savedStationery,
      message: "New stationery saved successfully!",
    });
  } catch (err) {
    // return res.send({
    //   status: 400,
    //   message: err.message,
    // });
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Get Image By Id
router.get("/image/:id", cors(), async (req, res) => {
  try {
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
  authenticateAdminToken,
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

// Update Stationery only (no img) in DB - in use
// Authorized only for Admin
router.put("/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const body = req.body;
    const stationeryExist = await checkStationeryExist(req.params.id, res);
    if (!stationeryExist) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found." });
    }

    stationeryExist.st_name = body.st_name;
    stationeryExist.description = body.description;
    // stationeryExist.image_name = body.image_name;
    // stationeryExist.image_url = body.image_url;
    stationeryExist.unit_price = body.unit_price;
    stationeryExist.qty_on_hand = body.qty_on_hand;
    stationeryExist.category_id = body.category_id;

    // Update the stationery in the database
    const updatedStationery = await stationeryExist.save();
    return res.status(200).send({
      status: 200,
      user: updatedStationery,
      message: "Product updated successfully!",
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Update Both Image in S3 & Stationery in DB
router.put(
  "/updatewithimage/:id",
  cors(),
  upload.single("product_image"),
  authenticateAdminToken,
  async (req, res) => {
    try {
      const stationeryExist = await checkStationeryExist(req.params.id, res);

      // resize image
      const buffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();

      // create delete command to delete image from s3 before updating
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

// Update QtyOnHand -Admin
router.put(
  "/qty/:id/:qty",
  cors(),
  authenticateAdminToken,
  async (req, res) => {
    try {
      const body = req.body;
      const stationeryExist = await checkStationeryExist(req.params.id);

      stationeryExist.qty_on_hand = req.params.qty;

      // Update the stationery qty in the database
      updateQtyOnHand(stationeryExist, res);
      //   const updatedStationery = await stationeryExist.save();
      //   return res.send({
      //     status: 200,
      //     user: updatedStationery,
      //     message: "Quantity updated successfully!",
      //   });
    } catch (err) {
      //   return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

const updateQtyOnHand = async (stationeryExist, res) => {
  try {
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
};

// Delete Stationery
// Authorized only for Admin
router.delete("/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const stationeryExist = await checkStationeryExist(req.params.id, res);

    // delete image from s3 bucket
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
      const stationeryExist = await checkStationeryExist(req.params.id, res);

      // delete image from s3 bucket
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
        .json({ status: 400, message: "Similar product already exists." });
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
      message: "Product saved successfully!",
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
    return null;
    // return res
    //   .status(404)
    //   .send({ status: 404, message: "Stationery not found." });
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

// --------------Upload images usin Google Drive API -------------

// Save image to drive - working
router.post(
  "/drive/upload",
  cors(),
  googleUpload.single("product_image"),
  authenticateAdminToken,
  async (req, res) => {
    try {
      const { body, file } = req;

      // Upload file to drive
      const response = await uploadFile(file);

      res.send({
        status: 201,
        message: "File uploaded successfully!",
        data: {
          file_id: response.data.id,
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error.message);
      return res.status(500).send({ status: 500, message: error.message });
    }
  }
);

// Save product to database (with image url) - post(/drive/url/prod) - working
router.post(
  "/drive/url/prod",
  cors(),
  googleUpload.single("product_image"),
  authenticateAdminToken,
  async (req, res) => {
    try {
      const { body, file } = req;

      // Check if stationery already exists
      const stationeryExist = await Stationery.findOne({
        st_name: body.st_name,
      });
      if (stationeryExist) {
        return res
          .status(400)
          .json({ status: 400, message: "Similar product already exists." });
      }

      // Upload file to drive
      const response = await uploadFile(file);

      const fileId = response.data.id;
      const imageName = file.originalname;

      if (!fileId) {
        return res
          .status(404)
          .send({ status: 404, message: "File not found." });
      }

      // Generate public image URL & save the product to DB
      saveProductToDB(body, res, imageName, fileId);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      return res.status(500).send({ status: 500, message: error.message });
    }
  }
);

const saveProductToDB = async (body, res, imageName, fileId) => {
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

    // Get the category by id
    const categoryExist = await Category.findOne({
      category_id: body.category_id,
    });
    if (categoryExist == null) {
      return res
        .status(404)
        .send({ status: 404, message: "Category not found." });
    }

    // Create image url
    const public_image_url = `${drive_base_url}?id=${fileId}`;

    // Create a new stationery instance
    const newStationery = new Stationery({
      st_code: nextCode,
      st_name: body.st_name,
      description: body.description,
      image_name: imageName,
      image_url: public_image_url,
      unit_price: body.unit_price,
      qty_on_hand: body.qty_on_hand,
      category_id: body.category_id,
    });

    // Save the stationery to the database
    const savedStationery = await newStationery.save();
    res.status(201).send({
      status: 201,
      data: savedStationery,
      message: "Stationery saved successfully!",
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
};

// Update image url in db - for testing - working
router.put(
  "/image/details/:id",
  cors(),
  // upload.single("product_image"),
  authenticateAdminToken,
  async (req, res) => {
    try {
      const stationeryExist = await checkStationeryExist(req.params.id, res);
      const body = req.body;

      // Update the stationery in the database
      stationeryExist.image_name = body.image_name;
      stationeryExist.image_url = body.image_url;

      const updatedStationery = await stationeryExist.save();
      return res.send({
        status: 200,
        user: updatedStationery,
        message: "Image details updated successfully!",
      });
    } catch (err) {
      return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

// Upload Image only - post(/drive/url/db) - in use
router.put(
  "/drive/url/db/:st_code",
  cors(),
  upload.single("product_image"),
  authenticateAdminToken,
  async (req, res) => {
    try {
      const stationeryExist = await checkStationeryExist(req.params.st_code);
      if (!stationeryExist) {
        return res
          .status(404)
          .json({ status: 404, message: "Product not found." });
      }

      // resize image
      const buffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();

      // Get current image url
      const current_url = stationeryExist.image_url;
      console.log("current_url: " + current_url);

      let current_fileId = "";

      // Upload new image
      const upload_response = await uploadFile(req.file);

      const new_fileId = upload_response.data.id;
      const new_imageName = req.file.originalname;

      // Create new image url
      const new_public_image_url = `${drive_base_url}?id=${new_fileId}`;
      console.log("new_public_image_url: " + new_public_image_url);

      // Update the stationery in the database
      stationeryExist.image_name = new_imageName;
      stationeryExist.image_url = new_public_image_url;

      const updatedStationery = await stationeryExist.save();

      let del_response = null;
      if (current_url != "") {
        // Extract the current file id from the url
        current_fileId = current_url.split("id=")[1];
        console.log("current_fileId: " + current_fileId);

        // Delete current image from drive
        del_response = await deleteFile(current_fileId);

        if (!del_response && del_response.status == 204) {
          return res.status(200).send({
            status: 200,
            data: {
              file_id: upload_response.data.id,
            },
            message: "Image updated successfully!",
          });
        }
      } else if (current_url == "") {
        return res.status(200).send({
          status: 200,
          data: {
            file_id: upload_response.data.id,
          },
          message: "Image updated successfully!",
        });
      }
      // else {
      return res.status(200).send({
        status: 200,
        data: {
          file_id: upload_response.data.id,
        },
        message: "Image updated successfully!",
      });
      // }
    } catch (err) {
      return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

// Save product to database (without image) - previous post()

//------------------------------------

// Delete image from Google Drive - Admin
router.delete(
  "/drive/image/:id",
  cors(),
  authenticateAdminToken,
  async (req, res) => {
    try {
      const fileId = req.params.id;

      const response = await deleteFile(fileId);

      return res.send({
        status: 200,
        message: "File deleted successfully!",
        data: {
          status: response.status,
          data: response.data,
        },
        // data: response,
      });
    } catch (error) {
      console.error("Error deleting file:", error.message);
      return res.status(500).send({ status: 500, message: error.message });
    }
  }
);

// Delete Stationery (with image in drive)- Admin - in use
router.delete(
  "/drive/:id",
  cors(),
  authenticateAdminToken,
  async (req, res) => {
    try {
      const stationeryExist = await checkStationeryExist(req.params.id, res);

      if (!stationeryExist) {
        return res
          .status(404)
          .send({ status: 404, message: "Stationery not found." });
      }

      // Get current image url
      const current_url = stationeryExist.image_url;
      console.log(current_url);

      // Extract the current file id from the url
      const current_fileId = current_url.split("id=")[1];
      console.log(current_fileId);

      // delete image from drive
      const response = await deleteFile(current_fileId);

      // delete image from DB
      let deletedStationery = await Stationery.deleteOne(stationeryExist);

      return res.status(200).send({
        status: 200,
        message: "Product deleted successfully!",
        data: deletedStationery,
      });
    } catch (err) {
      return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

// Delete Stationery (without image) - Admin
router.delete("/only/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const stationeryExist = await checkStationeryExist(req.params.id, res);

    if (!stationeryExist) {
      return res
        .status(404)
        .send({ status: 404, message: "Stationery not found." });
    }

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

// Generate public URL for drive
router.get("/generate/public/url/:id", async (req, res) => {
  try {
    const fileId = req.params.id;

    const response = await generatePublicURL(fileId);

    return res.send({
      status: 200,
      message: "Public URL generated successfully!",
      data: {
        webViewLink: response.data.webViewLink,
        webContentLink: response.data.webViewLink,
      },
      data: response,
    });
  } catch (error) {
    console.error("Error deleting file:", error.message);
    return res.status(500).send({ status: 500, message: error.message });
    // res.status(500).send("Error deleting file");
  }
});

module.exports = { checkStationeryExist, updateQtyOnHand, router };
