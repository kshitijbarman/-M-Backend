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

// const saleSchema = new mongoose.Schema({
//   data: mongoose.Schema.Types.Mixed,
// });

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: false,
    },
    address: {
      type: String,
      require: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const studentData = mongoose.model("students", studentSchema);

// getAll
// app.get("/get", async (req, res) => {

//   const myData=await studentData.find()
//   console.log(myData)
//   res.status(200).json(myData)
// });

//getOne
// app.get("/get/:id", async (req, res) => {

//   const {id}=req.params
//   const myData=await studentData.find({_id:id})
//   console.log(myData)
//   res.status(200).json(myData)
// });

// post

// app.post("/get", async (req, res) => {
//   console.log(req.body);
//   // return
//   const myData = new studentData(req.body)
//   const data= await myData.save()
//   console.log(data)
//   res.status(201).json(data)
// });

// update

app.patch("/get/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const update = await studentData.findByIdAndUpdate(id, data);
  res.status(200).json({ message: "data updated", data });
});

//delete

// app.delete("/get/:id", async (req, res) => {
//   const { id } = req.params;
//   const myData = await studentData.findByIdAndDelete({ _id: id });
//   res.status(200).json({ message: "data deleted", data: myData });
// });

app.listen(port, () => console.log(`Server is running on port ${port}`));
