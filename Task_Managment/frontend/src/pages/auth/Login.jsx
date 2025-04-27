import React, { useState } from "react";
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

    if (!formData.email || !formData.password) {
      alert("Please fill in all the fields");
      return;
    }

    // try {
    //   const res = await axios.post(
    //     "http://localhost:6969/user/login",
    //     formData
    //   );
    //   alert("Login successful!");
    //   localStorage.setItem("isLogin", true);
    //   localStorage.setItem("token", res.data.token);
    //   // navigate("/user");
    //   if (response.data.role === "admin") {
    //     navigate("/dashboard");
    //   } else {
    //     navigate("/user");
    //   }
    // } catch (error) {
    //   console.error("Login error:", error);
    //   alert(error.response?.data?.message || "Login failed");
    // }

    try {
      const res = await axios.post(
        "http://localhost:6969/user/login",
        formData
      );
      alert("Login successful!");
      localStorage.setItem("isLogin", true);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("token", res.data.token);

      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }

    setFormData({
      email: "",
      password: "",
    });

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLogin");
      if (!isLoggedIn) {
        navigate("/");
      }
    }, []);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm text-blue-700">
          <NavLink to="/forget-pass" className="hover:underline">
            Forgot Password?
          </NavLink>
          <NavLink to="/reset-pass" className="hover:underline">
            Reset Password
          </NavLink>
        </div>

        <NavLink to="/sign-up">
          <button className="w-full mt-6 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-300">
            Don't have an account? Sign Up
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
