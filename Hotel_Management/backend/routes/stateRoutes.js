const express = require("express");
const stateController = require("../controller/stateController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/addState", auth, stateController.addState);
router.get("/getAllState", auth, stateController.getAllState);
router.patch("/update", auth, stateController.updateState);
router.patch("/inactiveState", auth, stateController.inactiveState);
router.patch("/activeState", auth, stateController.activeState);
router.delete("/delete/:id", auth, stateController.delete);

module.exports = router;
