import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ state: "", city: "" });
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:6969/location/area",
        formData
      );
      alert("Location Saved successfully!");
      fetchLocations(); // refresh list
      setFormData({ state: "", city: "" });
    } catch (error) {
      console.error("Save error:", error);
      alert(error?.response?.data?.message);
    }
  };

  // Fetch all locations
  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://localhost:6969/location/getAll");
      setLocations(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const handleUpdate = async (id) => {
    navigate("/edit", { state: { id } });
    console.log(loc);
  };

  const handleInactive = async (id) => {
    try {
      const res = await axios.patch("http://localhost:6969/location/inactive", {
        id,
      });
      fetchLocations();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleActive = async (id) => {
    try {
      const res = await axios.patch("http://localhost:6969/location/active", {
        id,
      });
      console.log(id);
      fetchLocations();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:6969/location/delete", {
        data: { id },
      });
      fetchLocations();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Search and Sort logic
  const filtered = locations
    .filter(
      (loc) =>
        loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const field = a.city.toLowerCase().localeCompare(b.city.toLowerCase());
      return sortOrder === "asc" ? field : -field;
    });

  // Handle active/inactive locations based on `isActive`
  const active = filtered.filter((loc) => loc.isActive === "true");
  const inactive = filtered.filter((loc) => loc.isActive === "false");

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white space-y-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* --- Form --- */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded">
        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* --- Search & Sort --- */}
      <div className="flex justify-between items-center bg-gray-100 p-3 rounded">
        <input
          type="text"
          placeholder="Search by city or state..."
          className="border px-3 py-2 rounded w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort A–Z</option>
          <option value="desc">Sort Z–A</option>
        </select>
      </div>

      {/* --- Active Locations --- */}

      <div>
        <h3 className="text-xl font-semibold text-green-700 mt-6 mb-2">
          🔵 Active Locations
        </h3>
        {active.length === 0 ? (
          <p className="text-gray-500">No active locations found.</p>
        ) : (
          <ul className="space-y-2">
            {active.map((loc) => (
              <li
                key={loc._id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {loc.city}, {loc.state}
                </span>
                <div className="space-x-2">
                  <button
                    className="px-2 py-1 bg-yellow-400 text-sm rounded hover:bg-yellow-500"
                    onClick={() => handleUpdate(loc._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-400 text-sm rounded hover:bg-red-500"
                    onClick={() => handleInactive(loc._id)}
                  >
                    Inactivate
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-800"
                    onClick={() => handleDelete(loc._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- Inactive Locations --- */}

      <div>
        <h3 className="text-xl font-semibold text-red-700 mt-6 mb-2">
          🔴 Inactive Locations
        </h3>
        {inactive.length === 0 ? (
          <p className="text-gray-500">No inactive locations found.</p>
        ) : (
          <ul className="space-y-2">
            {inactive.map((loc) => (
              <li
                key={loc._id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {loc.city}, {loc.state}
                </span>
                <div className="space-x-2">
                  <button
                    className="px-2 py-1 bg-green-500 text-sm rounded hover:bg-green-600"
                    onClick={() => handleActive(loc._id)}
                  >
                    Activate
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-800"
                    onClick={() => handleDelete(loc._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
