import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import API_URL from "../utils/api";

const Edit = () => {
  const location = useLocation();
  const id = location.state?.id;

  const [formData, setFormData] = useState({
    state: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        "http://localhost:6969/state/update",
        {
          id,
          state: formData.state,
          code: formData.code,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("updated successfully");
      setFormData({
        state: "",
        code: "",
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update State and City</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block text-sm font-medium">Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
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
    </div>
  );
};

export default Edit;
