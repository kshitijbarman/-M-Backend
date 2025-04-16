const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");

router.post("/signUp", userController.createUsers);
router.post("/login", userController.login);
router.post("/forget", userController.forgetPassword);
router.post("/reset", userController.resetPassword);
router.get("/getAll", auth, userController.getUser);
module.exports = router;
