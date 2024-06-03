import React from 'react';

const ProductInput = ({ id, name, type, placeholder, value, onChange, required, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-800">{placeholder}</label>
      {type === 'file' ? (
        <input
          id={id}
          name={name}
          type={type}
          className="mt-1 block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="mt-1 block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ProductInput;
