const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    // code: {
    //   type: String,
    //   require: true,
    // },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
    },
    isActive: {
      type: String,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("city", citySchema);
