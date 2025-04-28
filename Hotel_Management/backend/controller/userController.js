const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const userModel = require("../model/userModel");
const { sendOtpEmail } = require("../utils/sendMail");
// const { uploadFile } = require("../utils/helper");

const SENDER_EMAIL = process.env.email;
const mailKey = process.env.pass;

exports.createUsers = async (req, res) => {
  try {
    const { name, email, phone, age, gender, password } = req.body;

    if (!email || !name || !password || !phone || !age || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpTimer = moment().add(10, "minutes").toDate();

    const emailSent = await sendOtpEmail(email, otp, SENDER_EMAIL, mailKey);
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }
    console.log(">>>>emailSent>>>>", emailSent);

    const newUser = new userModel({
      name,
      email,
      phone,
      age,
      gender,
      password: hash,
      otp,
      otpTimer,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
      },
      process.env.secretKey
    );

    return res.status(200).json({
      message: "User created and OTP sent",
      email: newUser.email,
    });
  } catch (err) {
    console.error("Error in createUsers:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  const existingEmail = await userModel.findOne({ email });
  if (!existingEmail) {
    return res.status(404).json({ message: "Email not found" });
  }

  const currentTime = new Date();
  if (currentTime > new Date(existingEmail.otpTimer)) {
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (existingEmail.otp == otp) {
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(401).json({ message: "Invalid OTP" });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const generateOTP = Math.floor(100000 + Math.random() * 900000).toString();
  const newOtp = generateOTP;
  const otpExpiry = Date.now() + 5 * 60 * 1000;

  // Update user OTP
  user.otp = newOtp;
  user.otpExpire = otpExpiry;
  await user.save();

  // Send Email
  const message = `Your new OTP is: ${newOtp}\nIt is valid for 5 minutes.`;
  const otp = newOtp;
  await sendOtpEmail(
    user.email,
    otp,
    SENDER_EMAIL,
    mailKey,
    "Your New OTP Code",
    message
  );

  res.status(200).json({ message: "OTP resent successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const existingEmail = await userModel.findOne({ email });

  if (!existingEmail) {
    return res.status(400).json({ message: "Email not exists" });
  }
  const dbPassword = existingEmail.password;

  const isMatch = bcrypt.compareSync(password, dbPassword);

  if (!isMatch) {
    return res.status(404).json({ message: "password incorrect" });
  }
  const token = jwt.sign(
    {
      email: existingEmail.email,
      id: existingEmail._id,
      role: existingEmail.role,
    },
    process.env.secretKey
  );

  await userModel.findOneAndUpdate(
    { email },
    {
      otp: "",
      otpTimer: "",
      isVerified: true,
    }
  );

  // console.log(">>>>>token>>>>>>", token);

  res.status(200).json({
    message: "Login successfully",
    token: token,
    role: existingEmail.role,
  });
};

exports.forgetPassword = async (req, res) => {
  const { email, password } = req.body;

  const existingEmail = await userModel.findOne({ email });

  if (!existingEmail) {
    return res.status(404).json({ message: "email not exist" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  existingEmail.password = hash;
  await existingEmail.save();
  return res.status(200).json({ message: "Password reset successfully" });
};
