
import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

const UpdateTask = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return params.get("taskId");
  };

  const taskId = getQueryParams(location.search);
  console.log(taskId)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    dueDate: "",
    priority: "low",
    status: "pending",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing task details
  const fetchTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:6969/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const task = res.data;
      setFormData({
        title: task.title,
        category: task.category,
        description: task.description,
        dueDate: task.dueDate.split("T")[0], 
        priority: task.priority,
        status: task.status,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching task:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:6969/task/update`,
        { ...formData, taskId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Task updated successfully!");
      navigate("/all-task"); 
    } catch (error) {
      console.error("Update error:", error);
      alert(error.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          ✏️ Update Task
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task Title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            {/* Category */}
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

            {/* Description */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="4"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>

            {/* Due Date */}
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            {/* Priority */}
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>

            {/* Status */}
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="pending">🕐 Pending</option>
              {/* <option value="in-progress">🔄 In Progress</option> */}
              <option value="completed">✅ Completed</option>
              <option value="cancelled">❌ Cancelled</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Update Task
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateTask;
