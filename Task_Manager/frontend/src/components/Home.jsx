// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();
//   const [stuData, setStuData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get("http://localhost:6969/task/gettAll", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(res.data);
//       setStuData(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleDelete = async (email) => {
//     console.log(email);
//     try {
//       await axios.delete("http://localhost:6969/task/delete", {
//         data: { email },
//       });
//       alert("Student deleted Successfully...");
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert(error.response.data.message);
//     }
//   };
//   const handleUpdate = () => {
//     navigate("/update");
//   };
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">User Info</h1>

//       {loading ? (
//         <h1 className="text-xl text-center">...Loading...</h1>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {stuData.map((stu, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
//             >
//               <h2 className="text-xl font-semibold text-blue-600 mb-2">
//                 {stu.title}
//               </h2>
//               <p className="text-gray-700">
//                 📧 <span className="font-medium">Email:</span> {stu.category}
//               </p>
//               <p className="text-gray-700">
//                 📞 <span className="font-medium">Phone:</span> {stu.description}
//               </p>
//               <p className="text-gray-700">
//                 🕒 <span className="font-medium">Joined:</span>{" "}
//                 {new Date(stu.createdAt).toLocaleDateString()}
//               </p>
//               <div className="space-x-20 pt-2">
//                 <button
//                   onClick={() => handleDelete(stu.email)}
//                   className="bg-blue-600 px-3 rounded-md py-1"
//                 >
//                   delete
//                 </button>
//                 <button
//                   onClick={() => handleUpdate(stu.email)}
//                   className="bg-green-600 px-3 rounded-md py-1"
//                 >
//                   update
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [stuData, setStuData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:6969/task/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setStuData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (taskId) => {
    console.log(taskId);
    try {
      await axios.delete("http://localhost:6969/task/delete", {
        data: { taskId },
      });
      alert("Task deleted Successfully...");
      fetchData(); // Re-fetch data after deletion
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(error.response.data.message);
    }
  };

  const handleUpdate = (taskId) => {
    navigate(`/update/${taskId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Name : {stuData[0]?.userId?.name || "pta nhi"}
      </h1>
      <h6 className="text-3xl font-bold text-center mb-8">
        Email : {stuData[0]?.userId?.email || "pta nhi"}
      </h6>

      {loading ? (
        <h1 className="text-xl text-center">...Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stuData.map((stu) => (
            <>
              <div
                key={stu._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  Title : {stu.title}
                </h2>
                <p className="text-gray-700">
                  📧 <span className="font-medium">Created By:</span>{" "}
                  {stu.userId.name}
                </p>
                <p className="text-gray-700">
                  📧 <span className="font-medium">Created By:</span>{" "}
                  {console.log(stu.userId)}
                </p>

                <p className="text-gray-700">
                  📧 <span className="font-medium">Category:</span>{" "}
                  {stu.category}
                </p>
                <p className="text-gray-700">
                  📞 <span className="font-medium">Description:</span>{" "}
                  {stu.description}
                </p>
                <p className="text-gray-700">
                  🕒 <span className="font-medium">Due Date:</span>{" "}
                  {new Date(stu.createdAt).toLocaleDateString()}
                </p>
                <div className="space-x-2 pt-2">
                  <button
                    onClick={() => handleDelete(stu._id)} // Pass task ID for delete
                    className="bg-red-600 px-3 py-1 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(stu._id)} // Pass task ID to update
                    className="bg-green-600 px-3 py-1 text-white rounded-md hover:bg-green-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
