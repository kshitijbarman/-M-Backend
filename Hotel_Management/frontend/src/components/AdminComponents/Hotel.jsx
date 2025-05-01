import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../utils/api";

const Hotel = () => {
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
  });

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/hotel/addHotel`, formData, {
        headers: { Authorization: `Bearer ${token}` },
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
      });
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("Error adding hotel. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 space-y-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-blue-800">Add Hotel</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* State Selection */}
        <div>
          <label className="block text-md font-semibold text-gray-700">
            State
          </label>
          <select
            name="stateId"
            value={formData.stateId}
            onChange={handleStateChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Select State --</option>
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.state}
              </option>
            ))}
          </select>
        </div>

        {/* City Selection */}
        <div>
          <label className="block text-md font-semibold text-gray-700">
            City
          </label>
          <select
            name="cityId"
            value={formData.cityId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Select City --</option>
            {cities.length > 0 ? (
              cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.city}
                </option>
              ))
            ) : (
              <option disabled>No cities available for this state</option>
            )}
          </select>
        </div>

        {/* Hotel Name */}
        <div>
          <label className="block text-md font-semibold text-gray-700">
            Hotel Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Hotel Name"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-md font-semibold text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Hotel Address"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-md font-semibold text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Hotel Phone"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-md font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Hotel Email"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-md font-semibold text-gray-700">
            Amenities
          </label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Amenities"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-md font-semibold text-gray-700">
            Rating
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="1"
            max="5"
            placeholder="Rating"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default Hotel;
