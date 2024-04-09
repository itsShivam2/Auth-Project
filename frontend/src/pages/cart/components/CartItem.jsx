import React from "react";

const CartItem = ({ item, onDelete, onUpdateQuantity }) => {
  const { name, newPrice, productImage, quantity } = item;

  const decreaseQuantity = () => {
    onUpdateQuantity(Math.max(0, quantity - 1));
  };

  const increaseQuantity = () => {
    onUpdateQuantity(quantity + 1);
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between items-center gap-2">
      <div className="w-full md:w-[30%] flex items-center self-start justify-between">
        <img src={productImage} className="w-[120px]" alt={name} />
        <div className="flex flex-col items-center justify-between gap-2">
          <h2>{name}</h2>
          <p>₹{newPrice}</p>
        </div>
      </div>

      <div className="w-full md:w-[30%] flex items-center justify-between">
        <div className="flex items-center justify-between gap-3 border p-3">
          <p className="text-sm">Qty</p>
          <div className="flex items-center justify-center gap-4 text-sm font-semibold">
            <button
              onClick={decreaseQuantity}
              className="border h-6 text-lg font-normal flex items-center justify-center px-3 py-1 hover:bg-gray-600 transform-transition duration-1000 hover:text-white"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="border h-6 text-lg font-normal flex items-center justify-center px-2 py-1 hover:bg-gray-600 transform-transition duration-1000 hover:text-white"
            >
              +
            </button>
          </div>
        </div>
        <p>₹{newPrice * quantity}</p>
      </div>

      <button
        onClick={onDelete}
        className="w-full md:w-[16%] lg:w-1/5 self-start md:self-center flex items-center justify-center px-2 lg:px-5 py-2 text-base rounded-sm text-white bg-black hover:bg-teal-950 transform-transition duration-1000 hover:drop-shadow-lg"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
