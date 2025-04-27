// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({});
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAssignedBy, setShowAssignedBy] = useState(false);
//   const [showAssignedTo, setShowAssignedTo] = useState(false);

//   const fetchUserDetail = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:6969/user/getUser", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUserData(res.data);
//     } catch (error) {
//       console.error("User fetch error:", error);
//     }
//   };

//   const fetchUserTasks = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:6969/task/getAll", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//       setLoading(false);
//       console.log(res.data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete("http://localhost:6969/task/delete", {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { taskId },
//       });
//       alert("Task deleted successfully.");
//       fetchUserTasks();
//     } catch (error) {
//       alert(error.response?.data?.message || "Delete failed.");
//     }
//   };

//   const handleUpdate = (taskId) => navigate(`/update/${taskId}`);
//   const handleCreateTask = () => navigate("/add-task");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const handleAdminPage = (path) => {
//     if (userData.role === "admin") return navigate(path);
//     alert("Only Admin can access");
//   };

//   useEffect(() => {
//     fetchUserDetail();
//     fetchUserTasks();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100">
//       {/* Navbar */}
//       <div className="flex justify-between items-center bg-purple-700 text-white px-6 py-4 shadow-md">
//         <h1 className="text-2xl font-bold">🎯 Task Manager</h1>
//         <div className="space-x-3">
//           <button
//             onClick={handleLogout}
//             className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-purple-100"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main */}
//       <div className="flex flex-col gap-6 p-6">
//         {/* Top Section - Tasks */}
//         <div className="w-full">
//           <img
//             src={userData.profilePic || "/default-profile.png"} // fallback if no image
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover shadow-md"
//           />
//           <h2 className="text-2xl font-bold mb-2">👋 Hello, {userData.name}</h2>
//           <p className="text-gray-700 mb-4">Role: {userData.role}</p>

//           {loading ? (
//             <p>Loading tasks...</p>
//           ) : tasks.length === 0 ? (
//             <p>No tasks available.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {tasks.map((task) => (
//                 <div
//                   key={task._id}
//                   className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-all"
//                 >
//                   <h3 className="text-xl font-bold text-blue-700">
//                     📝 {task.title}
//                   </h3>
//                   <p>
//                     <strong>Assigned By:</strong> {task.userId.name}
//                   </p>
//                   <p>
//                     <strong>Assigned to:</strong> {task.assignedTo.name}
//                   </p>
//                   <p>
//                     <strong>📂 Category:</strong> {task.category}
//                   </p>
//                   <p>
//                     <strong>🗒 Description:</strong> {task.description}
//                   </p>
//                   <p>
//                     <strong>📅 Due:</strong>{" "}
//                     {new Date(task.dueDate).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>📌 Status:</strong>{" "}
//                     <span
//                       className={`px-2 py-1 text-white rounded ${
//                         task.status === "pending"
//                           ? "bg-yellow-500"
//                           : "bg-green-600"
//                       }`}
//                     >
//                       {task.status}
//                     </span>
//                   </p>
//                   <p>
//                     <strong>🕒 Created:</strong>{" "}
//                     {new Date(task.createdAt).toLocaleString()}
//                   </p>

//                   <div className="mt-3 space-x-2">
//                     <button
//                       onClick={() => handleUpdate(task._id)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded"
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(task._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       🗑️ Delete
//                     </button>
//                     {task.status === "pending" && (
//                       <button
//                         onClick={() => handleUpdate(task._id)}
//                         className="bg-green-600 text-white px-3 py-1 rounded"
//                       >
//                         ✅ Done
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Bottom Section - Assigned Dropdowns and Create Task */}
//         <div className="w-full space-y-4">
//           <div className="bg-green-100 p-4 rounded-xl shadow">
//             <button
//               onClick={() => {
//                 setShowAssignedBy(!showAssignedBy);
//                 setShowAssignedTo(false);
//               }}
//               className="w-full bg-green-600 text-white px-4 py-2 rounded mb-2"
//             >
//               👥 Task Assigned By
//             </button>
//             {showAssignedBy && (
//               <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto">
//                 {tasks.length ? (
//                   tasks.map((name, idx) => (
//                     <li key={idx} className="px-4 py-2 hover:bg-gray-100">
//                       👤 {name.userId.name}
//                     </li>
//                   ))
//                 ) : (
//                   <li className="px-4 py-2 text-gray-500">
//                     No assignments found
//                   </li>
//                 )}
//               </ul>
//             )}
//           </div>

