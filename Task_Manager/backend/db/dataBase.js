const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  await mongoose
    .connect(process.env.mongoUrl)
    .then(() => {
      console.log("database connected..");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDb;
