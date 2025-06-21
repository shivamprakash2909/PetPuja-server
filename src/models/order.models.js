import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    order_id: {
      type: String,
      required: [true, "Order ID is required"],
      unique: true,
    },
    product_id: {
      type: mongoose,
      ref: "Product",
    },
    product_details: {
      name: String,
      image: String,
    },
    payment_id: {},
  },
  { timestamps: true }
);
