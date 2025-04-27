// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddTask = () => {
//   const navigate = useNavigate();
//   const [allUsers, setAllUsers] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     description: "",
//     dueDate: "",
//     assignedTo: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { title, category, description, dueDate, assignedTo } = formData;
//     if (!title || !category || !description || !dueDate || !assignedTo) {
//       alert("Please fill in all the fields.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:6969/task/add-task", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       alert("✅ Task added successfully!");
//       setFormData({
//         title: "",
//         category: "",
//         description: "",
//         dueDate: "",
//         assignedTo: "",
//       });
//       navigate("/user");
//     } catch (error) {
//       console.error("Error submitting task:", error);
//       alert(error.response?.data?.message || "Something went wrong.");
//     }
//   };

//   const getCurrentUserId = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user?._id;
//   };

//   const fetchAllUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:6969/user/getAll", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAllUsers(res.data.filter((u) => u._id !== getCurrentUserId()));
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">ADD Task</h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-sm font-medium mb-1">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Category</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Urgent">Urgent</option>
//             <option value="Others">Others</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Due Date</label>
//           <input
//             type="date"
//             name="dueDate"
//             value={formData.dueDate}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Assign To</label>
//           <select
//             name="assignedTo"
//             value={formData.assignedTo}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select User</option>
//             {allUsers.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.name} ({user.email})
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//         >
//           Submit
//         </button>
//       </form>

//       <button
//         onClick={() => navigate("/user")}
//         className="w-full bg-black text-white mt-5 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
//       >
//         Back
//       </button>
//     </div>
//   );
// };

// export default AddTask;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    dueDate: "",
    assignedTo: "",
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
      await axios.post("http://localhost:6969/task/add-task", formData, {
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
        assignedTo: "",
      });
      navigate("/user");
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
      const res = await axios.get("http://localhost:6969/user/getAll", {
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
            <option value="Work">📁 Work</option>
            <option value="Personal">🏠 Personal</option>
            <option value="Urgent">⏰ Urgent</option>
            <option value="Others">📌 Others</option>
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

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Assign To
          </label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">-- Select User --</option>
            {allUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
        >
          ➕ Submit Task
        </button>
      </form>

      <button
        onClick={() => navigate("/user")}
        className="mt-5 w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        ⬅️ Back to Dashboard
      </button>
    </div>
  );
};

export default AddTask;
