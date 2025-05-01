const hotelModel = require("../model/hotelModel");
// const stateModel = require("../model/stateModel");
// const cityModel = require("../model/cityModel");

exports.addHotel = async (req, res) => {
  const { name, address, phone, email, amenities, cityId, stateId, rating } =
    req.body;

  try {
    // Check if the hotel with the same name and address already exists
    const existingHotel = await hotelModel.findOne({ name, address });

    if (existingHotel) {
      return res
        .status(400)
        .json({ message: "Hotel already exists in this city" });
    }

    // Optionally, you can validate whether the city and state exist
    // const city = await cityModel.findById(cityId);
    // if (!city) {
    //   return res.status(404).json({ message: "City not found" });
    // }

    // const state = await stateModel.findById(stateId);
    // if (!state) {
    //   return res.status(404).json({ message: "State not found" });
    // }

    const newHotel = new hotelModel({
      name,
      address,
      phone,
      email,
      amenities,
      cityId,
      stateId,
      rating,
      isActive: true,
    });
    await newHotel.save();

    return res
      .status(200)
      .json({ message: "Hotel Saved Successfully", hotel: newHotel });
  } catch (error) {
    console.error("Error saving hotel:", error);
    return res.status(500).json({ message: "Error saving hotel", error });
  }
};
