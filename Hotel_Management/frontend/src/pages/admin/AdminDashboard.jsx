import React, { useState } from "react";
import {
  FaHotel,
  FaBed,
  FaMapMarkedAlt,
  FaCity,
  FaCalendarCheck,
  FaUsers,
  FaUserTie,
  FaBroom,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Location from "../../components/AdminComponents/Location";
import State from "./../../components/AdminComponents/State";
import Dashboard from "./../../components/AdminComponents/Dashboard";
import Hotel from "../../components/AdminComponents/Hotel";
import Room from "./../../components/AdminComponents/Room";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("state");

  const ComponentPlaceholder = ({ title }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title} Content</h2>
      <p className="text-gray-600">
        This is where the {title.toLowerCase()} content will be displayed.
      </p>
    </div>
  );

  const getContent = () => {
    if (activeTab === "dashboard") return <Dashboard />;
    if (activeTab === "location") return <Location />;
    if (activeTab === "state") return <State />;
    if (activeTab === "Hotel") return <Hotel />;
    if (activeTab === "rooms") return <Room />;
    return (
      <ComponentPlaceholder
        title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      />
    );
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FaHotel },
    { id: "state", label: "State", icon: FaMapMarkedAlt },
    { id: "location", label: "Location", icon: FaCity },
    { id: "Hotel", label: "Hotel ", icon: FaHotel },
    { id: "rooms", label: "Rooms ", icon: FaBed },
    // { id: "bookings", label: "Bookings", icon: FaCalendarCheck },
    // { id: "guests", label: "Guests", icon: FaUsers },
    // { id: "staff", label: "Staff", icon: FaUserTie },
    // { id: "housekeeping", label: "Housekeeping", icon: FaBroom },
    // { id: "reports", label: "Reports", icon: FaChartBar },
    // { id: "settings", label: "Settings", icon: FaCog },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleAdmin = () => {
    navigate("/profile");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-700 text-white flex flex-col transition-all duration-300 ease-in-out">
        <div className="p-5 border-b border-indigo-600 flex items-center space-x-3">
          <div className="text-3xl font-bold text-cyan-400">🏨</div>
          <div>
            <h1 className="text-xl font-bold"> Admin</h1>
            <p className="text-xs text-indigo-300">Management Panel</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full py-2 px-4 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-cyan-500 text-white"
                      : "hover:bg-indigo-600"
                  }`}
                >
                  <item.icon className="mr-3" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-indigo-600">
          <button
            onClick={handleLogout}
            className="flex items-center w-full py-2 px-4 rounded-lg hover:bg-indigo-600 text-left transition"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-indigo-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-sm text-gray-500">Welcome back, Admin!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 bg-white rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
                A
              </div>
              <span
                onClick={handleAdmin}
                className="ml-2 text-gray-700 font-medium"
              >
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Component */}
        {getContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
