const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/signup", userController.createUsers);
router.post("/verifyOtp", userController.verifyOtp);
router.post("/login", userController.login);
// user page info
router.get("/getUser", auth, userController.getUser);
router.post("/upload", auth, userController.upload);
//
router.get("/getAdmin", auth, userController.getAdmin);
router.get("/getALL", auth, userController.getALL);
router.delete("/delete", auth, userController.delete);
router.patch("/active", auth, userController.active);
// router.post("/signup", auth, userController.sendMail);

module.exports = router;
