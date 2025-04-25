const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    phone: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // required: true,
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
    otpTimer: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("users", userSchema);
