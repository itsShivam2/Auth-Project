import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};
  console.log("order", order);

  return (
    <div>
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl text-center">
            <h1 className="text-3xl font-bold font-[Fahkwang] text-green-600 mb-4">
              Payment Success
            </h1>
            {order ? (
              <div>
                <p className="text-lg mb-2">
                  Your order has been placed successfully!
                </p>
                <p className="text-base sm:text-xl font-[Fahkwang] font-semibold text-gray-700">
                  Order ID: {order._id}
                </p>
                <div className="mt-6 text-left">
                  <h2 className="text-2xl font-[Fahkwang] font-semibold text-gray-800 mb-4">
                    Order Details
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p>
                      <span className="font-[Montserrat] font-semibold">
                        Ordered At:
                      </span>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-[Montserrat] font-semibold">
                        Status:
                      </span>{" "}
                      {order.status}
                    </p>
                    <p>
                      <span className="font-[Montserrat] font-semibold">
                        Total Amount:
                      </span>{" "}
                      ₹{order.totalAmount}
                    </p>

                    <div className="mt-4">
                      <h3 className="text-lg font-[Fahkwang] font-bold mb-2">
                        Items:
                      </h3>
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="mb-2 py-2 bg-white border rounded-lg"
                        >
                          <p>
                            <span className="font-[Montserrat] font-semibold">
                              Product ID:
                            </span>{" "}
                            {item.product}
                          </p>
                          <p>
                            <span className="font-[Montserrat] font-semibold">
                              Quantity:
                            </span>{" "}
                            {item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-600">Order Details is not available.</p>
            )}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="px-2 sm:px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Go to Products
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="px-2 sm:px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Go to Profile
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default PaymentSuccess;
