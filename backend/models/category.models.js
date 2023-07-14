const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = new mongoose.Schema({
  category_id: {
    type: Number,
    required: true,
    unique: true,
    // validate: {
    //   validator: function (val) {
    //     return /(CTG-000)[0-9]/.test(val);
    //   },
    //   message: (val) => "Invalid Category Code!",
    // },
  },

  category: {
    type: String,
    required: true,
  },
});

categorySchema.pre("deleteOne", async function (next) {
  console.log("--------a-----------");
  console.log(this._conditions.category_id);
  const categoryId = this._conditions.category_id;

  // Check if any products are associated with the category
  const products = await mongoose
    .model("Stationery")
    .find({ category_id: categoryId });

  console.log("--------b-----------");

  if (products.length > 0) {
    console.log("--------c-----------");
    return next(
      new Error("Cannot delete categories associated with products.")
    );
  }

  console.log("--------d-----------");
  next();
});

module.exports = mongoose.model("Category", categorySchema);
