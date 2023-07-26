const express = require("express");
const {
  authenticateAdminToken,
  authenticateCustomerToken,
  verifyToken,
} = require("../middleware/auth");

const app = express();
const cors = require("cors");
const router = express.Router();
// app.use(express.json());

const Orders = require("../models/orders.models");
const BillingDetails = require("../models/billinginfo.models");

// Get all billing info - Admin
router.get("/getAll", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const billingInfo = await BillingDetails.find();
    return res.status(200).json({ status: 200, data: billingInfo });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get billing info by user_id - Customer - in use
router.get(
  "/user/getAll",
  cors(),
  authenticateCustomerToken,
  async (req, res) => {
    try {
      const verifiedToken = verifyToken(req.headers.authorization, res);

      const billingInfoFound = await BillingDetails.findOne({
        user_id: verifiedToken.user_id,
      });
      if (!billingInfoFound) {
        console.log("No any billing details found for this user");
        return res.status(404).send({
          status: 404,
          message: "No any billing details found for this user.",
        });
      }

      return res.status(200).json({ status: 200, data: billingInfoFound });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Save billing info - Customer
router.post("/", cors(), authenticateCustomerToken, async (req, res) => {
  try {
    const verified = verifyToken(req.headers.authorization, res);
    const body = req.body;
    if (verified.user_id != body.user_id) {
      return res.status(403).send({ status: 403, message: "Access denied." });
    }

    // Get the last inserted billing_id from the database
    const lastBillingInfo = await BillingDetails.findOne(
      {},
      {},
      { sort: { billing_id: -1 } }
    );
    let nextBillingId = 1;

    console.log("lastBillingInfo: " + lastBillingInfo);

    if (lastBillingInfo) {
      nextBillingId = lastBillingInfo.billing_id + 1;
    }
    console.log("nextBillingId: " + nextBillingId);

    // Create a new billing detail instance
    const newBilling = new BillingDetails({
      billing_id: nextBillingId,
      first_name: body.first_name,
      last_name: body.last_name,
      country: body.country,
      province: body.province,
      city: body.city,
      street_address: body.street_address,
      zip_code: body.zip_code,
      phone_no: body.phone_no,
      // Payment Details
      card_payment: body.card_payment,
      cash_on_delivery: body.cash_on_delivery,
      card_no: body.card_no,
      card_holder_name: body.card_holder_name,
      card_expire_date: body.card_expire_date,
      card_cvv: body.card_cvv,
      // --------------
      billing_status: body.billing_status,
      coupon_price: body.coupon_price,
      user_id: body.user_id,
    });

    // Save the info to the database
    const savedBilling = await newBilling.save();
    res.status(201).send({
      status: 201,
      category: savedBilling,
      message: "Billing details saved successfully!",
    });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
});

// Update billing info - Customer
router.put("/", cors(), authenticateCustomerToken, async (req, res) => {
  try {
    const body = req.body;

    if (!body.user_id) {
      return res.status(400).send({
        status: 400,
        message: "User not authorized. Please log again.",
      });
    }

    const verified = verifyToken(req.headers.authorization, res);
    console.log("verified.user_id : " + verified.user_id);
    if (verified.user_id != body.user_id) {
      return res.status(403).send({ status: 403, message: "Access denied." });
    }

    const billingInfoExist = await BillingDetails.findOne({
      user_id: verified.user_id,
    });

    if (!billingInfoExist) {
      return res
        .status(404)
        .send({ status: 404, message: "No any billing details found." });
    }

    // Update with new info
    billingInfoExist.first_name = body.first_name;
    billingInfoExist.last_name = body.last_name;
    billingInfoExist.country = body.country;
    billingInfoExist.province = body.province;
    billingInfoExist.city = body.city;
    billingInfoExist.street_address = body.street_address;
    billingInfoExist.zip_code = body.zip_code;
    if (billingInfoExist.phone_no != body.phone_no)
      billingInfoExist.phone_no = body.phone_no;
    // Payment Details
    billingInfoExist.card_payment = body.card_payment;
    billingInfoExist.cash_on_delivery = body.cash_on_delivery;
    billingInfoExist.card_no = body.card_no;
    billingInfoExist.card_holder_name = body.card_holder_name;
    billingInfoExist.card_expire_date = body.card_expire_date;
    billingInfoExist.card_cvv = body.card_cvv;
    // --------------
    billingInfoExist.billing_status = body.billing_status;
    billingInfoExist.coupon_price = body.coupon_price;
    billingInfoExist.user_id = body.user_id;

    // Update the info to the database
    const updatedBilling = await billingInfoExist.save();
    res.status(200).send({
      status: 200,
      category: updatedBilling,
      message: "Billing details updated successfully!",
    });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
});

// Delete billin info - Customer
router.delete(
  "/:billingId",
  cors(),
  authenticateCustomerToken,
  async (req, res) => {
    try {
      const body = req.body;

      const billingInfoExist = await BillingDetails.findOne({
        billing_id: req.params.billingId,
      });

      if (!billingInfoExist) {
        return res
          .status(404)
          .send({ status: 404, message: "No any billing details found." });
      }

      const verified = verifyToken(req.headers.authorization, res);
      if (verified.user_id != billingInfoExist.user_id) {
        return res.status(403).send({ status: 403, message: "Access denied." });
      }

      let deletedBilling = await BillingDetails.deleteOne(billingInfoExist);

      return res.send({
        status: 200,
        message: "Billing details deleted successfully!",
        data: deletedBilling,
      });
    } catch (err) {
      return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

module.exports = router;
