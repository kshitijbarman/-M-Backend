// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UserPage = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [activeUsers, setActiveUsers] = useState([]);
//   const [inactiveUsers, setInactiveUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:6969/user/getALL", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const allUsers = res.data.filter((user) => user.role === "user");

//       setUsers(allUsers);
//       setActiveUsers(allUsers.filter((user) => user.status === "active"));
//       setInactiveUsers(allUsers.filter((user) => user.status === "inactive"));
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete("http://localhost:6969/user/delete", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: { taskId },
//       });
//       fetchUsers();
//     } catch (err) {
//       console.error("Error deleting user:", err);
//     }
//   };

//   const handleActive = async (taskId) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.patch(
//         "http://localhost:6969/user/active",
//         { taskId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       fetchUsers();
//     } catch (err) {
//       console.error("Error marking task as active:", err);
//     }
//   };

//   const handleAssignTask = async (userId) => {

//     navigate("/add-task");
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 p-4">
//       {/* Navbar */}
//       <div className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-xl rounded-lg">
//         <h1 className="text-3xl font-bold tracking-wide">👥 User Dashboard</h1>
//         <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-100">
//           🚪 Logout
//         </button>
//       </div>

//       {/* Summary */}
//       <div className="bg-white mt-6 p-6 rounded-lg shadow-md border-l-8 border-blue-600">
//         <h2 className="text-2xl font-bold text-blue-700 mb-2">
//           👥 Total Users: {users.length}
//         </h2>
//       </div>

//       {/* Active Users Box */}
//       <div className="bg-white m-6 p-6 rounded-lg shadow-lg border-l-4 border-green-400">
//         <h2 className="text-xl font-bold text-green-600 mb-4">
//           ✅ Active Users ({activeUsers.length})
//         </h2>
//         {activeUsers.map((user) => (
//           <div
//             key={user._id}
//             className="flex justify-between items-center border-b py-4 px-2 hover:bg-green-50 rounded-md"
//           >
//             <div className="flex flex-col">
//               <span className="font-semibold text-gray-800">
//                 👤 {user.name}
//               </span>
//               <span className="text-sm text-gray-600">📧 {user.email}</span>
//             </div>
//             <div className="space-x-3">
//               <button
//                 onClick={() => handleAssignTask(user._id)}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//               >
//                 Assign Task
//               </button>
//               <button
//                 onClick={() => handleDelete(user._id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Inactive Users Box */}
//       <div className="bg-white m-6 p-6 rounded-lg shadow-lg border-l-4 border-rose-400">
//         <h2 className="text-xl font-bold text-rose-600 mb-4">
//           ❌ Inactive Users ({inactiveUsers.length})
//         </h2>
//         {inactiveUsers.map((user) => (
//           <div
//             key={user._id}
//             className="flex justify-between items-center border-b py-4 px-2 hover:bg-rose-50 rounded-md"
//           >
//             <div className="flex flex-col">
//               <span className="font-semibold text-gray-800">
//                 👤 {user.name}
//               </span>
//               <span className="text-sm text-gray-600">📧 {user.email}</span>
//             </div>
//             <div className="space-x-3">
//               <button
//                 onClick={() => handleActive(user._id)}
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//               >
//                 Activate
//               </button>
//               <button
//                 onClick={() => handleDelete(user._id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssignedBy, setShowAssignedBy] = useState(false);
  const [showAssignedTo, setShowAssignedTo] = useState(false);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:6969/user/getALL", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allUsers = res.data.filter((user) => user.role === "user");

      setUsers(allUsers);
      setActiveUsers(allUsers.filter((user) => user.status === "active"));
      setInactiveUsers(allUsers.filter((user) => user.status === "inactive"));
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:6969/task/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:6969/user/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { taskId },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleActive = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        "http://localhost:6969/user/active",
        { taskId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      console.error("Error marking task as active:", err);
    }
  };

  const handleAssignTask = async (userId) => {
    // const title = prompt("Enter task title:");
    // const description = prompt("Enter task description:");
    // if (!title || !description) return alert("Both fields are required.");

    // try {
    //   const token = localStorage.getItem("token");
    //   await axios.post(
    //     "http://localhost:6969/task/create",
    //     { title, description, assignedTo: userId },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   alert("Task assigned successfully!");
    // } catch (err) {
    //   console.error("Error assigning task:", err);
    //   alert("Failed to assign task.");
    // }
    navigate("/add-task");
  };

  const assignedByUsers = [
    ...new Set(tasks.map((task) => task.assignedBy?.name).filter(Boolean)),
  ];

  const assignedToUsers = [
    ...new Set(tasks.map((task) => task.assignedTo?.name).filter(Boolean)),
  ];

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 p-4">
      {/* Navbar */}
      <div className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold tracking-wide">👥 User Dashboard</h1>
        <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-100">
          🚪 Logout
        </button>
      </div>

      {/* Summary */}
      <div className="bg-white mt-6 p-6 rounded-lg shadow-md border-l-8 border-blue-600">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          👥 Total Users: {users.length}
        </h2>
      </div>

      {/* Active Users Box */}
      <div className="bg-white m-6 p-6 rounded-lg shadow-lg border-l-4 border-green-400">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          ✅ Active Users ({activeUsers.length})
        </h2>
        {activeUsers.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center border-b py-4 px-2 hover:bg-green-50 rounded-md"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                👤 {user.name}
              </span>
              <span className="text-sm text-gray-600">📧 {user.email}</span>
            </div>
            <div className="space-x-3">
              <button
                onClick={() => handleAssignTask(user._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Assign Task
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inactive Users Box */}
      <div className="bg-white m-6 p-6 rounded-lg shadow-lg border-l-4 border-rose-400">
        <h2 className="text-xl font-bold text-rose-600 mb-4">
          ❌ Inactive Users ({inactiveUsers.length})
        </h2>
        {inactiveUsers.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center border-b py-4 px-2 hover:bg-rose-50 rounded-md"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                👤 {user.name}
              </span>
              <span className="text-sm text-gray-600">📧 {user.email}</span>
            </div>
            <div className="space-x-3">
              <button
                onClick={() => handleActive(user._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Activate
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assigned By Dropdown */}
      {/* <div className="bg-white m-6 p-6 rounded-lg shadow-lg border-l-4 border-indigo-400">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          🧑‍💼 Assigned By ({assignedByUsers.length})
        </h2>
        <button
          onClick={() => setShowAssignedBy(!showAssignedBy)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
        >
          Toggle Assigned By List
        </button>
        {showAssignedBy && (
          <div className="mt-4 space-y-2">
            {assignedByUsers.map((user, idx) => (
              <div key={idx} className="text-gray-700">
                👤 {user}
              </div>
            ))}
          </div>
        )}
      </div> */}

      {/* Assigned To Dropdown */}
      {/* <div className="bg-white m-6 p-6 rounded-lg shadow-lg border-l-4 border-teal-400">
        <h2 className="text-xl font-bold text-teal-600 mb-4">
          📤 Assigned To ({assignedToUsers.length})
        </h2>
        <button
          onClick={() => setShowAssignedTo(!showAssignedTo)}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
        >
          Toggle Assigned To List
        </button>
        {showAssignedTo && (
          <div className="mt-4 space-y-2">
            {assignedToUsers.map((user, idx) => (
              <div key={idx} className="text-gray-700">
                👤 {user}
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default UserPage;
