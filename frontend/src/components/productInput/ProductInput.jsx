import React from 'react';

const ProductInput = ({ id, name, type, placeholder, value, onChange, required, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{placeholder}</label>
      {type === 'file' ? (
        <input
          id={id}
          name={name}
          type={type}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>{error}</p>
      )}
    </div>
  );
};

export default ProductInput;
