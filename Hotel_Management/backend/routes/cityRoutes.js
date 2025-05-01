const express = require("express");
const cityController = require("../controller/cityController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/addCity", auth, cityController.addCity);
router.get("/getAllCity", auth, cityController.getAllCity);
router.get("/getCitiesByState/:stateId", auth, cityController.getCitiesByState);
router.patch("/updateCity", auth, cityController.updateCity);
router.put("/inactiveCity/:id", auth, cityController.inactiveCity);
router.delete("/deleteCity/:id", auth, cityController.deleteCity);

module.exports = router;
