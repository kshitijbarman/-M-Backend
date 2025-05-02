const roomModel = require("../model/RoomModel");
const { uploadFile } = require("../utils/helper");
// const stateModel = require("../model/stateModel");
// const cityModel = require("../model/cityModel");

// exports.addRoom = async (req, res) => {
//   try {
//     const {
//       roomNumber,
//       hotelId,
//       type,
//       price,
//       isAvailable,
//       isActive,
//       amenities,
//       description,
//       capacity,
//     } = req.body;

//     let imageFiles = req.files.images;
//     if (!Array.isArray(imageFiles)) {
//       imageFiles = [imageFiles]; // Wrap in array if it's a single file
//     }

//     // Upload images (multiple)
//     const uploaded = await uploadFile(req.files);
//     const imageUrls = uploaded.map((img) => img.secure_url);

//     // Parse amenities if it's stringified (optional)
//     const amenitiesArray = Array.isArray(amenities)
//       ? amenities
//       : amenities.split(",").map((a) => a.trim());

//     const newRoom = new roomModel({
//       roomNumber,
//       hotelId,
//       type,
//       price,
//       isAvailable,
//       isActive,
//       amenities: amenitiesArray,
//       description,
//       capacity,
//       images: imageUrls,
//     });

//     await newRoom.save();

//     res.status(201).json({
//       message: "Room added successfully",
//       data: newRoom,
//     });
//   } catch (error) {
//     console.error("Error adding room:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// };

exports.addRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      hotelId,
      type,
      price,
      isAvailable,
      isActive,
      amenities,
      description,
      capacity,
    } = req.body;

    // Validate file upload
    if (!req.files || !req.files.images) {
      return res.status(400).json({ message: "No room images provided" });
    }

    const existingRoom = await roomModel.findOne({ roomNumber, hotelId });
    if (existingRoom) {
      return res.status(400).json({
        message: "Room with this number already exists in the selected hotel.",
      });
    }

    // Normalize image files (always an array)
    let imageFiles = req.files.images;
    if (!Array.isArray(imageFiles)) {
      imageFiles = [imageFiles];
    }

    // Upload images
    const uploaded = await uploadFile(imageFiles);
    console.log(uploaded);
    const imageUrls = uploaded.map((img) => img.secure_url);

    // Parse amenities string if needed
    const amenitiesArray = Array.isArray(amenities)
      ? amenities
      : amenities?.split(",").map((a) => a.trim()) || [];

    // Create and save new room
    const newRoom = new roomModel({
      roomNumber,
      hotelId,
      type,
      price,
      isAvailable,
      isActive,
      amenities: amenitiesArray,
      description,
      capacity,
      images: imageUrls,
    });

    await newRoom.save();

    res.status(201).json({
      message: "Room added successfully",
      data: newRoom,
    });
  } catch (error) {
    console.error("Error adding room:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// exports.getRoom = async (req, res) => {
//   try {
//     const roomId = req.body;
//     console.log(req.body);

//     // Populate hotel and amenities
//     const room = await roomModel
//       .findById(roomId)
//       .populate("hotelId") // Populates hotel details
//       .populate("amenities") // Populates amenities details
//       .exec();

//     if (!room) {
//       return res.status(404).json({ message: "Room not found" });
//     }

//     res.status(200).json(room); // Send populated room data
//   } catch (error) {
//     console.error("Error fetching room:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// };
exports.getRoom = async (req, res) => {
  try {
    const { roomId } = req.params; // Fetch roomId from URL params

    // Populate hotel and amenities
    const room = await hotelModel
      .findById(roomId)
      .populate("hotelId") // Populate hotel details (hotel's image, name, etc.)
      .populate("amenities") // Populate amenities if needed
      .exec();

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room); // Send the populated room data along with hotel info
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
