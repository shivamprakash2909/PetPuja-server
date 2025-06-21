import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      typr: String,
      default: "",
    },
    mage: {
      type: String,
      default: "",
    },
    category_id: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
