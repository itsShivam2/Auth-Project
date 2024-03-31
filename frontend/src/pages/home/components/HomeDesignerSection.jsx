import React from "react";
import { Link } from "react-router-dom";
import * as IconsAndImages from "../../../Assets/IconsAndImages";
import ClothingCategory from "./ClothingCategory";

function HomeDesignerSection() {
  const scrollToTop = () => {
    const element = document.body;
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-8 my-8">
        <div className="w-full md:w-3/5">
          <div className="w-full">
            <img src={IconsAndImages.FashionDesigner} className="" />
          </div>
        </div>

        <div className="w-full md:w-2/5 bg-[#f7f7f7] py-1">
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex md:flex-col gap-2">
              <h2 className="font-[Fahkwang] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold text-left -translate-y-6 md:-translate-x-16">
                New
              </h2>
              <h2 className="font-[Fahkwang] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold text-left -translate-y-6 md:-translate-x-16">
                Arrivals
              </h2>
            </div>

            <div className="w-4/5 flex flex-col ml-8">
              <h3 className="font-[Fahkwang] text-2xl lg:text-4xl text-left">
                Luce elegance long sleeve dress collection
              </h3>
              <Link
                to="/products"
                onClick={scrollToTop}
                className="w-4/5 md:w-4/5"
              >
                <button className="w-full font-[Montserrat] text-2xl text-center border-2 border-gray-400 px-2 py-2 mt-8 hover:bg-black hover:text-white hover:cursor-pointer">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around gap-8 p-8 my-8">
        <div className="flex flex-col gap-8">
          <ClothingCategory
            imageSrc={IconsAndImages.tops}
            categoryName="Tops"
          />
          <ClothingCategory
            imageSrc={IconsAndImages.bottoms}
            categoryName="Bottoms"
          />
        </div>
        <div className="flex flex-col gap-8">
          <ClothingCategory
            imageSrc={IconsAndImages.jeans}
            categoryName="Jeans"
          />
          <ClothingCategory
            imageSrc={IconsAndImages.dresses}
            categoryName="Dresses"
          />
        </div>
      </div>
    </>
  );
}

export default HomeDesignerSection;
