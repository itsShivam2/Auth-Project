import React from "react";
import ImageGrid from "../../../components/imageGrid/ImageGrid";
const Header = () => (
  <>
    <h1 className="text-6xl sm:text-[6rem] md:text-8xl font-[Fahkwang] text-left md:text-center px-8 pt-8">
      New Arrivals
    </h1>
    <hr className="border-t border-gray-800 mb-6 mx-8" />
    <p className="text-[#8A8A8A] text-xl md:text-xl text-left md:text-center font-[Montserrat] py-[0.5rem] px-8">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
      ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
    </p>
    <ImageGrid />
  </>
);

export default Header;
