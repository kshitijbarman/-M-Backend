const cityModel = require("../model/cityModel");
const stateModel = require("../model/stateModel");

exports.addCity = async (req, res) => {
  const { city, stateId } = req.body;
  console.log(req.body);

  try {
    const existingCity = await cityModel.findOne({ city, stateId });

    if (existingCity) {
      return res
        .status(400)
        .json({ message: "City already exists in this state" });
    }

    const newCity = new cityModel({ city, stateId });
    await newCity.save();
    console.log(newCity);

    return res.status(200).json({ message: "City Saved Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error saving city", error });
  }
};

exports.getAllCity = async (req, res) => {
  try {
    const cities = await cityModel.find().populate("stateId");
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cities", error });
  }
};
exports.updateCity = async (req, res) => {};

exports.inactiveCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const updatedCity = await cityModel.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!updatedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    return res
      .status(200)
      .json({ message: "City status updated", updatedCity });
  } catch (error) {
    console.error("Error updating city status:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const deletedCity = await cityModel.findByIdAndDelete(id);

    if (!deletedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    return res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    console.error("Error deleting city:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.getCitiesByState = async (req, res) => {
  try {
    const { stateId } = req.params;

    // Check if the state exists (optional validation)
    const state = await stateModel.findById(stateId);
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    // Fetch cities by the stateId
    const cities = await cityModel.find({ stateId });

    // Return the list of cities
    return res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