//           <div className="bg-blue-100 p-4 rounded-xl shadow">
//             <button
//               onClick={() => {
//                 setShowAssignedTo(!showAssignedTo);
//                 setShowAssignedBy(false);
//               }}
//               className="w-full bg-blue-600 text-white px-4 py-2 rounded mb-2"
//             >
//               📤 Task Assigned To
//             </button>
//             {showAssignedTo && (
//               <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto">
//                 {tasks.length ? (
//                   tasks.map((name, idx) => (
//                     <>
//                       <li
//                         key={idx}
//                         className="flex justify-between px-4 py-2 hover:bg-gray-100"
//                       >
//                         👤 {name.assignedTo.name}
//                         <p>{name.status}</p>
//                       </li>
//                     </>
//                   ))
//                 ) : (
//                   <li className="px-4 py-2 text-gray-500">
//                     No assignments made
//                   </li>
//                 )}
//               </ul>
//             )}
//           </div>

//           <button
//             onClick={handleCreateTask}
//             className="w-full bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
//           >
//             ➕ Create Task
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssignedBy, setShowAssignedBy] = useState(false);
  const [showAssignedTo, setShowAssignedTo] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchUserDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:6969/user/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("User fetch error:", error);
    }
  };

  const fetchUserTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:6969/task/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
      // console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:6969/task/delete", {
        headers: { Authorization: `Bearer ${token}` },
        data: { taskId },
      });
      alert("Task deleted successfully.");
      fetchUserTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed.");
    }
  };

  const handleUpdate = (taskId) => navigate(`/update/${taskId}`);
  const handleCreateTask = () => navigate("/add-task");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleAdminPage = (path) => {
    if (userData.role === "admin") return navigate(path);
    alert("Only Admin can access");
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:6969/user/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile image uploaded successfully!");
      fetchUserDetail(); // Refresh user details to show new image
    } catch (error) {
      console.error("Image upload error:", error);
      alert(error.response?.data?.message || "Upload failed.");
    }
  };

  useEffect(() => {
    fetchUserDetail();
    fetchUserTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-purple-700 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">🎯 Task Manager</h1>
        <div className="space-x-3">
          <button
            onClick={handleLogout}
            className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-purple-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col gap-6 p-6">
        {/* Top Section - User Info */}
        <div className="w-full">
          <img
            src={userData.profilePic || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
          <h2 className="text-2xl font-bold mb-2">👋 Hello, {userData.name}</h2>
          <p className="text-gray-700 mb-4">Role: {userData.role}</p>

          {/* Image Upload Section */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-1 rounded"
            />
            <button
              onClick={handleImageUpload}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Upload
            </button>
          </div>

          {/* Tasks */}
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-bold text-blue-700">
                    📝 {task.title}
                  </h3>
                  <p>
                    <strong>Assigned By:</strong> {task.userId.name}
                  </p>
                  <p>
                    <strong>Assigned to:</strong> {task.assignedTo.name}
                  </p>
                  <p>
                    <strong>📂 Category:</strong> {task.category}
                  </p>
                  <p>
                    <strong>🗒 Description:</strong> {task.description}
                  </p>
                  <p>
                    <strong>📅 Due:</strong>{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>📌 Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 text-white rounded ${
                        task.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-green-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </p>
                  <p>
                    <strong>🕒 Created:</strong>{" "}
                    {new Date(task.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-3 space-x-2">
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      🗑️ Delete
                    </button>
                    {task.status === "pending" && (
                      <button
                        onClick={() => handleUpdate(task._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        ✅ Done
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="w-full space-y-4">
          <div className="bg-green-100 p-4 rounded-xl shadow">
            <button
              onClick={() => {
                setShowAssignedBy(!showAssignedBy);
                setShowAssignedTo(false);
              }}
              className="w-full bg-green-600 text-white px-4 py-2 rounded mb-2"
            >
              👥 Task Assigned By
            </button>
            {showAssignedBy && (
              <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto">
                {tasks.length ? (
                  tasks.map((name, idx) => (
                    <li key={idx} className="px-4 py-2 hover:bg-gray-100">
                      👤 {name.userId.name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">
                    No assignments found
                  </li>
                )}
              </ul>
            )}
          </div>

          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <button
              onClick={() => {
                setShowAssignedTo(!showAssignedTo);
                setShowAssignedBy(false);
              }}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded mb-2"
            >
              📤 Task Assigned To
            </button>
            {showAssignedTo && (
              <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto">
                {tasks.length ? (
                  tasks.map((name, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between px-4 py-2 hover:bg-gray-100"
                    >
                      👤 {name.assignedTo.name}
                      <p>{name.status}</p>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">
                    No assignments made
                  </li>
                )}
              </ul>
            )}
          </div>

          <button
            onClick={handleCreateTask}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
          >
            ➕ Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
