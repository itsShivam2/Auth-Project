import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../redux/order/actions/orderActions";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

function OrderDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="w-full">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          order && (
            <div className="min-h-fit bg-gray-100 w-full p-6 shadow-md text-[#111827]">
              <div className="mb-4">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-sky-900 hover:bg-sky-950 text-gray-200 hover:text-gray-200 transform-transition duration-1000 hover:drop-shadow-lg px-4 py-2 rounded-sm"
                >
                  Go Back
                </button>
              </div>
              <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                <h2 className="w-full mb-4 text-lg font-[Fahkwang] sm:text-2xl font-bold ">
                  Order ID: {order._id}
                </h2>
                <p className="w-full mb-4 text-left text-lg font-[Montserrat] md:text-right">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                <p className="w-full mb-2 font-[Montserrat]">
                  Shipping Address: {order.shippingAddress}
                </p>
                <p className="w-full mb-2 text-left md:text-right font-[Montserrat]">
                  Status: {order.status}
                </p>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-[Fahkwang]">
                Items:
              </h3>
              <div className="flex flex-col gap-4">
                {order.items.map((item) => (
                  <div key={item._id} className="flex justify-between">
                    <div>
                      <img
                        src={item.product.productImage}
                        alt={item.product.name}
                        className="h-32 w-28 object-fit object-center"
                      />
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <span className="font-[Montserrat]">
                        {item.product.name}
                      </span>
                      <span className="font-[Montserrat]">
                        ₹{item.product.newPrice}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <span className="font-[Montserrat]">{item.quantity}</span>
                      <span className="font-[Montserrat]">
                        ₹{Number(item.product.newPrice) * Number(item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col mt-6">
                <div className="flex justify-between">
                  <p className="mb-2 text-2xl font-[Fahkwang]">Cart Total</p>
                  {order.cartTotal ? (
                    <p className="font-[Montserrat]">₹{order.cartTotal}</p>
                  ) : (
                    order.totalAmount
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="mb-2 text-2xl font-[Montserrat]">
                    Shipping Charge
                  </p>
                  {order.shippingCharge ? <p>${order.shippingCharge}</p> : 0}
                </div>
                <div className="flex justify-between">
                  <p className="mb-2 text-2xl font-[Montserrat]">
                    Total Amount
                  </p>
                  <p>₹{order.totalAmount}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}

export default OrderDetails;
