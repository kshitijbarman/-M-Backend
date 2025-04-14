const express = require("express");
const mongoose = require("mongoose");
const port = 6969;
const app = express();
// const mongoUrl = "mongodb://127.0.0.1:27017/";
const mongoUrl =
  "mongodb+srv://kshitijbarman1234:kshitij123@cluster0.rfhd7.mongodb.net/otp&age";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("mongoDb Connected..."))
  .catch((err) => console.log("mongodb not connected", err));

  const otpSchema=new mongoose.Schema({
    otp:Number,
    createdAt:{
        type:Date,
        default:Date.now,
        expires:300  
    }
  })
  const otpData=mongoose.model('otp',otpSchema)




app.get("/otp", async (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    try {
      await OtpModel.create({ otp });
      res.status(200).json({ message: "OTP generated", otp }); // Don't send 'otp' in production
    } catch (err) {
      res.status(500).json({ message: "Error generating OTP", error: err.message });
    }
  });



  const ageSchema=new mongoose.Schema({
    dob:{
        type:Date,
    },
    age:{
        type:Number
    }
  })
  const ageData=mongoose.model('age',ageSchema)

  app.post('/age',(req,res)=>{
    const {dob}=req.body
    const birthDay=new Date(dob)
  })

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
