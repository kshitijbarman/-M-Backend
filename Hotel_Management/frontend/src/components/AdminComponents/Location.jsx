// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API_URL from "../../utils/api";

// const Location = () => {
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedStateId, setSelectedStateId] = useState("");
//   const [formData, setFormData] = useState({ city: "" });

//   const token = localStorage.getItem("token");

//   // Fetch all states
//   const fetchStates = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/state/getAllState`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const activeStates = res.data.filter(
//         (state) => state.isActive === "true"
//       );
//       setStates(activeStates);
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   // Fetch all cities with populated state
//   const fetchCities = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/city/getAllCity`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCities(res.data);
//       console.log(res.data);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStates();
//     fetchCities();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submit city

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if state is selected
//     if (!selectedStateId) {
//       alert("Please select a state first.");
//       return;
//     }

//     // Check if city input is provided
//     if (!formData.city.trim()) {
//       alert("Please enter a city name.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       // API call to save city
//       const response = await axios.post(
//         `${API_URL}/city/addCity`,
//         {
//           city: formData.city.trim(),
//           stateId: selectedStateId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("City added successfully!");

//       // Reset form
//       setFormData({ city: "" });

//       // Refresh city list
//       fetchCities();
//     } catch (error) {
//       console.error("Error saving city:", error);
//       alert(
//         error?.response?.data?.message ||
//           "Something went wrong while saving the city."
//       );
//     }
//   };

//   return (
//     <div className="p-4 bg-white space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Add City</h2>

//       {/* Select State */}
//       <select
//         className="border px-3 py-2 rounded w-full mb-4"
//         value={selectedStateId}
//         onChange={(e) => setSelectedStateId(e.target.value)}
//         required
//       >
//         <option value="">-- Select State --</option>
//         {states.map((state) => (
//           <option key={state._id} value={state._id}>
//             {state.state}
//           </option>
//         ))}
//       </select>

//       {/* Add City Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="city"
//           value={formData.city}
//           placeholder="City Name"
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Save City
//         </button>
//       </form>

//       {/* Show Cities under States */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-3">📍 Cities by State</h3>
//         {cities.length === 0 ? (
//           <p>No cities available.</p>
//         ) : (
//           <ul className="space-y-2">
//             {cities.map((city) => (
//               <li key={city._id} className="border p-2 rounded">
//                 <strong>{city.stateId?.state || "Unknown State"}:</strong>{" "}
//                 {city.name} ({city.city})
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Location;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API_URL from "../../utils/api";

// const Location = () => {
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedStateId, setSelectedStateId] = useState("");
//   const [formData, setFormData] = useState({ city: "" });

//   const token = localStorage.getItem("token");

