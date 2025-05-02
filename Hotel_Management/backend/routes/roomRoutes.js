const express = require("express");
const roomController = require("../controller/roomController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/addRoom", auth, roomController.addRoom);
router.get("/getRoom/:id", auth, roomController.getRoom);

module.exports = router;
