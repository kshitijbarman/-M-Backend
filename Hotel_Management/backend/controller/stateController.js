const stateModel = require("../model/stateModel");

exports.addState = async (req, res) => {
  const { state, code } = req.body;
  const existingState = await stateModel.findOne({ state });
  if (existingState) {
    return res.status(404).json({ message: "state already exist" });
  }
  const newState = new stateModel({ state, code });
  const saveState = await newState.save();
  return res.status(200).json({ message: "State Saved Successfully" });
};

exports.getAllState = async (req, res) => {
  try {
    const stateData = await stateModel.find();
    return res.json(stateData);
  } catch (err) {
    console.error("Error fetching states:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.updateState = async (req, res) => {
  const { id, state, code } = req.body;

  if (!id || !state || !code) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const updatedLocation = await stateModel.findByIdAndUpdate(
    id,
    { state, code },
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

exports.activeState = async (req, res) => {
  const { id } = req.body;
  const deletedState = await stateModel.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );
  if (!deletedState) {
    return res.status(404).json({ message: "state not found" });
  }
  res.status(200).json({ message: "Task deleted successfully" });
};
exports.inactiveState = async (req, res) => {
  const { id } = req.body;
  const deletedState = await stateModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  if (!deletedState) {
    return res.status(404).json({ message: "state not found" });
  }
  res.status(200).json({ message: "Task deleted successfully" });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await stateModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "state not found" });
    }

    return res.status(200).json({ message: "state deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