//   const fetchStates = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/state/getAllState`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStates(res.data);
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const fetchCities = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/city/getAllCity`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCities(res.data);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStates();
//     fetchCities();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedStateId) {
//       alert("Please select a state first.");
//       return;
//     }
//     if (!formData.city.trim()) {
//       alert("Please enter a city name.");
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_URL}/city/addCity`,
//         {
//           city: formData.city.trim(),
//           stateId: selectedStateId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("City added successfully!");
//       setFormData({ city: "" });
//       fetchCities();
//     } catch (error) {
//       console.error("Error saving city:", error);
//       alert(
//         error?.response?.data?.message ||
//           "Something went wrong while saving the city."
//       );
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/city/deleteCity/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCities();
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   const handleToggleActive = async (id, isActive) => {
//     try {
//       await axios.put(
//         `${API_URL}/city/inactiveCity/${id}`,
//         { isActive: isActive === "true" ? "false" : "true" },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       fetchCities();
//     } catch (error) {
//       console.error("Error toggling city active state:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 space-y-6 rounded-xl shadow-lg">
//       <h2 className="text-3xl font-bold text-blue-800">Add City</h2>

//       <select
//         className="border px-3 py-2 rounded w-full"
//         value={selectedStateId}
//         onChange={(e) => setSelectedStateId(e.target.value)}
//       >
//         <option value="">-- Select State --</option>
//         {states.map((state) => (
//           <option
//             key={state._id}
//             value={state._id}
//             disabled={state.isActive !== "true"}
//           >
//             {state.state} {state.isActive !== "true" && "(Inactive)"}
//           </option>
//         ))}
//       </select>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="city"
//           value={formData.city}
//           placeholder="City Name"
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Save City
//         </button>
//       </form>

//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//           📍 Cities by State
//         </h3>
//         {states.map((state) => (
//           <div key={state._id} className="mb-6">
//             <h4 className="text-lg font-bold text-blue-700">
//               {state.state} {state.isActive !== "true" && "(Inactive)"}
//             </h4>
//             <ul className="space-y-2 mt-2">
//               {cities
//                 .filter((city) => city.stateId?._id === state._id)
//                 .map((city) => (
//                   <li
//                     key={city._id}
//                     className={`p-3 rounded flex justify-between items-center shadow-sm ${
//                       city.isActive === "true"
//                         ? "bg-white"
//                         : "bg-red-100 text-gray-600"
//                     }`}
//                   >
//                     <div>
//                       {city.city} {city.isActive !== "true" && "(Inactive)"}
//                     </div>
//                     <div className="space-x-2">
//                       <button
//                         onClick={() =>
//                           handleToggleActive(city._id, city.isActive)
//                         }
//                         className="bg-yellow-500 text-white px-3 py-1 rounded"
//                       >
//                         {city.isActive === "true" ? "Deactivate" : "Activate"}
//                       </button>
//                       <button
//                         onClick={() => handleDelete(city._id)}
//                         className="bg-red-600 text-white px-3 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Location;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API_URL from "../../utils/api";

// const Location = () => {
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedStateId, setSelectedStateId] = useState("");
//   const [formData, setFormData] = useState({ city: "" });

//   const token = localStorage.getItem("token");

