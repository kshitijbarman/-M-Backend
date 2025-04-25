import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:6969/user/signup", formData);
      localStorage.setItem("otpEmail", formData.email);
      navigate("/verification");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
    console.log(formData);

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="bg-blue-200 h-screen pt-8 w-full">
      <div className="max-w-md mx-auto mt-12 p-8 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Create Account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-blue-800">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-800">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleNavigate}
            className="text-sm text-blue-700 hover:underline"
          >
            Already have an account? Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
