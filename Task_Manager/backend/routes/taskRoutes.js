const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const auth = require("../middleware/auth");

router.post("/add-task", auth, taskController.addTask);
router.get("/getTask", auth, taskController.getTask);
router.delete("/delete", auth, taskController.delete);
router.get("/getAll", auth, taskController.getAll);
module.exports = router;
