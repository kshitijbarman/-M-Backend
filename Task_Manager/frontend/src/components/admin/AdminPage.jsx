// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminPage = () => {
//   const [admins, setAdmins] = useState([]);
//   const [activeAdmins, setActiveAdmins] = useState([]);
//   const [inactiveAdmins, setInactiveAdmins] = useState([]);

//   const fetchAdmins = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:6969/user/getAdmin", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const allAdmins = res.data.filter((user) => user.role === "admin");

//       setAdmins(allAdmins);
//       setActiveAdmins(allAdmins.filter((admin) => admin.status === "active"));
//       setInactiveAdmins(
//         allAdmins.filter((admin) => admin.status === "inactive")
//       );
//     } catch (err) {
//       console.error("Error fetching admins:", err);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:6969/user/delete `, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: { taskId },
//       });
//       fetchAdmins();
//     } catch (err) {
//       console.error("Error deleting admin:", err);
//     }
//   };

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

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

//       fetchAdmins();
//     } catch (err) {
//       console.error("Error marking task as active:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
//         <h1 className="text-2xl font-bold">Admin Management</h1>
//         <button className="bg-white text-blue-600 px-4 py-2 rounded font-semibold">
//           Logout
//         </button>
//       </div>

//       <div className="bg-white m-6 p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold text-green-600 mb-4">
//           {/* Total Admins ({admins.length}) */}
//         </h2>
//       </div>

//       {/* Active Admins Box */}
//       <div className="bg-white m-6 p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold text-green-600 mb-4">
//           Active Admins ({activeAdmins.length})
//         </h2>
//         {activeAdmins.map((admin) => (
//           <div
//             key={admin._id}
//             className="flex justify-between items-center border-b py-2"
//           >
//             <div className="flex space-x-5">
//               <p className="font-medium">{admin.name}</p>
//               <p className="text-sm text-gray-900">{admin.email}</p>
//             </div>
//             <button
//               onClick={() => handleDelete(admin._id)}
//               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Inactive Admins Box */}
//       <div className="bg-white m-6 p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold text-red-600 mb-4">
//           Inactive Admins ({inactiveAdmins.length})
//         </h2>
//         {inactiveAdmins.map((admin) => (
//           <div
//             key={admin._id}
//             className="flex justify-between items-center border-b py-2"
//           >
//             <div className="flex space-x-5">
//               <p className="font-medium">{admin.name}</p>
//               <p className="text-sm text-gray-900">{admin.email}</p>
//             </div>
//             <div className="space-x-5">
//               <button
//                 onClick={() => handleActive(admin._id)}
//                 className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-800"
//               >
//                 active
//               </button>
//               <button
//                 onClick={() => handleDelete(admin._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

// export default AdminPage;






import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);
  const [activeAdmins, setActiveAdmins] = useState([]);
  const [inactiveAdmins, setInactiveAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:6969/user/getAdmin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allAdmins = res.data.filter((user) => user.role === "admin");

      setAdmins(allAdmins);
      setActiveAdmins(allAdmins.filter((admin) => admin.status === "active"));
      setInactiveAdmins(allAdmins.filter((admin) => admin.status === "inactive"));
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  const handleDelete = async (adminId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:6969/user/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { taskId: adminId },
      });
      fetchAdmins();
    } catch (err) {
      console.error("Error deleting admin:", err);
    }
  };

  const handleActive = async (adminId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        "http://localhost:6969/user/active",
        { taskId: adminId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAdmins();
    } catch (err) {
      console.error("Error marking admin as active:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
      {/* Navbar */}
      <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold">Admin Management</h1>
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-50">
          Logout
        </button>
      </div>

      {/* Summary */}
      <div className="bg-white mt-6 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          Total Admins: {admins.length}
        </h2>
      </div>

      {/* Active Admins Box */}
      <div className="bg-white m-6 p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          ✅ Active Admins ({activeAdmins.length})
        </h2>
        {activeAdmins.map((admin) => (
          <div
            key={admin._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div className="flex flex-col">
              <span className="font-semibold">👤 {admin.name}</span>
              <span className="text-sm text-gray-700">📧 {admin.email}</span>
            </div>
            <button
              onClick={() => handleDelete(admin._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Inactive Admins Box */}
      <div className="bg-white m-6 p-6 rounded-lg shadow-md border-l-4 border-red-500">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          ❌ Inactive Admins ({inactiveAdmins.length})
        </h2>
        {inactiveAdmins.map((admin) => (
          <div
            key={admin._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div className="flex flex-col">
              <span className="font-semibold">👤 {admin.name}</span>
              <span className="text-sm text-gray-700">📧 {admin.email}</span>
            </div>
            <div className="space-x-3">
              <button
                onClick={() => handleActive(admin._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Activate
              </button>
              <button
                onClick={() => handleDelete(admin._id)}
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

export default AdminPage;
