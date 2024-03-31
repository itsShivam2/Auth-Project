import React from "react";

const QuantityControl = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="flex items-center justify-center gap-4 text-sm font-semibold">
      <button
        onClick={onDecrease}
        className="border h-6 text-lg font-normal flex items-center justify-center px-3 py-1 hover:bg-gray-600 transform-transition duration-1000 hover:text-white"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={onIncrease}
        className="border h-6 text-lg font-normal flex items-center justify-center px-2 py-1 hover:bg-gray-600 transform-transition duration-1000 hover:text-white"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
