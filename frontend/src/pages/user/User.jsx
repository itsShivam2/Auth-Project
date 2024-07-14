import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";
import { FiUser } from "react-icons/fi";

function User() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState({});

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://auth-project-tw37.onrender.com/api/v1/user/profile",
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("user", response.data);
        setUser(response.data.profile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error.response.data.message);
      setError(error.redesponse.data.message);
    }
  };

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://auth-project-tw37.onrender.com/api/v1/order/user/orders",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setLoading(false);
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error.response.data.message);
      setError(error.redesponse.data.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchOrder();
  }, []);

  return (
    <div>
      <Layout>
        <div className="bg-white w-full">
          <div className="bg-white w-full flex flex-col md:flex-row items-center justify-center">
            <div className="bg-white w-full md:w-2/5  flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12">
              {/* <img
                src="https://source.unsplash.com/150x150/?portrait?3"
                alt=""
                className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
              /> */}
              <FiUser className="w-32 h-32 mx-auto aspect-square" />
              <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                <div className="my-2 space-y-1 font-[Montserrat]">
                  <h2 className="text-xl font-semibold sm:text-2xl text-gray-900">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="px-5 text-xs sm:text-base text-gray-900">
                    Username: <span>{user.username}</span>
                  </p>
                  <p className="px-5 text-xs sm:text-base text-gray-900">
                    Email ID: <span>{user.email}</span>
                  </p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center"></div>
              </div>
            </div>

            {/* <div className="bg-[#111827] w-full md:w-3/5 md:h-[550px] flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold sm:text-2xl text-gray-100">
                  Registered Addresses
                </h1>
              </div>
            </div> */}
          </div>

          <div className="mt-4">
            <h2 className="text-xl text-center font-semibold font-[Fahkwang] sm:text-3xl text-gray-900">
              Orders
            </h2>
            {loading && (
              <div className="flex justify-center items-center h-screen">
                <Loader />
              </div>
            )}
            <div className="mt-4 space-y-4">
              {orders?.length == 0 ? (
                <p>No orders found.</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gray-100 font-[Montserrat] p-4 rounded-lg shadow-md text-gray-900"
                  >
                    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <h3 className="block text-lg font-semibold p-2">
                        Order ID: {order._id}
                      </h3>
                      <p className="block p-2">
                        Order Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <p className="block p-2">
                        Total Amount: ₹{order.totalAmount}
                      </p>
                      <p className="block p-2">Status: {order.status}</p>
                    </div>
                    <div className="w-full mb-4 flex justify-center items-center gap-4">
                      <Link to={`/orders/${order._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          View Order
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default User;
