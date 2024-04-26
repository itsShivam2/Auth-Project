import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import CartItem from "./components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/order/actions/orderActions";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {
  fetchCartFromDB,
  removeItem,
  updateItemQuantity,
} from "../../redux/cart/actions/cartActions";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  console.log("cartItems", cartItems);
  const totalAmount = useSelector((state) => state.cart.total);
  const shippingCost = 50;
  const [grandTotal, setGrandTotal] = useState(0);
  const [stripeToken, setStripeToken] = useState([]);
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

  const handleToken = async (token) => {
    setStripeToken(token);
    console.log("token", token);
    // const { shippingAddress } = token;
    // console.log(shippingAddress);
    // Create order data object
    const orderData = {
      // orderBy: userId,
      items: cartItems.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: grandTotal,
      // shippingAddress: shippingAddress,
    };

    // Dispatch action to place the order
    dispatch(createOrder(orderData));
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:7400/api/v1/payment",

          {
            tokenId: stripeToken,
            totalAmount: grandTotal,
            // shippingAddress,
          },
          {
            withCredentials: true,
          }
        );
        // console.log(response.data);
      } catch (error) {
        console.log("Error:", error.response.data);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, grandTotal]);

  console.log("cartItems", cartItems);
  return (
    <div>
      <Layout>
        {cartItems.products.length > 0 ? (
          <div className="min-h-screen max-w-screen-xl flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0 mx-auto my-4 px-4">
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

              <StripeCheckout
                name="Trend Bazaar"
                description={`Your total is ₹${grandTotal}`}
                amount={grandTotal * 100}
                token={handleToken}
                stripeKey={
                  "pk_test_51P2omZSG1lj88Ohi6FsfqCEbOc5qaIkM8hUq4I4sVdoJAJ9BxBHPxD33oh0bSSJsK42M479hmROJnYJjZjZQ4Egk00mQBFwdA8"
                }
                currency="INR"
                billingAddress
                shippingAddress
              >
                <button className="self-center w-full transform-transition duration-9000 flex items-center justify-center gap-1 px-4 py-3 text-base rounded-sm text-white bg-black hover:bg-teal-950 transform-transition duration-1000 hover:drop-shadow-lg">
                  Proceed to checkout
                </button>
              </StripeCheckout>
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
