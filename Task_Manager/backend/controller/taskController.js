const taskModel = require("../model/taskModel");

exports.addTask = async (req, res) => {
  const { title, category, description, dueDate } = req.body;

  const existingTask = await taskModel.findOne({ title, category });
  if (existingTask) {
    return res.status(400).json({ message: " task already exists." });
  }

  const newTask = new taskModel({
    title,
    category,
    description,
    dueDate,
    userId: req.user.id,
  });

  try {
    const savedTask = await newTask.save();
    res
      .status(201)
      .json({ message: "Task added successfully", task: savedTask });
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};

exports.getAll = async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;
  console.log(">>>role>>>>", role);
  console.log(">>>>>req.user>>>>>>>>", req.user);
  if (role === "admin") {
    const data = await taskModel.find().populate("userId", "name email role");
    console.log(data);
    res.status(200).json(data);
  }
  if (role === "user") {
    const data = await taskModel
      .find({ userId })
      .populate("userId", "name email");
    console.log(data);
    res.status(200).json(data);
  }
};

exports.delete = async (req, res) => {
  const { taskId } = req.body;
  try {
    const deletedTask = await taskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
