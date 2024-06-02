import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderDetails = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7400/api/v1/order/${orderId}`,
          {
            withCredentials: true,
          }
        );
        setOrder(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching order details"
        );
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Order Details</h2>
      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>User:</strong> {order.orderBy}
      </p>
      <p>
        <strong>Total Amount:</strong> ${order.totalAmount}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Items:</strong>
      </p>
      <ul>
        {order.items.map((item) => (
          <li key={item.product._id}>
            {item.product.name} - {item.quantity} x ${item.product.newPrice}
          </li>
        ))}
      </ul>
      <div className="w-full flex justify-center">
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold mt-4 py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
