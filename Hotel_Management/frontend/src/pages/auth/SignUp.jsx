// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.password
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:6969/user/signup", formData);
//       localStorage.setItem("otpEmail", formData.email);
//       navigate("/verification");
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//     console.log(formData);

//     // Reset form after submission
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//     });
//   };

//   const handleNavigate = () => {
//     navigate("/");
//   };

//   return (
//     <div className="bg-blue-200 h-screen pt-8 w-full">
//       <div className="max-w-md mx-auto mt-12 p-8 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl shadow-2xl">
//         <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
//           Create Account
//         </h2>
//         <form className="space-y-5" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-blue-800">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-blue-800">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-blue-800">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-blue-800">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               placeholder="******"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
//           >
//             Sign Up
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <button
//             onClick={handleNavigate}
//             className="text-sm text-blue-700 hover:underline"
//           >
//             Already have an account? Log In
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    const { name, email, phone, age, gender, password } = formData;
    if (!name || !email || !phone || !age || !gender || !password) {
      alert("Please fill in all fields");
      return;
    }
    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:6969/user/signup",
        formData
      );
      alert("Signup successful!");
      navigate("/verification", { state: { email: formData.email } });
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      password: "",
    });
  };

  return (
    <div className="flex h-[690px] w-full items-center justify-center  ">
      <div className="w-[27rem] h-[38rem] rounded-4xl flex flex-col items-center justify-center  shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">Sign Up</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Create your account to get started
          </p>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="mt-6 w-full h-12 rounded-full border border-gray-300/60 px-6 text-sm text-gray-500/80 placeholder-gray-500/80 bg-transparent outline-none"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email id"
            value={formData.email}
            onChange={handleChange}
            className="mt-4 w-full h-12 rounded-full border border-gray-300/60 px-6 text-sm text-gray-500/80 placeholder-gray-500/80 bg-transparent outline-none"
            required
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="mt-4 w-full h-12 rounded-full border border-gray-300/60 px-6 text-sm text-gray-500/80 placeholder-gray-500/80 bg-transparent outline-none"
            required
          />

          {/* Age */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="mt-4 w-full h-12 rounded-full border border-gray-300/60 px-6 text-sm text-gray-500/80 placeholder-gray-500/80 bg-transparent outline-none"
            required
          />

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-4 w-full h-12 rounded-full border border-gray-300/60 px-6 text-sm text-gray-500/80 bg-transparent outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="mt-4 w-full h-12 rounded-full border border-gray-300/60 px-6 text-sm text-gray-500/80 placeholder-gray-500/80 bg-transparent outline-none"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>

          {/* Login link */}
          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account?{" "}
            <NavLink to="/" className="text-indigo-400 hover:underline">
              Log in
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
