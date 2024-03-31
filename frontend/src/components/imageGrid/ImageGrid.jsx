import React from "react";
import * as IconsAndImages from "../../Assets/IconsAndImages";

const ImageGrid = () => {
  const images = [
    IconsAndImages.socials1,
    IconsAndImages.socials2,
    IconsAndImages.socials3,
    IconsAndImages.socials4,
    IconsAndImages.socials5,
    IconsAndImages.socials6,
    IconsAndImages.socials7,
  ];

  return (
    <div className="grid grid-cols-7 h-full place-content-center place-items-center mt-[2rem] mb-[2rem] p-8">
      {images.map((src, index) => (
        <div
          key={index}
          className="object-cover w-13.5rem"
          style={{
            objectFit: "cover",
            width: "13.5rem",
            height: "auto",
            maxWidth: "100%",
            display: "block",
            verticalAlign: "middle",
          }}
        >
          <img src={src} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
