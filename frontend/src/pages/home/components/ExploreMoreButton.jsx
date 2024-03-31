import React from "react";
import { Link } from "react-router-dom";
import * as IconsAndImages from "../../../Assets/IconsAndImages";

function ExploreMoreButton({ scrollToTop }) {
  return (
    <div className="w-full flex justify-center p-8 my-8">
      <Link to="/products">
        <button
          onClick={scrollToTop}
          className="flex items-center justify-between gap-1 font-[Fahkwang] font-bold text-white text-3xl sm:text-5xl bg-gradient-to-r from-sky-900 to-sky-950 p-3 rounded-lg hover:shadow-lg transform transition duration-1000"
        >
          Explore More <IconsAndImages.FaArrowRight />
        </button>
      </Link>
    </div>
  );
}

export default ExploreMoreButton;
