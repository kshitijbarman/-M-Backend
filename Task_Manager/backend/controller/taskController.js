const taskModel = require("../model/taskModel");

exports.addTask = async (req, res) => {
  const { title, category, description, dueDate, assignedTo } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const existingTask = await taskModel.findOne({ title, category });
  console.log(existingTask);

  if (existingTask) {
    return res.status(400).json({ message: " task already exists." });
  }

  const newTask = new taskModel({
    title,
    category,
    description,
    dueDate,
    userId: req.user.id,
    assignedTo,
    // assignedBy: req.user.id,
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
  // console.log(">>>role>>>>", role);
  // console.log(">>>>>req.user>>>>>>>>", req.user);
  if (role === "admin") {
    const data = await taskModel.find().populate("userId", "name email role");
    // console.log(data);
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
  console.log(taskId);
  try {
    const deletedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// exports.getTask = async (req, res) => {
//   // console.log(req.user.id);
//   const userId = req.user.id;
//   const taskData = await taskModel
//     .find({ userId, isDeleted: false })
//     .populate("userId", "title category description dueDate status createdAt");
//   return res.status(200).json(taskData);
// };

exports.getTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskData = await taskModel
      .find({ userId, isDeleted: false })
      .populate("assignedTo", "name email")
      .select("title category description dueDate status createdAt assignedTo");

    if (!taskData.length) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    console.log(taskData);
    return res.status(200).json(taskData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};
