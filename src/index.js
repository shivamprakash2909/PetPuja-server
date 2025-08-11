import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import foodRouter from "./routes/food.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app = express();
dotenv.config();

//app config
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token", "Authorization"],
  })
);

//middleware
app.use(express.json());
app.use(cookieParser());

//health check
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is healthy",
  });
});

//api endpoints
app.get("/", (req, res) => {
  res.json({
    message: "Server Running on: " + PORT,
  });
});
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

//server setup
connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
