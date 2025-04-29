
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
    // console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:6969/user/signup",
        formData
      );
      // alert("Signup successful!");
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
