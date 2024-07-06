import React from "react";

const CategoryButtons = ({ setCurrentCategory }) => (
  <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mt-8 mb-10 px-8">
    <button
      onClick={() => setCurrentCategory("all")}
      className="min-w-[265px] sm:min-w-fit font-[Fahkwang] font-bold text-3xl text-white bg-gray-700 hover:bg-sky-950 transform-transition duration-900 transform-transition duration-1000 hover:drop-shadow-lg p-3 rounded-lg"
    >
      All
    </button>
    <button
      onClick={() => setCurrentCategory("mens")}
      className="min-w-[265px] sm:min-w-fit font-[Fahkwang] font-bold text-3xl text-white bg-gray-700 hover:bg-sky-950 transform-transition duration-900 transform-transition duration-1000 hover:drop-shadow-lg p-3 rounded-lg"
    >
      Men's Store
    </button>
    <button
      onClick={() => setCurrentCategory("womens")}
      className="min-w-[265px] sm:min-w-fit font-[Fahkwang] font-bold text-3xl text-white bg-gray-700 hover:bg-sky-950 transform-transition duration-900 transform-transition duration-1000 hover:drop-shadow-lg p-3 rounded-lg"
    >
      Women's Store
    </button>
  </div>
);

export default CategoryButtons;
