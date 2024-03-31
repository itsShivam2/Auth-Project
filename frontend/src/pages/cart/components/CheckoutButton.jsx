import React from "react";
import { FaArrowRight } from "react-icons/fa";

const CheckoutButton = () => {
  return (
    <button className="self-center w-4/5 hover:w-full transform-transition duration-9000 flex items-center justify-center gap-1 px-4 py-3 text-base rounded-sm text-white bg-black hover:bg-teal-950 transform-transition duration-1000 hover:drop-shadow-lg">
      Proceed to checkout <FaArrowRight />
    </button>
  );
};

export default CheckoutButton;
