import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: [
      {
        type: String,
      },
    ],
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    sub_category_id: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
    },
    unit: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: null,
    },
    Price: {
      type: Number,
      default: null,
    },
    discount: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    more_details: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
