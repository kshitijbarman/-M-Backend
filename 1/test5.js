const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 6969;
const mongoUrl = "mongodb://localhost:27017/ReGex";
app.use(express.json());
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// app.post("/calculation", (req, res) => {
//   console.log(req.body);
//   //   return;
//   const { a, b, c, d } = req.body;
//   const myData = a + (b * c) / d;
//   res.send({ myData });
// });


app.post("/calculation", (req, res) => {
    console.log(req.body);
    const { a, b, c, d } = req.body;
    const myData = a + (b * c / d);
    res.send({ result: myData });
  });
  

app.listen(port, () => console.log(`Server is running on port ${port}`));
