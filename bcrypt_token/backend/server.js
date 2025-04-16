const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./db/dataBase");
const useRoute = require("./router/userRouter");
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

dbConnect();
app.use("/user", useRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
