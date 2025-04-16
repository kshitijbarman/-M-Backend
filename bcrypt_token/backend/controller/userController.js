const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "hjhdfd6f7fydhfdufyd7f6d7fd";

exports.createUsers = async (req, res) => {
  const { email, password, name, phone } = req.body;
  const existingEmail = await userModel.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "email already exist" });
  }

  const salt = bcrypt.genSaltSync(10);
  console.log(">>>>>>salt>>>>>>", salt);

  const hash = bcrypt.hashSync(password, salt);
  console.log(">>>>>>>hash>>>>>>>", hash);

  const result = {
    name,
    email,
    phone,
    password: hash,
  };

  const user = new userModel(result);
  const data = await user.save();
  console.log(">>>>>>data>>>>>", data);
  res.status(201).json(data);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const existingEmail = await userModel.findOne({ email });
  console.log(existingEmail);
  if (!existingEmail) {
    return res.status(400).json({ message: "email not exist" });
  }
  const dbPassword = existingEmail.password;
  console.log(dbPassword);
  const isMatch = bcrypt.compareSync(password, dbPassword);
  console.log(isMatch);

  if (!isMatch) {
    return res.status(404).json({ message: "password incorrect" });
  }

  const token = jwt.sign(
    {
      email,
    },
    secret,
    { expiresIn: "2m" }
  );

  console.log(">>>>>>>token>>>>>>>>>", token);
  res.status(200).json({ message: "login successfully", token: token });
};
exports.forgetPassword = async (req, res) => {
  const { email, password } = req.body;
  const existingEmail = await userModel.findOne({ email });
  console.log(existingEmail);

  if (!existingEmail) {
    return res.status(404).json({ message: "email not exist" });
  }

  const salt = bcrypt.genSaltSync(10);
  console.log(salt);
  const hash = bcrypt.hashSync(password, salt);
  console.log(hash);
  existingEmail.password = hash;
  await existingEmail.save();
  return res.status(200).json({ message: "Password reset successfully" });
};

exports.resetPassword = async (req, res) => {
  const { email, password, newPassword } = req.body;
  const existingEmail = await userModel.findOne({ email });
  console.log(existingEmail);
  if (!existingEmail) {
    return res.status(404).json({ message: "email not exist" });
  }
  const dbPassword = existingEmail.password;
  const isMatch = bcrypt.compareSync(password, dbPassword);
  console.log(isMatch);

  if (!isMatch) {
    return res.status(404).json({ message: "old password incorrect" });
  }

  const salt = bcrypt.genSaltSync(10);
  console.log(salt);
  const hash = bcrypt.hashSync(newPassword, salt);
  console.log(hash);
  existingEmail.password = hash;
  await existingEmail.save();
  return res.status(200).json({ message: "Password reset successfully" });
};

exports.getUser = async (req, res) => {
  const data = await userModel.find();
  console.log(data);
  res.status(200).json(data);
};
