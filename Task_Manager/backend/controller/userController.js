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
    const { name, email, phone, password } = req.body;

    if (!email || !name || !password || !phone) {
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

    const newUser = new userModel({
      name,
      email,
      phone,
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
  console.log(email);
  console.log(otp);
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
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  const existingEmail = await userModel.findOne({ email });
  console.log(existingEmail);
  if (!existingEmail) {
    return res.status(400).json({ message: "Email not exists" });
  }
  const dbPassword = existingEmail.password;

  const isMatch = bcrypt.compareSync(password, dbPassword);
  console.log(isMatch);
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

  console.log(">>>>>token>>>>>>", token);
  // res.status(200).json({ message: "login successfully", token: token });
  res.status(200).json({
    message: "Login successfully",
    token: token,
    role: existingEmail.role,
  });
};

exports.getUser = async (req, res) => {
  // console.log(req.user.id);
  const userId = req.user.id;
  const userData = await userModel.findById(userId);
  // console.log(userData);
  return res.status(200).json(userData);
};
exports.getAdmin = async (req, res) => {
  const adminData = await userModel.find({ role: "admin" });
  return res.status(200).json(adminData);
};
exports.getALL = async (req, res) => {
  const adminData = await userModel.find({ role: "user" });
  return res.status(200).json(adminData);
};

exports.delete = async (req, res) => {
  const { taskId } = req.body;
  // console.log(taskId);

  const updatedTask = await userModel.findByIdAndUpdate(
    taskId,
    { status: "inactive" },
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res
    .status(200)
    .json({ message: "Task marked as inactive", task: updatedTask });
};
exports.active = async (req, res) => {
  const { taskId } = req.body;

  try {
    const updatedTask = await userModel.findByIdAndUpdate(
      taskId,
      { status: "active" },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task marked as active", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// // exports.sendMail = async (email, otp) => {
// //   try {
// //     // Create a transporter using your email service
// //     const transporter = nodemailer.createTransport({
// //       service: "gmail", // e.g., Gmail
// //       auth: {
// //         user: "your-email@gmail.com", // your email
// //         pass: "your-app-password-or-pass", // use App Password if 2FA is enabled
// //       },
// //     });

// //     // Define email options
// //     const mailOptions = {
// //       from: '"Your App Name" <your-email@gmail.com>',
// //       to: email,
// //       subject: "Your OTP Code",
// //       text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
// //       html: `<p>Your <b>OTP</b> is: <b>${otp}</b></p><p>This code is valid for 5 minutes.</p>`,
// //     };

// //     // Send the email
// //     const info = await transporter.sendMail(mailOptions);
// //     console.log("Email sent: " + info.response);
// //     return true;
// //   } catch (error) {
// //     console.error("Error sending email:", error);
// //     return false;
// //   }
// // };
