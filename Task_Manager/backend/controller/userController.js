const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

exports.createUsers = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  const existingEmail = await userModel.findOne({ email });

  if (existingEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const salt = bcrypt.genSaltSync(10);
  console.log(">>>>>>>>salt>>>>>>", salt);

  const hash = bcrypt.hashSync(password, salt);
  const newUser = new userModel({
    name,
    email,
    phone,
    password: hash,
    role,
  });

  await newUser.save();
  res.status(201).json({ message: "User created successfully", user: newUser });
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
  console.log(dbPassword);
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
  console.log(">>>>>token>>>>>>", token);
  res.status(200).json({ message: "login successfully", token: token });
};

exports.delete = async (req, res) => {};
