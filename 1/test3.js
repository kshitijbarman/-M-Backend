const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const app = express();

mongoose
  .connect(process.env.mongoUrl)
  .then(() => console.log("mondoDb Connected.."))
  .catch((err) => console.log(err));

  const userSchema=new mongoose.Schema({
    data:mongoose.Schema.Types.Mixed
  })

  const userData= mongoose.model('users',userSchema)
  
app.get("/local", async (req, res) => {
  console.log(req.body)
  return
    const mondoData=await userData.find()
    console.log(mondoData)
  res.send(mondoData);
});

// app.get("/:id", async (req, res) => {
//     const {id} =req.params
//         // const mondoData=await userData.find()
//         const mondoData=await userData.findById({_id:id})
//       res.send(mondoData);
//     });

// app.get("/", async (req, res) => {
//     const {name} =req.query
//     console.log(name)
//         // const mondoData=await userData.findById({_id:id})
//         const mondoData=await userData.findOne({name:String(name)})
//     console.log(mondoData)
//       res.send(mondoData);
//     // res.json(mondoData.toObject());

//     });

app.listen(process.env.PORT,()=>{console.log(`server is running on port ${process.env.PORT}`)})