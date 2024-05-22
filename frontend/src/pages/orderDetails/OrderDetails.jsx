import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layout/Layout";

function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get order ID from URL parameters
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7400/api/v1/order/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setOrder(response.data.data);
          console.log("order", response.data.data);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching order");
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <Layout>
      <div className="w-full">
        {error && <p className="text-red-500">{error}</p>}
        {order ? (
          <div className="min-h-fit bg-[#111827] w-full p-6 shadow-md text-gray-100">
            <div className="mb-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-700 hover:bg-sky-950 transform-transition duration-1000 hover:drop-shadow-lg px-4 py-2 rounded-sm"
              >
                Go Back
              </button>
            </div>
            <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
              <h2 className="w-full mb-4 text-2xl font-bold ">
                Order ID: {order._id}
              </h2>
              <p className="w-full mb-4 text-left md:text-right">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
              <p className="w-full mb-2">
                Shipping Address: {order.shippingAddress}
              </p>
              <p className="w-full mb-2 text-left md:text-right">
                Status: {order.status}
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Items:</h3>
            <div className="flex flex-col gap-4">
              {order.items.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <div>
                    <img
                      src={item.product.productImage}
                      alt={item.product.name}
                      className="h-20 w-20 object-fit object-center"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <span>{item.product.name}</span>
                    <span>${item.product.newPrice}</span>
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <span>{item.quantity}</span>
                    <span>
                      ${Number(item.product.newPrice) * Number(item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="mb-2 text-2xl">Cart Total</p>
                {order.cartTotal ? <p>${order.cartTotal}</p> : null}
              </div>
              <div className="flex justify-between">
                <p className="mb-2 text-2xl">Shipping Charge</p>
                {order.shippingCharge ? <p>${order.shippingCharge}</p> : null}
              </div>
              <div className="flex justify-between">
                <p className="mb-2 text-2xl">Total Amount</p>
                <p>${order.totalAmount}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}

export default OrderDetails;
