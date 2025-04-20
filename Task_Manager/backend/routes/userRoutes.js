const express = require("express");
const userController=require('../controller/userController')
const router = express.Router();

router.post("/signup",userController.createUsers)
router.post("/login",userController.login)
router.delete("/login",userController.delete)

module.exports = router;
