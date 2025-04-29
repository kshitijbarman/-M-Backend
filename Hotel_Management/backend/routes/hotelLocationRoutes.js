const express = require("express");
const hotelLocationController = require("../controller/hotelLocationController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/area", hotelLocationController.createLocation);
router.get("/getAll", hotelLocationController.getAll);
router.patch("/update", hotelLocationController.update);
router.patch("/inactive", hotelLocationController.inactive);
router.patch("/active", hotelLocationController.active);
router.delete("/delete", hotelLocationController.delete);

module.exports = router;
