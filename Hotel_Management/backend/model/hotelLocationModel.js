const mongoose = require("mongoose");

const hotelLocationSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      // required: true,
    },

    latitude: {
      type: Number,
      //   required: true,
    },
    longitude: {
      type: Number,
      //   required: true,
    },
    isActive: {
      type: String,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("hotelLocation", hotelLocationSchema);
