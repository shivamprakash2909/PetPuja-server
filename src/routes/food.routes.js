import express from "express";
import { addFood, categoryList, deleteFood, listAllFoods } from "../controller/food.controller.js";
import { Food } from "../models/food.model.js";
import upload from "../lib/multer.js";

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/food-list", listAllFoods);
foodRouter.get("/category-list", categoryList);
foodRouter.post("/delete", deleteFood);

export default foodRouter;
