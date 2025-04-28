// const jwt = require("jsonwebtoken");
// const secret = process.env.secretKey;
// const userModel = require("../model/userModel");

// module.exports = async (req, res, next) => {
//   const barreToken = req.headers.authorization;
//   console.log(">>>>>barreToken>>>>>>>>", barreToken);
//   if (!barreToken) {
//     return res.status(401).json({ message: "no token provided" });
//   }
//   const token = barreToken.split(" ")[1];
//   console.log(">>>>>>>>token>>>>>>>>>>", token);

//   if (!token) {
//     return res.status(401).json({ message: "no token found" });
//   }

//   const decode = jwt.verify(token, secret);
//   console.log(">>>>>>>decode>>>>>>>", decode);

//   if (!decode) {
//     return res.status(401).json({ message: "invalid token" });
//   }

//   req.user = {
//     id: user._id,
//     email: user.email,
//     role: user.role,
//   };

//   const user = await userModel.findOne({ email: decode.email });
//   console.log(">>>>>>user>>>>>>", user);

//   if (!user) {
//     return res.status(401).json({ message: "invalid user" });
//   }

//   req.user = user;

//   next();
// };

const jwt = require("jsonwebtoken");
const secret = process.env.secretKey;
const userModel = require("../model/userModel");

module.exports = async (req, res, next) => {
  const barreToken = req.headers.authorization;
  // console.log(">>>>> barreToken >>>>>>>", barreToken);

  if (!barreToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = barreToken.split(" ")[1];
  // console.log(">>>>> token >>>>>>>", token);

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decode = jwt.verify(token, secret);
    // console.log(">>>>> decode >>>>>>>", decode);

    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Fetch user from database after decoding the token
    const user = await userModel.findOne({ email: decode.email });
    // console.log(">>>>> user >>>>>>>", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    // Set the user info on the req object
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid token or error occurred" });
  }
};
