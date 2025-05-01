import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../utils/api";

const State = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ state: "", code: "" });
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/state/addState`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("State added successfully!");
      setFormData({ state: "", code: "" });
      fetchLocations();
    } catch (error) {
      console.error("Save error:", error);
      alert(error?.response?.data?.message);
    }
  };

  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/state/getAllState`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleUpdate = (id) => navigate("/edit", { state: { id } });

  const handleInactive = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_URL}/state/inactiveState`,
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchLocations();
    } catch (error) {
      console.error("Error inactivating:", error);
    }
  };

  const handleActive = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_URL}/state/activeState`,
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchLocations();
    } catch (error) {
      console.error("Error activating:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/state/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLocations();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const filtered = locations
    .filter(
      (loc) =>
        loc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const field = a.code.toLowerCase().localeCompare(b.code.toLowerCase());
      return sortOrder === "asc" ? field : -field;
    });

  const active = filtered.filter((loc) => loc.isActive === "true");
  const inactive = filtered.filter((loc) => loc.isActive === "false");

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-white to-blue-50 space-y-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-blue-800 border-b pb-2">
        🌍 Add New State
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-md font-semibold text-gray-700">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter state name"
            required
          />
        </div>
        <div>
          <label className="block text-md font-semibold text-gray-700">
            Code
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter state code"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md"
        >
          ➕ Add State
        </button>
      </form>

      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="🔍 Search state/code..."
          className="border px-4 py-2 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-lg focus:outline-none"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">⬆️ A-Z</option>
          <option value="desc">⬇️ Z-A</option>
        </select>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-green-700 mt-6 mb-3">
          ✅ Active States
        </h3>
        {active.length === 0 ? (
          <p className="text-gray-500">No active states found.</p>
        ) : (
          <ul className="space-y-3">
            {active.map((loc) => (
              <li
                key={loc._id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <span className="font-medium text-gray-800">
                  📍 {loc.state},{" "}
                  <span className="text-sm text-gray-500">{loc.code}</span>
                </span>
                <div className="space-x-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    onClick={() => handleUpdate(loc._id)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    onClick={() => handleInactive(loc._id)}
                  >
                    🔻 Inactivate
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-800 text-sm"
                    onClick={() => handleDelete(loc._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-red-700 mt-6 mb-3">
          🚫 Inactive States
        </h3>
        {inactive.length === 0 ? (
          <p className="text-gray-500">No inactive states found.</p>
        ) : (
          <ul className="space-y-3">
            {inactive.map((loc) => (
              <li
                key={loc._id}
                className="flex justify-between items-center bg-red-50 p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <span className="font-medium text-gray-700">
                  ❌ {loc.state},{" "}
                  <span className="text-sm text-gray-500">{loc.code}</span>
                </span>
                <div className="space-x-2">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    onClick={() => handleActive(loc._id)}
                  >
                    ✅ Activate
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-800 text-sm"
                    onClick={() => handleDelete(loc._id)}
                  >
                    🗑️ Delete
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

export default State;
