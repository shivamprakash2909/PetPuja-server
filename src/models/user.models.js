import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      length: [6, "Password must be at least 6 characters long"],
    },
    avatar: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobile: {
      type: String,
      default: null,
      match: [/^\d{10}$/, "Please enter a valid mobile number"],
      unique: [true, "Mobile number already exists"],
    },
    refresh_token: {
      type: String,
      default: "",
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    last_login_date: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "Suspended"],
      default: "active",
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CartProduct",
        quantity: { type: Number, default: 1 },
      },
    ],
    order_history: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
