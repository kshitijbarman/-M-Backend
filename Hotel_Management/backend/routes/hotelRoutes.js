const express = require("express");
const hotelController = require("../controller/hotelController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/addHotel", auth, hotelController.addHotel);
router.post("/upload", auth, hotelController.upload);
router.get("/getAllHotel", auth, hotelController.getAllHotel);
router.get("/getHotelByCity/:cityId", auth, hotelController.getHotelByCity);
// router.patch("/updateCity", auth, cityController.updateCity);
// router.put("/inactiveCity/:id", auth, cityController.inactiveCity);
// router.delete("/deleteCity/:id", auth, cityController.deleteCity);

module.exports = router;
