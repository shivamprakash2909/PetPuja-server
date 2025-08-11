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
      required: true,
      image: String,
    },
    payment_id: {
      type: "String",
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refunded"],
      default: "pending",
    },
    address: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);
