import React from "react";
import QuantityControl from "./QuantityControl";

const CartItem = ({ item, onDelete, onUpdateQuantity }) => {
  const { title, newPrice, imageUrl } = item;

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between items-center gap-2">
      <div className="w-full md:w-[30%] flex items-center self-start justify-between">
        <img src={imageUrl} className="w-[120px]" />
        <div className="flex flex-col items-center justify-between gap-2">
          <h2>{title}</h2>
          <p>₹{newPrice}</p>
        </div>
      </div>

      <div className="w-full md:w-[30%] flex items-center justify-between">
        <div className="flex items-center justify-between gap-3 border p-3">
          <p className="text-sm">Qty</p>
          <QuantityControl
            quantity={item.quantity}
            onDecrease={() => onUpdateQuantity(Math.max(0, item.quantity - 1))}
            onIncrease={() => onUpdateQuantity(item.quantity + 1)}
          />
        </div>
        <p>₹{item.newPrice * item.quantity}</p>
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
