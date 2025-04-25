// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [user, setUser] = useState([]);
//   const [admin, setAdmin] = useState([]);
//   const [task, setTask] = useState([]);
//   const navigate = useNavigate();

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const userRes = await axios.get("http://localhost:6969/user/getALL", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const adminRes = await axios.get("http://localhost:6969/user/getAdmin", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const taskRes = await axios.get("http://localhost:6969/task/getAll", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUser(userRes.data); // Array of users
//       setAdmin(adminRes.data); // Object of status counts
//       setTask(taskRes.data);
//       // console.log(userRes.data);
//       console.log(taskRes.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const activeUsers = user.filter(
//     (u) => u.role === "user" && u.status === "active"
//   ).length;
//   const inactiveUsers = user.filter(
//     (u) => u.role === "user" && u.status === "inactive"
//   ).length;
//   const activeAdmins = admin.filter(
//     (u) => u.role === "admin" && u.status === "active"
//   ).length;
//   const inactiveAdmins = admin.filter(
//     (u) => u.role === "admin" && u.status === "inactive"
//   ).length;

//   const pending = task.filter((u) => u.status === "pending").length;
//   const inProgress = task.filter((u) => u.status === "inProgress").length;
//   const completed = task.filter((u) => u.status === "completed").length;
//   const cancelled = task.filter((u) => u.status === "cancelled").length;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="flex justify-between items-center bg-blue-600 text-white px-6 py-5 mb-5">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <div className="space-x-4">
//           <button className="bg-white text-blue-600 px-4 py-2 rounded">
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Title */}
//       <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

//       {/* Dashboard Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5">
//         {/* Users Box */}
//         <div
//           className="bg-white rounded-lg shadow-md p-6"
//           onClick={() => navigate("/users")}
//         >
//           <h2 className="cursor-pointer text-xl font-semibold mb-4 text-blue-600">
//             Users
//           </h2>
//           <p>👤 Total Users: {user.length}</p>
//           <p>👥 Active Users: {activeUsers}</p>
//           <p>👤 Inactive Users: {inactiveUsers}</p>
//         </div>

//         {/* Admins Box */}
//         <div
//           className="bg-white rounded-lg shadow-md p-6"
//           onClick={() => navigate("/admin")}
//         >
//           <h2 className="cursor-pointer text-xl font-semibold mb-4 text-purple-600">
//             Admins
//           </h2>
//           <p>🧑‍💼 Total Admins: {admin.length}</p>
//           <p>🧑‍💼 Active Admins: {activeAdmins}</p>
//           <p>🚫 Inactive Admins: {inactiveAdmins}</p>
//         </div>

//         {/* Tasks Box */}
//         <div
//           className="bg-white rounded-lg shadow-md p-6"
//           onClick={() => navigate("/task")}
//         >
//           <h2 className="cursor-pointer text-xl font-semibold mb-4 text-green-600">
//             Tasks
//           </h2>
//           <p> Total Task: {task.length}</p>
//           <p>📌 Pending: {pending}</p>
//           <p>🚧 In Progress: {inProgress}</p>
//           <p>✅ Completed: {completed}</p>
//           <p>❌ Cancelled: {cancelled}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [task, setTask] = useState([]);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const [userRes, adminRes, taskRes] = await Promise.all([
        axios.get("http://localhost:6969/user/getALL", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:6969/user/getAdmin", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:6969/task/getAll", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setUser(userRes.data);
      setAdmin(adminRes.data);
      setTask(taskRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const activeUsers = user.filter(
    (u) => u.role === "user" && u.status === "active"
  ).length;
  const inactiveUsers = user.filter(
    (u) => u.role === "user" && u.status === "inactive"
  ).length;
  const activeAdmins = admin.filter(
    (u) => u.role === "admin" && u.status === "active"
  ).length;
  const inactiveAdmins = admin.filter(
    (u) => u.role === "admin" && u.status === "inactive"
  ).length;

  const pending = task.filter((u) => u.status === "pending").length;
  const inProgress = task.filter((u) => u.status === "inProgress").length;
  const completed = task.filter((u) => u.status === "completed").length;
  const cancelled = task.filter((u) => u.status === "cancelled").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-5">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4 rounded-xl shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide">🚀 Dashboard</h1>
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition-all font-semibold">
          Logout
        </button>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-indigo-700 my-8">
        Admin Overview
      </h2>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Box */}
        <div
          className="bg-white border-l-8 border-blue-400 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => navigate("/users")}
        >
          <h3 className="text-2xl font-semibold mb-3 text-blue-600">
            👥 Users
          </h3>
          <p>👤 Total: {user.length}</p>
          <p>✅ Active: {activeUsers}</p>
          <p>🚫 Inactive: {inactiveUsers}</p>
        </div>

        {/* Admins Box */}
        <div
          className="bg-white border-l-8 border-purple-400 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => navigate("/admin")}
        >
          <h3 className="text-2xl font-semibold mb-3 text-purple-600">
            🧑‍💼 Admins
          </h3>
          <p>👤 Total: {admin.length}</p>
          <p>✅ Active: {activeAdmins}</p>
          <p>🚫 Inactive: {inactiveAdmins}</p>
        </div>

        {/* Tasks Box */}
        <div
          className="bg-white border-l-8 border-green-400 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => navigate("/task")}
        >
          <h3 className="text-2xl font-semibold mb-3 text-green-600">
            📝 Tasks
          </h3>
          <p>📋 Total: {task.length}</p>
          <p>🕐 Pending: {pending}</p>
          <p>🚧 In Progress: {inProgress}</p>
          <p>✅ Completed: {completed}</p>
          <p>❌ Cancelled: {cancelled}</p>
        </div>

        <div
          className="bg-white border-l-8 border-green-400 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => navigate("/all-task")}
        >
          <h3 className="text-2xl font-semibold mb-3 text-green-600">
            📝Show All Tasks
          </h3>

          <p>📋 Total: {task.length}</p>
          {/* <p>🕐 Pending: {pending}</p>
          <p>🚧 In Progress: {inProgress}</p>
          <p>✅ Completed: {completed}</p>
          <p>❌ Cancelled: {cancelled}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
