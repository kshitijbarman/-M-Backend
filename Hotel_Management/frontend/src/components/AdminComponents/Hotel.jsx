import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Hotel = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    amenities: "",
    cityId: "",
    stateId: "",
    rating: 1,
    hotelImage: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch all states
  const fetchStates = async () => {
    try {
      const res = await axios.get(`${API_URL}/state/getAllState`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStates(res.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Fetch cities based on selected state
  const fetchCities = async (stateId) => {
    if (!stateId) {
      setCities([]); // Clear cities if no state is selected
      return;
    }
    try {
      const res = await axios.get(
        `${API_URL}/city/getCitiesByState/${stateId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCities(res.data); // Set cities based on the selected state
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]); // Clear cities on error
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  // Handle state change (fetch cities)
  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setFormData({ ...formData, stateId, cityId: "" });
    fetchCities(stateId); // Fetch cities for the selected state
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change (image upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, hotelImage: file });
      setImagePreview(URL.createObjectURL(file)); // Display image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("name", formData.name);
      formDataWithFile.append("address", formData.address);
      formDataWithFile.append("phone", formData.phone);
      formDataWithFile.append("email", formData.email);
      formDataWithFile.append("amenities", formData.amenities);
      formDataWithFile.append("cityId", formData.cityId);
      formDataWithFile.append("stateId", formData.stateId);
      formDataWithFile.append("rating", formData.rating);

      // Append image file if selected
      if (formData.hotelImage) {
        formDataWithFile.append("image", formData.hotelImage);
      }

      await axios.post(`${API_URL}/hotel/upload`, formDataWithFile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Hotel added successfully!");
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        amenities: "",
        cityId: "",
        stateId: "",
        rating: 1,
        hotelImage: "",
      });
      setImagePreview(null); // Reset image preview
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("Error adding hotel. Please try again.");
    }
  };

  const handleShowHotel = () => {
    navigate("/show-hotels");
  };
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
      <h2 className="text-4xl font-bold text-blue-700 mb-8 border-b pb-2">
        🏨 Add New Hotel
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* State */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            🗺️ Select State
          </label>
          <select
            name="stateId"
            value={formData.stateId}
            onChange={handleStateChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">-- Select State --</option>
            {states
              .filter((state) => state.isActive === true)
              .map((state) => (
                <option key={state._id} value={state._id}>
                  {state.state}
                </option>
              ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            🏙️ Select City
          </label>
          <select
            name="cityId"
            value={formData.cityId}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">-- Select City --</option>
            {cities.length > 0 ? (
              cities
                .filter((city) => city.isActive === true)
                .map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.city}
                  </option>
                ))
            ) : (
              <option disabled>No active cities available</option>
            )}
          </select>
        </div>

        {/* Hotel Info Fields */}
        {[
          { label: "🏨 Hotel Name", name: "name", placeholder: "Hotel Name" },
          {
            label: "📍 Address",
            name: "address",
            placeholder: "Hotel Address",
          },
          { label: "📞 Phone", name: "phone", placeholder: "Hotel Phone" },
          {
            label: "📧 Email",
            name: "email",
            placeholder: "Hotel Email",
            type: "email",
          },
          {
            label: "🛎️ Amenities",
            name: "amenities",
            placeholder: "Amenities",
          },
        ].map(({ label, name, placeholder, type = "text" }) => (
          <div key={name}>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder={placeholder}
              required={name !== "email" && name !== "amenities"}
            />
          </div>
        ))}

        {/* Rating */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            ⭐ Rating (1 to 5)
          </label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* Image Upload */}
          <div>
            <label className="block pt-5 text-lg font-semibold text-gray-700 mb-1">
              🖼️ Upload Hotel Image
            </label>
            <input
              type="file"
              name="hotelImage"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center gap-10 mt-6">
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full shadow-md transition duration-300"
          >
            ➕ Add Hotel
          </button>
          <button
            type="button"
            onClick={handleShowHotel}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-3 rounded-full shadow-md transition duration-300"
          >
            🏨 Show Hotels
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hotel;
