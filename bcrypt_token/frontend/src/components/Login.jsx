import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
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
    console.log(formData);
    if (!formData.email || !formData.password) {
      alert("Please fill the data");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:6969/user/login",
        formData
      );
      alert("login successfully...");
      navigate("/");
      console.log(res.data.token);
      const token = res.data.token;
      localStorage.setItem("token", token);
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">LogIn</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="******"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>

      <div className="flex justify-between py-5">
        <NavLink to="/forget-pass">
          <button className="text-blue-900">Forget Password</button>
        </NavLink>
        <NavLink to="/rest-pass">
          <button className="text-blue-900">Reset Password</button>
        </NavLink>
      </div>

      <button
        // type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default Login;
