import { Food } from "../models/food.model.js";
import fs from "fs";
import upload from "../lib/multer.js";
import cloudinary from "../lib/cloudinary.js";

//add food
export const addFood = async (req, res) => {
  try {
    const imageFile = req.file;
    if (!imageFile) {
      res.status(400).json({ message: "Image file is required" });
    }
    const food = new Food({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: {
        url: imageFile.path,
        public_id: imageFile.filename,
      },
    });
    await food.save();
    res.status(200).json({
      message: "Food added Successfully",
    });
  } catch (error) {
    console.error("Error in food controller: ", error);
    res.status(500).json({ message: error.message || "Internal server Error" });
  }
};

//list all foods
export const listAllFoods = async (req, res) => {
  try {
    const food = await Food.find({});
    res.status(200).json({
      data: food,
    });
  } catch (error) {
    console.error("Error in fetching food-list: ", error);
    res.status(500).json({ message: error.message || "Internal server Error" });
  }
};

//list all food categories
export const categoryList = async (req, res) => {
  try {
    const categories = await Food.distinct("category");
    res.status(200).json({ data: categories });
  } catch (error) {
    console.error("Error in fetching categories: ", error);
    res.status(500).json({ message: error.message || "Internal server Error" });
  }
};

//delete a food
export const deleteFood = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Food ID (_id) is required" });
    }
    const food = await Food.findById(_id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (food.image && food.image.public_id) {
      console.log("Here");
      await cloudinary.uploader.destroy(food.image.public_id);
      console.log(`Deleted Cloudinary image: ${food.image.public_id}`);
    }
    await Food.findByIdAndDelete(_id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food deleted successfully", data: food });
  } catch (error) {
    console.error("Error in deleting food: ", error);
    res.status(500).json({ message: error.message || "Internal server Error" });
  }
};
