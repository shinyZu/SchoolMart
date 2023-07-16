const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    unique: true,
  },

  order_date: {
    type: Date,
    required: true,
  },

  order_cost: {
    type: Number, // can store both integers and decimal numbers
    required: true,
  },

  order_status: {
    type: String,
    required: true,
  },

  user_id: {
    type: Number,
    required: true,
  },
});

orderSchema.pre("deleteOne", async function (next) {
  console.log(this._conditions.order_id);
  const orderId = this._conditions.order_id;

  // Get the order details that are associated with the order_id
  const orderDetails = await mongoose
    .model("Orders")
    .find({ order_id: orderId });

  // for (const od of orderDetails) {
  //   console.log("Deleting order details......");
  //   await mongoose.model("OrderDetail").deleteMany({ order_id: orderId });
  // }

  if (orderDetails.length > 0) {
    console.log("Deleting order details......");
    await mongoose.model("OrderDetail").deleteMany({ order_id: orderId });
  }

  next();
});

// orderSchema.pre("save", async function (next) {
//   console.log("pre save......");
//   try {
//     // console.log(req.body);

//     next();
//   } catch (err) {
//     return next(new Error(err.message));
//   }
// });

module.exports = mongoose.model("Orders", orderSchema);
