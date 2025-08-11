import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Food", // Change "Food" to your actual product model
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

export const CartProduct = mongoose.model("CartProduct", cartProductSchema);
