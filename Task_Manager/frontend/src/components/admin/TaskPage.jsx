// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TaskPage = () => {
//   const [tasks, setTasks] = useState([]);
//   const [pendingTasks, setPendingTasks] = useState([]);
//   const [inProgressTasks, setInProgressTasks] = useState([]);
//   const [completedTasks, setCompletedTasks] = useState([]);
//   const [cancelledTasks, setCancelledTasks] = useState([]);

//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:6969/task/getAll", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const allTasks = res.data;

//       setTasks(allTasks);
//       setPendingTasks(allTasks.filter((task) => task.status === "pending"));
//       setInProgressTasks(
//         allTasks.filter((task) => task.status === "inProgress")
//       );
//       setCompletedTasks(allTasks.filter((task) => task.status === "completed"));
//       setCancelledTasks(allTasks.filter((task) => task.status === "cancelled"));
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:6969/task/delete`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: { taskId },
//       });
//       fetchTasks(); 
//     } catch (err) {
//       console.error("Error deleting task:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
//         <h1 className="text-2xl font-bold">Task Management</h1>
//         <button className="bg-white text-blue-600 px-4 py-2 rounded font-semibold">
//           Logout
//         </button>
//       </div>

//       {/* Total Tasks */}
//       <div className="bg-white m-6 p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold text-blue-700 mb-4">
//           Total Tasks: {tasks.length}
//         </h2>
//       </div>

//       {/* Pending Tasks */}
//       <TaskBox
//         title="Pending Tasks"
//         color="amber-900"
//         tasks={pendingTasks}
//         handleDelete={handleDelete}
//       />

//       {/* In Progress Tasks */}
//       <TaskBox
//         title="In Progress Tasks"
//         color="blue-600"
//         tasks={inProgressTasks}
//         handleDelete={handleDelete}
//       />

//       {/* Completed Tasks */}
//       <TaskBox
//         title="Completed Tasks"
//         color="green-600"
//         tasks={completedTasks}
//         handleDelete={handleDelete}
//       />

//       {/* Cancelled Tasks */}
//       <TaskBox
//         title="Cancelled Tasks"
//         color="red-600"
//         tasks={cancelledTasks}
//         handleDelete={handleDelete}
//       />
//     </div>
//   );
// };

// const TaskBox = ({ title, color, tasks, handleDelete }) => (
//   <div className="bg-white m-6 p-6 rounded-lg shadow-md">
//     <h2 className={`text-xl font-semibold text-${color} mb-4`}>
//       {title} ({tasks.length})
//     </h2>
//     {tasks.map((task) => (
//       <div
//         key={task._id}
//         className="flex justify-between items-center border-b py-2"
//       >
//         <div className="flex flex-col">
//           <p className="font-medium">Title : {task.title}</p>
//           <p className="font-medium">Category : {task.category}</p>
//           <p className="text-sm text-gray-700">
//             description :{task.description}
//           </p>
//         </div>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleDelete(task._id)}
//             className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//           >
//             Pending
//           </button>
//           <button
//             onClick={() => handleDelete(task._id)}
//             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//           >
//             Progress
//           </button>
//           <button
//             onClick={() => handleDelete(task._id)}
//             className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//           >
//             Completed
//           </button>
//           <button
//             onClick={() => handleDelete(task._id)}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Cancelled
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// export default TaskPage;








import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [cancelledTasks, setCancelledTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:6969/task/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allTasks = res.data;

      setTasks(allTasks);
      setPendingTasks(allTasks.filter((task) => task.status === "pending"));
      setInProgressTasks(
        allTasks.filter((task) => task.status === "inProgress")
      );
      setCompletedTasks(allTasks.filter((task) => task.status === "completed"));
      setCancelledTasks(allTasks.filter((task) => task.status === "cancelled"));
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:6969/task/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { taskId },
      });
      fetchTasks(); 
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Navbar */}
      <div className="bg-indigo-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">📋 Task Management</h1>
        <button className="bg-white text-indigo-700 px-4 py-2 rounded font-semibold shadow hover:bg-indigo-100">
          🚪 Logout
        </button>
      </div>

      {/* Total Tasks */}
      <div className="bg-white m-6 p-6 rounded-lg shadow-md border-l-8 border-indigo-600">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">📊 Total Tasks: {tasks.length}</h2>
      </div>

      {/* Task Sections */}
      <TaskBox title="🕒 Pending Tasks" color="amber-600" tasks={pendingTasks} handleDelete={handleDelete} />
      <TaskBox title="🚧 In Progress Tasks" color="blue-600" tasks={inProgressTasks} handleDelete={handleDelete} />
      <TaskBox title="✅ Completed Tasks" color="green-600" tasks={completedTasks} handleDelete={handleDelete} />
      <TaskBox title="❌ Cancelled Tasks" color="red-600" tasks={cancelledTasks} handleDelete={handleDelete} />
    </div>
  );
};

const TaskBox = ({ title, color, tasks, handleDelete }) => (
  <div className="bg-white m-6 p-6 rounded-lg shadow-md">
    <h2 className={`text-xl font-semibold text-${color} mb-4`}>{title} ({tasks.length})</h2>
    {tasks.length === 0 ? (
      <p className="text-gray-500">No tasks found.</p>
    ) : (
      tasks.map((task) => (
        <div
          key={task._id}
          className="flex justify-between items-start border-b py-3 px-2 hover:bg-gray-50 rounded-md transition"
        >
          <div>
            <p className="font-semibold text-lg text-gray-800">{task.title}</p>
            <p className="text-sm text-gray-600">Category: {task.category}</p>
            <p className="text-sm text-gray-500">{task.description}</p>
          </div>
          <button
            onClick={() => handleDelete(task._id)}
            className={`bg-${color} text-white px-3 py-1 mt-2 rounded hover:opacity-90`}
          >
            Delete
          </button>
        </div>
      ))
    )}
  </div>
);

export default TaskPage;