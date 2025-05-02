const stateModel = require("../model/stateModel");
const cityModel = require("../model/cityModel");

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

exports.update = async (req, res) => {
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

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await cityModel.deleteMany({ stateId: id });

    const deleted = await stateModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "State not found" });
    }

    return res
      .status(200)
      .json({ message: "State and its cities deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.activeState = async (req, res) => {
  const { id } = req.body;

  try {
    // Activate the state
    const updatedState = await stateModel.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    if (!updatedState) {
      return res.status(404).json({ message: "State not found" });
    }

    // Also update all cities linked to this state
    await cityModel.updateMany(
      { stateId: id }, // Find all cities with this stateId
      { isActive: true } // Set all cities to active
    );

    res
      .status(200)
      .json({ message: "State and linked cities activated successfully" });
  } catch (err) {
    console.error("Error activating state:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.inactiveState = async (req, res) => {
  const { id } = req.body;

  try {
   
    const updatedState = await stateModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!updatedState) {
      return res.status(404).json({ message: "State not found" });
    }

    
    await cityModel.updateMany(
      { stateId: id }, 
      { isActive: false } 
    );

    res
      .status(200)
      .json({ message: "State and linked cities deactivated successfully" });
  } catch (err) {
    console.error("Error deactivating state:", err);
    res.status(500).json({ error: "Server error" });
  }
};
