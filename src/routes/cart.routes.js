import express from "express";
import { addToCart, getCart, removeFromCart } from "../controller/cart.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", checkAuth, addToCart);
cartRouter.post("/remove", checkAuth, removeFromCart);
cartRouter.get("/get", checkAuth, getCart);

export default cartRouter;
