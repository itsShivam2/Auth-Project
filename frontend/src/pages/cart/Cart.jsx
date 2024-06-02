import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import CartItem from "./components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/order/actions/orderActions";
import {
  fetchCartFromDB,
  removeItem,
  updateItemQuantity,
} from "../../redux/cart/actions/cartActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const totalAmount = useSelector((state) => state.cart.total);
  const shippingCost = 50;
  const [grandTotal, setGrandTotal] = useState(0);
  const [addresses, setAddresses] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartFromDB());
  }, [dispatch]);

  const handleRemoveItem = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateItemQuantity(productId, quantity));
  };

  useEffect(() => {
    if (totalAmount && shippingCost) setGrandTotal(totalAmount + shippingCost);
  }, [totalAmount, shippingCost]);

  const orderData = {
    items: cartItems.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
    totalAmount: grandTotal,
  };

  const handleCheckout = () => {
    dispatch(createOrder(orderData))
      .then(({ success, order }) => {
        toast.success("Order placed successfully");
        if (success) {
          navigate("/paymentsuccess", { state: { order } });
        }
      })
      .catch((error) => {
        toast.error("Error placing order");
        console.error("Error creating order:", error);
      });
  };

  return (
    <div>
      <Layout>
        {cartItems.products.length > 0 ? (
          <div className="min-h-screen max-w-screen-xl flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0 mx-auto my-8 px-4">
            <div className="flex flex-col gap-8 lg:w-[65%]">
              {cartItems.products.map((item, index) => (
                <CartItem
                  key={index}
                  product={item.product}
                  itemQuantity={item.quantity}
                  onDelete={() => handleRemoveItem(item.product._id)}
                  onUpdateQuantity={(newQuantity) =>
                    handleUpdateQuantity(item.product._id, newQuantity)
                  }
                />
              ))}
            </div>

            {/* CartTotal */}
            <div className="flex flex-col gap-1 bg-[#fafafa] py-2 lg:w-[30%]">
              <div className="flex flex-col">
                <h2 className="text-4xl font-medium self-start mb-4">
                  Cart Total
                </h2>
                <p className="flex items-center gap-4 text-base">
                  Subtotal{" "}
                  <span className="font-titlefont font-bold text-lg">
                    ₹{totalAmount}
                  </span>
                </p>
                <p className="w-full flex item-start gap-4 text-base border-b-2">
                  Shipping{" "}
                  <span className="font-titlefont font-bold text-lg">
                    ₹{shippingCost}
                  </span>
                </p>
              </div>

              <p className="flex justify-between font-titlefont font-semibold px-4 mt-6">
                Total <span className="text-xl font-bold">₹{grandTotal}</span>
              </p>

              <button
                onClick={handleCheckout}
                className="self-center w-full transform-transition duration-9000 flex items-center justify-center gap-1 px-4 py-3 text-base rounded-sm text-white bg-black hover:bg-teal-950 transform-transition duration-1000 hover:drop-shadow-lg"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-[75vh] my-4 py-4">
            <h1 className="text-4xl sm:text-5xl font-semibold font-[cursive] text-center text-teal-500 my-3">
              OOPS!
            </h1>
            <h2 className="text-3xl sm:text-4xl font-semibold font-[cursive] text-center text-teal-500">
              Your cart is empty
            </h2>
          </div>
        )}
      </Layout>
    </div>
  );
}

export default Cart;
