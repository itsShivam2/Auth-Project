import React from "react";

function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="w-full lg:w-3/5 flex items-center justify-between gap-3 border p-3">
      <p className="text-base font-semibold font-[Montserrat]">Quantity</p>
      <div className="flex items-center justify-center gap-4 text-sm font-semibold">
        <button
          onClick={onDecrease}
          className="border h-6 text-lg font-semibold font-[Montserrat] flex items-center justify-center px-3 py-1 hover:bg-gray-600 transform-transition duration-1000 hover:text-white"
        >
          -
        </button>
        <span className="text-lg font-semibold font-[Montserrat]">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          className="border h-6 text-lg font-semibold font-[Montserrat] flex items-center justify-center px-2 py-1 hover:bg-gray-600 transform-transition duration-1000 hover:text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default QuantitySelector;
