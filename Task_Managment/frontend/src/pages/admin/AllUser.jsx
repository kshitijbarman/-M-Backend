import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllUser = () => {
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

  // const fetchTasks = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.get("http://localhost:6969/task/getTask", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setTasks(res.data);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error("Error fetching tasks:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    // navigate("/assign-task", userId);
    navigate(`/assign-task?userId=${userId}`);
  };
  const handleShowTask = async (userId) => {
    // navigate("/assign-task", userId);
    console.log(userId);
    navigate(`/show-task?userId=${userId}`);
  };

  useEffect(() => {
    fetchUsers();
    // fetchTasks();
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 p-4">
      {/* Navbar */}
      <div className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold tracking-wide">👥 User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-100"
        >
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
                onClick={() => handleShowTask(user._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Show Task
              </button>
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
    </div>
  );
};

export default AllUser;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AllUser = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [activeUsers, setActiveUsers] = useState([]);
//   const [inactiveUsers, setInactiveUsers] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeUserId, setActiveUserId] = useState(null); // State to track which user's tasks to show

//   // Fetch all users
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

//   // Fetch tasks for a specific user when their name is clicked
//   const fetchTasksForUser = async (userId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:6969/task/getAll", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Filter tasks for the specific user
//       const userTasks = res.data.filter((task) => task.userId._id === userId);
//       setTasks(userTasks);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     }
//   };

//   // Toggle visibility of tasks for a clicked user
//   const toggleTasksVisibility = (userId) => {
//     if (activeUserId === userId) {
//       // If the tasks are already visible for this user, hide them
//       setActiveUserId(null);
//     } else {
//       // Otherwise, show tasks for this user
//       setActiveUserId(userId);
//       fetchTasksForUser(userId);
//     }
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

//       {/* Active Users */}
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
//                 onClick={() => toggleTasksVisibility(user._id)}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//               >
//                 {activeUserId === user._id ? "Hide Tasks" : "View Tasks"}
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* Display tasks for active user */}
//         {activeUserId && (
//           <div className="bg-white mt-4 p-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-bold text-gray-800">Assigned Tasks</h3>
//             {tasks.length === 0 ? (
//               <p>No tasks assigned to this user.</p>
//             ) : (
//               tasks.map((task) => (
//                 <div key={task._id} className="mt-2 p-2 border rounded-md shadow-sm">
//                   <h4 className="font-semibold text-gray-700">{task.title}</h4>
//                   <p>{task.description}</p>
//                   <p>Status: {task.status}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>

//       {/* Inactive Users */}
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
//                 onClick={() => toggleTasksVisibility(user._id)}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//               >
//                 {activeUserId === user._id ? "Hide Tasks" : "View Tasks"}
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* Display tasks for inactive user */}
//         {activeUserId && (
//           <div className="bg-white mt-4 p-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-bold text-gray-800">Assigned Tasks</h3>
//             {tasks.length === 0 ? (
//               <p>No tasks assigned to this user.</p>
//             ) : (
//               tasks.map((task) => (
//                 <div key={task._id} className="mt-2 p-2 border rounded-md shadow-sm">
//                   <h4 className="font-semibold text-gray-700">{task.title}</h4>
//                   <p>{task.description}</p>
//                   <p>Status: {task.status}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllUser;
