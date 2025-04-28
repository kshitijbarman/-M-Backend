const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/signup", userController.createUsers);
router.post("/verifyOtp", userController.verifyOtp);
router.post("/resend-otp", userController.resendOtp);
router.post("/login", userController.login);
router.post("/forget", userController.forgetPassword);

module.exports = router;
