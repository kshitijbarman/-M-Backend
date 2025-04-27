const taskModel = require("../model/taskModel");
const userModel = require("../model/userModel");

exports.addTask = async (req, res) => {
  const { title, category, description, dueDate, assignedTo } = req.body;
  console.log(req.body);
  console.log(req.user.id);
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
    assignedBy: req.user.id,
  });
  console.log(newTask);
  const savedTask = await newTask.save();
  console.log(savedTask);

  // try {
  //   const savedTask = await newTask.save();
  //   res
  //     .status(201)
  //     .json({ message: "Task added successfully", task: savedTask });
  // } catch (error) {
  //   res.status(500).json({ message: "Error adding task", error });
  // }
};

exports.assignTask = async (req, res) => {
  const { title, category, description, dueDate, assignedTo } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const existingUer = await userModel.findById({ _id: assignedTo });
  console.log(existingUer.name);
  // return;
  if (!existingUer) {
    return res.status(400).json({ message: "user not exists" });
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
    assignedTo: existingUer._id,
    assignedBy: req.user.id,
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
  console.log(req.user.role);

  if (role === "admin") {
    const data = await taskModel
      .find()
      .populate("userId", "name email role")
      // .populate("assignedBy", "name email role")
      .populate("assignedTo", "name email role");

    res.status(200).json(data);
  }

  if (role === "user") {
    const data = await taskModel
      .find({ assignedTo: userId })
      .populate("userId", "name email")
      // .populate("assignedBy", "name email role")
      .populate("assignedTo", "name email role");
    console.log("fetchData", data);

    res.status(200).json(data);
  }
};

exports.delete = async (req, res) => {
  const { taskId } = req.body;
  console.log(taskId);
  try {
    const deletedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { isDeleted: true, status: "cancelled" },
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

exports.update = async (req, res) => {
  const { title, category, description, dueDate, priority, status, taskId } =
    req.body;
  console.log(taskId);
  const task = await taskModel.findById(taskId);

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      {
        title,
        category,
        description,
        dueDate,
        priority,
        status,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};
exports.status = async (req, res) => {
  const { taskId, status } = req.body;
  console.log(status);
  console.log(taskId);
  try {
    const deletedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { status: "completed" },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

exports.getTask = async (req, res) => {
  try {
    // const userId = req.user.id;
    const { userId } = req.query;
    // Fetch task data for the user, ensuring the task is not deleted
    const taskData = await taskModel
      .find({ assignedTo: userId }) // Use findOne instead of findById
      .populate("assignedTo", "name email") // Populate the 'assignedTo' field
      .populate("userId", "name email") // Populate the 'userId' field
      .select(
        "title category description dueDate status createdAt assignedTo userId"
      );

    console.log("Task Data: ", taskData);

    // If no task data is found, return a 404 response
    if (!taskData) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    // Return the task data with a 200 response
    return res.status(200).json(taskData);
  } catch (error) {
    console.error("Error fetching task data: ", error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};
