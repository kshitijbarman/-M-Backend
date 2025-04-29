const hotelLocationModel = require("../model/hotelLocationModel");

exports.createLocation = async (req, res) => {
  console.log(req.body);
  const { state, city } = req.body;

  const existingCity = await hotelLocationModel.findOne({ city, state });
  if (existingCity) {
    return res.status(400).json({ message: "City already exists" });
  }
  const newLocation = new hotelLocationModel({
    city: city,
    state: state,
  });
  await newLocation.save();

  return res
    .status(201)
    .json({ message: "Location saved", location: newLocation });
};
exports.getAll = async (req, res) => {
  const Data = await hotelLocationModel.find({});
  return res.status(200).json(Data);
};

exports.update = async (req, res) => {
  const { id, state, city } = req.body;
  if (!id || !state || !city) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const updatedLocation = await hotelLocationModel.findByIdAndUpdate(
    id,
    { state, city },
    { new: true }
  );
  if (!updatedLocation) {
    return res.status(404).json({ message: "Location not found." });
  }

  res
    .status(200)
    .json({ message: "Location updated successfully.", data: updatedLocation });

  return;
};
exports.inactive = async (req, res) => {
  const { id } = req.body;
  const deletedTask = await hotelLocationModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json({ message: "Task deleted successfully" });
};

exports.active = async (req, res) => {
  const { id } = req.body;
  const activeTask = await hotelLocationModel.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );
  if (!activeTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json({ message: "Task deleted successfully" });
};

exports.delete = async (req, res) => {
  const { id } = req.body;
  const deleteTask = await hotelLocationModel.findByIdAndDelete(id);
  if (!deleteTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json({ message: "Task deleted successfully" });
};
