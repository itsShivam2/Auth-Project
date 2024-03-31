import React from "react";

const CartTotal = ({ totalAmount, shipping, grandTotal }) => {
  return (
    <div className="flex flex-col gap-1 bg-[#fafafa] py-2 lg:w-[30%]">
      <div className="flex flex-col">
        <h2 className="text-4xl font-medium self-start mb-4">Cart Total</h2>
        <p className="flex items-center gap-4 text-base">
          Subtotal{" "}
          <span className="font-titlefont font-bold text-lg">
            ₹{totalAmount}
          </span>
        </p>
        <p className="w-full flex item-start gap-4 text-base border-b-2">
          Shipping{" "}
          <span className="font-titlefont font-bold text-lg">₹{shipping}</span>
        </p>
      </div>

      <p className="flex justify-between font-titlefont font-semibold px-4 mt-6">
        Total <span className="text-xl font-bold">₹{grandTotal}</span>
      </p>
      <button className="self-center w-full transform-transition duration-9000 flex items-center justify-center gap-1 px-4 py-3 text-base rounded-sm text-white bg-black hover:bg-teal-950 transform-transition duration-1000 hover:drop-shadow-lg">
        Proceed to checkout
      </button>
    </div>
  );
};

export default CartTotal;
