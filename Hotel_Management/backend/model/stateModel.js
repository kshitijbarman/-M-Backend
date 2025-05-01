const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    isActive: {
      type: String,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("state", stateSchema);
