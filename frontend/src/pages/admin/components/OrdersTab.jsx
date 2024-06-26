import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderDetails from "./OrderDetails";
import Loader from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://auth-project-tw37.onrender.com/api/v1/order/all-orders",
          { withCredentials: true }
        );
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `https://auth-project-tw37.onrender.com/api/v1/order/update-status/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      toast.success("Order status updated successfully");
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating order status");
      setError(error.response?.data?.message || "Error updating order status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold">Orders</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${order.totalAmount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleUpdateOrderStatus(order._id, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleViewOrder(order._id)}
                >
                  View
                </button>
                <button
                  className="text-red-600 hover:text-red-900 ml-4"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrderId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <OrderDetails
              orderId={selectedOrderId}
              onClose={() => setSelectedOrderId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );

  function handleViewOrder(orderId) {
    setSelectedOrderId(orderId);
  }

  async function handleDeleteOrder(orderId) {
    try {
      await axios.delete(`https://auth-project-tw37.onrender.com/api/v1/order/${orderId}`, {
        withCredentials: true,
      });
      toast.success("Order deleted successfully");
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting order");
      setError(error.response?.data?.message || "Error deleting order");
    }
  }
};

export default OrdersTab;
