import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../utils/api";

const Room = () => {
  const token = localStorage.getItem("token");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    roomNumber: "",
    hotelId: "",
    type: "Standard",
    price: 0,
    isAvailable: true,
    isActive: true,
    amenities: [],
    description: "",
    capacity: 1,
    stateId: "",
    cityId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length === 0) {
      alert("No files selected.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleAmenitiesChange = (e) => {
    const value = e.target.value.split(",").map((a) => a.trim());
    setFormData({ ...formData, amenities: value });
  };

  const fetchStates = async () => {
    try {
      const res = await axios.get(`${API_URL}/state/getAllState`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const activeStates = res.data.filter((s) => s.isActive);
      setStates(activeStates);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get(
        `${API_URL}/city/getCitiesByState/${stateId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCities(res.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchHotels = async (cityId) => {
    try {
      const res = await axios.get(`${API_URL}/hotel/getHotelByCity/${cityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotels(res.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const form = new FormData();
  //     for (const key in formData) {
  //       if (key !== "stateId" && key !== "cityId") {
  //         if (Array.isArray(formData[key])) {
  //           formData[key].forEach((item) => form.append(key, item));
  //         } else {
  //           form.append(key, formData[key]);
  //         }
  //       }
  //     }

  //     images.forEach((img) => form.append("images", img));

  //     await axios.post(`${API_URL}/room/addRoom`, form, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     alert("Room added successfully!");
  //   } catch (err) {
  //     console.error("Error submitting room:", err);
  //     alert("Error adding room.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation before submitting
    if (
      !formData.roomNumber ||
      !formData.hotelId ||
      !formData.price ||
      images.length === 0
    ) {
      alert("Please fill out all required fields and add at least one image.");
      return;
    }

    try {
      const form = new FormData();

      // Appending the non-image fields
      for (const key in formData) {
        if (key !== "stateId" && key !== "cityId") {
          if (Array.isArray(formData[key])) {
            formData[key].forEach((item) => form.append(key, item));
          } else {
            form.append(key, formData[key]);
          }
        }
      }

      // Appending the images
      images.forEach((img) => {
        if (img.size > 0) {
          form.append("images", img);
        } else {
          console.error("Empty file selected");
        }
      });

      // Submit the form with images
      await axios.post(`${API_URL}/room/addRoom`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      alert("Room added successfully!");
      // Optionally clear the form if you want to reset it after successful submission
      setFormData({
        roomNumber: "",
        hotelId: "",
        type: "Standard",
        price: 0,
        isAvailable: true,
        isActive: true,
        amenities: [],
        description: "",
        capacity: 1,
        stateId: "",
        cityId: "",
      });
      setImages([]); // Clear images state if needed
    } catch (err) {
      console.error("Error submitting room:", err);
      alert("Error adding room.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Add New Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>State</label>
          <select
            name="stateId"
            value={formData.stateId}
            onChange={(e) => {
              const stateId = e.target.value;
              setFormData({ ...formData, stateId, cityId: "", hotelId: "" });
              fetchCities(stateId);
            }}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s._id} value={s._id}>
                {s.state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>City</label>
          <select
            name="cityId"
            value={formData.cityId}
            onChange={(e) => {
              const cityId = e.target.value;
              setFormData({ ...formData, cityId, hotelId: "" });
              fetchHotels(cityId);
            }}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c._id} value={c._id}>
                {c.city}
              </option>
            ))}
          </select>
        </div>

        {/* {formData.stateId && (
          <div>
            <label>City</label>
            <select
              name="cityId"
              value={formData.cityId}
              onChange={(e) => {
                const cityId = e.target.value;
                setFormData({ ...formData, cityId, hotelId: "" });
                fetchHotels(cityId);
              }}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.city}
                </option>
              ))}
            </select>
          </div>
        )} */}

        <div>
          <label>Hotel</label>
          <select
            name="hotelId"
            value={formData.hotelId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Hotel</option>
            {hotels.map((h) => (
              <option key={h._id} value={h._id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* {formData.cityId && (
          <div>
            <label>Hotel</label>
            <select
              name="hotelId"
              value={formData.hotelId}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Hotel</option>
              {hotels.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
        )} */}

        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          onChange={handleChange}
          value={formData.roomNumber}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Room Type"
          onChange={handleChange}
          value={formData.type}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={formData.price}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          onChange={handleChange}
          value={formData.capacity}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Amenities (comma separated)"
          onChange={handleAmenitiesChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default Room;
