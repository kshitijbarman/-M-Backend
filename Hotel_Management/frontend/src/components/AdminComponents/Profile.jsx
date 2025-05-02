import React, { useEffect, useState } from "react";
import API_URL from "../../utils/api";
import axios from "axios";
const token = localStorage.getItem("token");

const Profile = () => {
  const [adminInfo, setAdminInfo] = useState("");

  const fetchAdminInfo = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminInfo(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  useEffect(() => {
    fetchAdminInfo();
  }, []);
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Picture Placeholder */}
          <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-semibold shadow-inner">
            <img
              src="https://res.cloudinary.com/dzfu7xjxt/image/upload/v1745778984/uw3ggzbf6kjfuuuv0qz7.jpg"
              className="h-full w-full rounded-full"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {adminInfo.name}
              </h1>
              <p className="text-gray-500 mt-1">
                Admin | Hotel Management System
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-base">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-600">{adminInfo.email}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-gray-600">{adminInfo.phone}</p>
              </div>
              <div>
                <p className="font-medium">Role</p>
                <p className="text-sm text-gray-600">{adminInfo.role}</p>
              </div>
              <div>
                <p className="font-medium">Joined</p>
                <p className="text-sm text-gray-600">{adminInfo.createdAt}</p>
              </div>
            </div>

            <div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
