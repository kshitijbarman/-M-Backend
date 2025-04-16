import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [stuData, setStuData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:6969/user/getAll",{
        headers:{Authorization:`Bearer ${token}`}
      });
      console.log(res.data);
      setStuData(res.data);
      setLoading(false);
      
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Student Info</h1>

      {loading ? (
        <h1 className="text-xl text-center">...Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stuData.map((stu, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {stu.name}
              </h2>
              <p className="text-gray-700">
                📧 <span className="font-medium">Email:</span> {stu.email}
              </p>
              <p className="text-gray-700">
                📞 <span className="font-medium">Phone:</span> {stu.phone}
              </p>
              <p className="text-gray-700">
                🕒 <span className="font-medium">Joined:</span>{" "}
                {new Date(stu.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
