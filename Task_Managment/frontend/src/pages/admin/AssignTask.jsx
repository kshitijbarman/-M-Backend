import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AssignTask = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  // console.log(userId);

  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    dueDate: "",
    assignedTo: userId,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, category, description, dueDate, assignedTo } = formData;
    if (!title || !category || !description || !dueDate || !assignedTo) {
      setError("❌ All fields are required.");
      return;
    }

    try {
      console.log(formData);
      await axios.post("http://localhost:6969/task/assign-task", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("✅ Task added successfully!");
      setFormData({
        title: "",
        category: "",
        description: "",
        dueDate: "",
        // assignedTo: userId,
      });
      navigate("/all-user");
    } catch (error) {
      console.error("Error submitting task:", error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  const getCurrentUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?._id;
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:6969/user/getuser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(res.data.filter((u) => u._id !== getCurrentUserId()));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-6">
        📝 Add New Task
      </h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">-- Select Category --</option>
            <option value="Work">📁 work</option>
            <option value="Personal">🏠 personal</option>
            <option value="Urgent">⏰ urgent</option>
            <option value="Others">📌 others</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Describe the task..."
            rows={3}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Assign To
          </label>

          <input
            name="assignedTo"
            defaultValue={userId}
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div> */}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
        >
          ➕ Submit Task
        </button>
      </form>

      <button
        onClick={() => navigate("/all-user")}
        className="mt-5 w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        ⬅️ Back to Dashboard
      </button>
    </div>
  );
};

export default AssignTask;