//   const fetchStates = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/state/getAllState`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const activeStates = res.data.filter((state) => state.isActive);
//       setStates(activeStates);
//       setStates(res.data);
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const fetchCities = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/city/getAllCity`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCities(res.data);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStates();
//     fetchCities();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedStateId) {
//       alert("Please select a state first.");
//       return;
//     }
//     if (!formData.city.trim()) {
//       alert("Please enter a city name.");
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_URL}/city/addCity`,
//         {
//           city: formData.city.trim(),
//           stateId: selectedStateId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("City added successfully!");
//       setFormData({ city: "" });
//       fetchCities();
//     } 
//     catch (error) {
//       console.error("Error saving city:", error);
//       alert(
//         error?.response?.data?.message ||
//           "Something went wrong while saving the city."
//       );
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/city/deleteCity/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCities();
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   const handleToggleActive = async (id, isActive) => {
//     try {
//       await axios.put(
//         `${API_URL}/city/inactiveCity/${id}`,
//         { isActive: isActive === true ? false : true },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       fetchCities();
//     } catch (error) {
//       console.error("Error toggling city active state:", error);
//     }
//   };


  

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-white to-blue-50 space-y-8 rounded-xl shadow-2xl">
//       <h2 className="text-3xl font-bold text-blue-800 border-b pb-2">
//         🏙️ Add New City
//       </h2>

//       {/* State Dropdown */}
//       <div>
//         <label className="block text-md font-semibold text-gray-700 mb-2">
//           Select State
//         </label>
//         <select
//           className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
//           value={selectedStateId}
//           onChange={(e) => setSelectedStateId(e.target.value)}
//           required
//         >
//           <option value="">-- Select State --</option>
//           {states.map((state) => (
//             <option
//               key={state._id}
//               value={state._id}
//               disabled={!state.isActive}
//             >
//               {state.state} {!state.isActive && "(Inactive)"}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* City Form */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-md font-semibold text-gray-700">
//             City
//           </label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             placeholder="Enter city name"
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-md"
//         >
//           ➕ Add City
//         </button>
//       </form>

//       {/* Cities Display Section */}
//       <div>
//         <h3 className="text-xl font-semibold text-blue-700 mt-6 mb-3">
//           🏙️ Cities by State
//         </h3>
//         {states.map((state) => (
//           <div key={state._id} className="mb-6">
//             <h4 className="text-lg font-bold text-blue-700">
//               {state.state} {!state.isActive && "(Inactive)"}
//             </h4>
//             <ul className="space-y-3 mt-2">
//               {cities
//                 .filter((city) => city.stateId?._id === state._id)
//                 .map((city) => (
//                   <li
//                     key={city._id}
//                     className={`flex justify-between items-center p-4 rounded-lg shadow hover:shadow-md transition ${
//                       city.isActive ? "bg-white" : "bg-red-100 text-gray-600"
//                     }`}
//                   >
//                     <span className="font-medium">
//                       📍 {city.city} {!city.isActive && "(Inactive)"}
//                     </span>
//                     <div className="space-x-2">
//                       <button
//                         onClick={() =>
//                           handleToggleActive(city._id, city.isActive)
//                         }
//                         className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
//                       >
//                         {city.isActive ? "Deactivate" : "Activate"}
//                       </button>
//                       <button
//                         onClick={() => handleDelete(city._id)}
//                         className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Location;







import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../utils/api";

const Location = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState("");
  const [formData, setFormData] = useState({ city: "" });

  const token = localStorage.getItem("token");

  // Fetch all states
  const fetchStates = async () => {
    try {
      const res = await axios.get(`${API_URL}/state/getAllState`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStates(res.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Fetch all cities
  const fetchCities = async () => {
    try {
      const res = await axios.get(`${API_URL}/city/getAllCity`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCities(res.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchCities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStateId) {
      alert("Please select a state first.");
      return;
    }
    if (!formData.city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/city/addCity`,
        {
          city: formData.city.trim(),
          stateId: selectedStateId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("City added successfully!");
      setFormData({ city: "" });
      fetchCities();
    } catch (error) {
      console.error("Error saving city:", error);
      alert(
        error?.response?.data?.message ||
          "Something went wrong while saving the city."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/city/deleteCity/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCities();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await axios.put(
        `${API_URL}/city/inactiveCity/${id}`,
        { isActive: !isActive },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCities();
    } catch (error) {
      console.error("Error toggling city active state:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-white to-blue-50 space-y-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-blue-800 border-b pb-2">
        🏙️ Add New City
      </h2>

      {/* State Dropdown */}
      <div>
        <label className="block text-md font-semibold text-gray-700 mb-2">
          Select State
        </label>
        <select
          className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={selectedStateId}
          onChange={(e) => setSelectedStateId(e.target.value)}
          required
        >
          <option value="">-- Select State --</option>
          {states.map((state) => (
            <option
              key={state._id}
              value={state._id}
              disabled={!state.isActive}
            >
              {state.state} {!state.isActive && "(Inactive)"}
            </option>
          ))}
        </select>
      </div>

      {/* City Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-md font-semibold text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            placeholder="Enter city name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-md"
        >
          ➕ Add City
        </button>
      </form>

      {/* Cities Display Section */}
      <div>
        <h3 className="text-xl font-semibold text-blue-700 mt-6 mb-3">
          🏙️ Cities by State
        </h3>
        {states.map((state) => (
          <div key={state._id} className="mb-6">
            <h4 className="text-lg font-bold text-blue-700">
              {state.state} {!state.isActive && "(Inactive)"}
            </h4>
            <ul className="space-y-3 mt-2">
              {cities
                .filter((city) => city.stateId?._id === state._id)
                .map((city) => (
                  <li
                    key={city._id}
                    className={`flex justify-between items-center p-4 rounded-lg shadow hover:shadow-md transition ${
                      city.isActive ? "bg-white" : "bg-red-100 text-gray-600"
                    }`}
                  >
                    <span className="font-medium">
                      📍 {city.city} {!city.isActive && "(Inactive)"}
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() =>
                          handleToggleActive(city._id, city.isActive)
                        }
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                      >
                        {city.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(city._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
