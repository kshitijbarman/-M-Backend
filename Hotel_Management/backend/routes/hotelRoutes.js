const express = require("express");
const hotelController = require("../controller/hotelController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/addHotel", auth, hotelController.addHotel);
// router.get("/getAllCity", auth, cityController.getAllCity);
// router.get("/getCitiesByState/:stateId", auth, cityController.getCitiesByState);
// router.patch("/updateCity", auth, cityController.updateCity);
// router.put("/inactiveCity/:id", auth, cityController.inactiveCity);
// router.delete("/deleteCity/:id", auth, cityController.deleteCity);

module.exports = router;
