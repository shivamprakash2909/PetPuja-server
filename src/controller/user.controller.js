import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwt.js";
import jwt from "jsonwebtoken";

//register controller ""/api/user/register"
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log("Received data:", req.body);
    //validate user input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //check passsword length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    //check if user exist
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    //create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar: "/assets/avatar.png",
    });
    await newUser.save();
    const token = generateToken(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("Error in registerUser controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//login controller: "/api/user/login"
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found, Invalid credential" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token,
      message: "Login Successful",
    });
  } catch (error) {
    console.log("Error in loginUser controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//logout controller: "/api/user/logout"

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out Successfully" });
  } catch (error) {
    console.error("Error in logoutUser controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
