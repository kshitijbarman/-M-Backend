import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill the data");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:6969/user/forget",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFormData(res.data);
      alert("Password Reset successfully...");
      navigate("/");
    } catch (error) {
      console.log("Error submitting data:", error);
      alert(error.response.data.message);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex h-[700px] w-full items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-4xl text-gray-900 font-bold mb-4">
          Forget Password
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Please enter your email and new password
        </p>

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full"
            />
          </div>

          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Submit
          </button>

          <NavLink to="/login" className="w-full">
            <button
              type="button"
              className="mt-2 w-full h-11 rounded-full text-white bg-gray-600 hover:bg-gray-700 transition duration-200"
            >
              Back to Login
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
