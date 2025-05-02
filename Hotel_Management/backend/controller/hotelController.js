const hotelModel = require("../model/hotelModel");
const { uploadFile } = require("../utils/helper");
const stateModel = require("../model/stateModel");
const cityModel = require("../model/cityModel");

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

exports.upload = async (req, res) => {
  try {
    const { name, address, phone, email, amenities, cityId, stateId, rating } =
      req.body;

    let hotelImage = "";

    // Check if image is present in req.files
    if (req.files && req.files.image) {
      const uploaded = await uploadFile(req.files);
      if (uploaded && uploaded.length > 0) {
        hotelImage = uploaded[0].secure_url;
      } else {
        return res.status(500).json({ message: "Image upload failed." });
      }
    }

    const newHotel = await hotelModel.create({
      name,
      address,
      phone,
      email,
      amenities,
      cityId,
      stateId,
      rating,
      hotelImage,
    });

    res.status(201).json({
      message: "Hotel added successfully.",
      data: newHotel,
    });
  } catch (error) {
    console.error("Error adding hotel:", error);
    res.status(500).json({
      message: "Server error while adding hotel.",
      error,
    });
  }
};

exports.getAllHotel = async (req, res) => {
  try {
    const { search = "", sortField = "name", sortOrder = "asc" } = req.query;

    // Create search filter
    const searchFilter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    // Create sort object
    const sortOptions = {};
    sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

    const hotels = await hotelModel.find(searchFilter).sort(sortOptions);

    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getHotelByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    // Validate city existence (optional)
    const hotels = await hotelModel.find({ cityId, isActive: true }).select("name _id");

    if (!hotels.length) {
      return res.status(404).json({ message: "No hotels found in this city." });
    }

    return res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels by city:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};