const jwt = require("jsonwebtoken");
const secret = "hjhdfd6f7fydhfdufyd7f6d7fd";
const userModel = require("../model/userModel");

module.exports = async (req, res, next) => {
  const barreToken = req.headers.authorization;
  console.log(">>>>>barreToken>>>>>>>>", barreToken);
  if (!barreToken) {
    return res.status(401).json({ message: "no token provided" });
  }
  const token = barreToken.split(" ")[1];
  console.log(">>>>>>>>token>>>>>>>>>>", token);

  if (!token) {
    return res.status(401).json({ message: "no token found" });
  }

  const decode = jwt.verify(token, secret);
  console.log(">>>>>>>decode>>>>>>>", decode);

  if (!decode) {
    return res.status(401).json({ message: "invalid token" });
  }

  const user = await userModel.findOne({ email: decode.email });
  console.log(">>>>>>user>>>>>>", user);

  if(!user){
    return res.status(401).json({message:"invalid user"})
   }

  next()
};
