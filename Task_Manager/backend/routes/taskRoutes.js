const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const auth = require("../middleware/auth");

router.post("/add-task", auth, taskController.addTask);
router.get("/getAll", auth, taskController.getAll);
router.delete("/delete", taskController.delete);
module.exports = router;
