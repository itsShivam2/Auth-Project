// import React from "react";
// import { FiUser, FiMail, FiLock, FiCalendar } from 'react-icons/fi';
// const Input = ({
//   id,
//   name,
//   type,
//   placeholder,
//   value,
//   onChange,
//   autoComplete,
//   required,
//   errors,
// }) => {
//   return (
//     <div>
//       <label htmlFor={id} className="sr-only">
//         {placeholder}
//       </label>
//       <input
//         id={id}
//         name={name}
//         type={type}
//         autoComplete={autoComplete}
//         required={required}
//         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//       />
//       {errors && <p className="text-red-500 mt-1">{errors}</p>}
//     </div>
//   );
// };

// export default Input;

// Input.js
import React from 'react';

const Input = ({ id, name, type, placeholder, value, onChange, autoComplete, required, icon: Icon, error }) => {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-800" />} {/* Icon positioning */}
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={`appearance-none rounded-none block w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${Icon ? 'pl-10' : 'pl-3'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && (
        <p className="text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
