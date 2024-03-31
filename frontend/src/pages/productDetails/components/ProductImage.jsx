import React from 'react';

function ProductImage({ imageUrl }) {
  return (
    <div className="w-full lg:w-2/5 flex items-center justify-center px-5 py-2 mx-auto">
      <img
        className="w-full h-full object-cover object-center rounded"
        src={imageUrl}
        alt="Product"
      />
    </div>
  );
}

export default ProductImage;
