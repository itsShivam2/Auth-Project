import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

function AddToCartButton({ onClick }) {
  return (
    <div className="w-full lg:w-2/5 flex justify-center">
      <button
        onClick={onClick}
        className="w-full h-full flex items-center justify-center text-lg font-[Fahkwang] gap-1 px-4 py-4 rounded-sm text-white bg-gray-700 hover:bg-sky-950 transform-transition duration-1000 hover:drop-shadow-lg"
      >
        Add to cart <FaArrowRight />
      </button>
    </div>
  );
}

export default AddToCartButton;
