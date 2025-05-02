import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../utils/api";
import { useNavigate } from "react-router-dom";

const ShowHotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const token = localStorage.getItem("token");

  // Fetch all hotels
  const fetchHotels = async () => {
    try {
      const res = await axios.get(`${API_URL}/hotel/getAllHotel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHotels(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Filtered and Sorted Hotels
  const filteredHotels = hotels
    .filter((hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "rating") {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
      } else {
        const nameA = a[sortField]?.toLowerCase() || "";
        const nameB = b[sortField]?.toLowerCase() || "";
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
    });

  const handleShoeRoom = (id) => {
    console.log(id);
    navigate(`/show-room/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">🏨 All Hotels</h2>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by hotel name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
            <option value="cityId">Sort by City</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm"
          >
            <option value="asc">⬆ Ascending</option>
            <option value="desc">⬇ Descending</option>
          </select>
        </div>
      </div>

      {/* Hotel List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div
            onClick={() => handleShoeRoom(hotel._id)}
            key={hotel._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {hotel.hotelImage && (
              <img
                src={hotel.hotelImage}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold text-blue-800">{hotel.name}</h3>
              <p className="text-gray-600 mb-1">{hotel.address}</p>
              <p className="text-sm text-gray-500">📞 {hotel.phone}</p>
              <p className="text-sm text-gray-500">⭐ Rating: {hotel.rating}</p>
              <p className="text-sm text-gray-500">
                🏙️ City ID: {hotel.cityId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowHotels;
