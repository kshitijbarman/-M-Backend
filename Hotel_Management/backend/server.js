const express = require("express");
require("dotenv").config();
const cors = require("cors");
// const fileUpload = require("express-fileupload");

const dbConnection = require("../backend/db/dataBase");
const hotelRoutes = require("./routes/hotelRoutes");
const userRoutes = require("../backend/routes/userRoutes");
const stateRoutes = require("./routes/stateRoutes");
const cityRoutes = require("./routes/cityRoutes");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
// app.use(fileUpload());
// app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/state", stateRoutes);
app.use("/city", cityRoutes);
app.use("/hotel", hotelRoutes);

dbConnection();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
