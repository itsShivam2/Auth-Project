import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import CartItem from "./components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/order/actions/orderActions";
import StripeCheckout from "react-stripe-checkout";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const totalAmount = useSelector((state) => state.cart.total);
  const shippingCost = 50;
  const grandTotal = totalAmount + shippingCost;
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();

  const handleToken = async (token) => {
    setStripeToken(token);
    // Extract shipping address from the token object
    const { shippingAddress } = token;

    // Create order data object
    const orderData = {
      // orderBy: userId,
      items: cartItems.products.map((item) => ({
        product: item.productId, // Assuming productId is the ID of the product
        quantity: item.quantity,
      })),
      totalAmount: grandTotal,
      shippingAddress: shippingAddress,
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
            tokenId: stripeToken.id,
            totalAmount: grandTotal,
            shippingAddress,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response.data); // Handle success response
        // history.push("/success"); // Redirect to success page
      } catch (error) {
        console.log("Error:", error.response.data); // Handle error response
        // Show error message to the user
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, grandTotal]);

  console.log("cartItems", cartItems);
  return (
    <div>
      <Layout>
        <div className="max-w-screen-xl flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0 mx-auto my-4 px-4">
          <div className="flex flex-col gap-8 lg:w-[65%]">
            {cartItems.products.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onDelete={() => deleteCart(item)}
                onUpdateQuantity={(newQuantity) =>
                  updateQuantity(item, newQuantity)
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
              name="Your Store Name"
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
      </Layout>
    </div>
  );
}

export default Cart;
