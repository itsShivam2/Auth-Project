import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
function User() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [user, setUser] = useState({});
  const [error, setError] = useState({});

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7400/api/v1/auth/profile",
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("user", response.data);
        setUser(response.data.profile);
      }
    } catch (error) {
      console.error("Login error:", error.response.data.message);
      setError(error.redesponse.data.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Layout>
        <div className="bg-[#000814] w-full flex flex-col md:flex-row items-center justify-center">
          <div className="bg-[#111827] w-full md:w-2/5 md:h-[550px] flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12">
            <img
              src="https://source.unsplash.com/150x150/?portrait?3"
              alt=""
              className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
            />
            <div className="space-y-4 text-center divide-y dark:divide-gray-700">
              <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl text-gray-100">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="px-5 text-xs sm:text-base text-gray-100">
                  Username: <span>{user.username}</span>
                </p>
                <p className="px-5 text-xs sm:text-base text-gray-100">
                  Email ID: <span>{user.email}</span>
                </p>
              </div>
              <div className="flex justify-center pt-2 space-x-4 align-center"></div>
            </div>
          </div>

          <div className="bg-[#111827] w-full md:w-3/5 md:h-[550px] flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold sm:text-2xl text-gray-100">
                Registered Vehicles
              </h1>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default User;
