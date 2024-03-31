import React from "react";
import * as IconsAndImages from "../../../Assets/IconsAndImages";

const ClothingCategory = ({ imageSrc, categoryName }) => {
  return (
    <div>
      <img src={imageSrc} alt={categoryName} />
      <div className="flex items-center gap-2">
        <h3 className="font-[Fahkwang] text-2xl sm:text-3xl font-semibold text-left my-4">
          {categoryName}
        </h3>
        <IconsAndImages.FaArrowRight className="text-2xl sm:text-3xl" />
      </div>
    </div>
  );
};

export default ClothingCategory;
