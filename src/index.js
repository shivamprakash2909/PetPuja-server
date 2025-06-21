import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/user.routes.js";
import foodRouter from "./routes/food.routes.js";

const app = express();
dotenv.config();

//app config
app.use(
  cors({
    credentials: true,
    origin: "process.env.FRONTEND_URL ",
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
app.use("/api/user", router);
app.use("/api/user", router);

//server setup
connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
