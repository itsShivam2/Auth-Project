import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminDetails from "./components/AdminDetails";
import ProductsTab from "./components/ProductsTab";
import UsersTab from "./components/UsersTab";
import OrdersTab from "./components/OrdersTab";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductsTab />;
      case "users":
        return <UsersTab />;
      case "orders":
        return <OrdersTab />;
      default:
        return <ProductsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Admin Dashboard
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <AdminDetails />
          <div className="mt-8">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab("products")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "products"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "users"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "orders"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
              >
                Orders
              </button>
            </nav>
          </div>
          <div className="mt-6">{renderTabContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
