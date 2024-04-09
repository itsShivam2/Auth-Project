import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const KEY =
  "pk_test_51P2omZSG1lj88Ohi6FsfqCEbOc5qaIkM8hUq4I4sVdoJAJ9BxBHPxD33oh0bSSJsK42M479hmROJnYJjZjZQ4Egk00mQBFwdA8";

const CheckoutButton = () => {
  const [stripeToken, setStripeToken] = useState(null);
  // const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:7400/api/v1/payment",
          {
            tokenId: stripeToken.id,
            amount: grandTotal * 100,
          }
        );
        console.log(response.data);
        // history.push("/success", {
        //   stripeData: res.data,
        //   products: cart,
        // });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  return (
    <button
      onClick={makeRequest}
      className="self-center w-4/5 hover:w-full transform-transition duration-9000 flex items-center justify-center gap-1 px-4 py-3 text-base rounded-sm text-white bg-black hover:bg-teal-950 transform-transition duration-1000 hover:drop-shadow-lg"
    >
      Proceed to checkout <FaArrowRight />
    </button>
  );
};

export default CheckoutButton;
