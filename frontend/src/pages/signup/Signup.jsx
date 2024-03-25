// import React, { useState } from "react";
// import Layout from "../../components/layout/Layout";
// import axios from "axios";

// function Signup() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     dateOfBirth: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const errors = {};

//     // Validate first name
//     if (!formData.firstName.trim()) {
//       errors.firstName = "First name is required";
//     }

//     // Validate last name
//     if (!formData.lastName.trim()) {
//       errors.lastName = "Last name is required";
//     }

//     // Validate username
//     if (!formData.username.trim()) {
//       errors.username = "Username is required";
//     }

//     // Validate email
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (
//       !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
//     ) {
//       errors.email = "Please enter a valid email address";
//     }

//     // Validate password
//     if (!formData.password.trim()) {
//       errors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       errors.password = "Password must be at least 8 characters long";
//     }

//     // Validate date of birth
//     if (!formData.dateOfBirth) {
//       errors.dateOfBirth = "Date of birth is required";
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       try {
//         const response = await axios.post(
//           "http://localhost:7400/api/v1/auth/signup",
//           formData
//         );
//         console.log(response.data);
//       } catch (error) {
//         console.error("Signup error:", error);
//       }
//     }
//   };

//   return (
//     <Layout>
//       <div className="container mx-auto mt-8">
//         <h1 className="text-2xl font-bold mb-4">Signup</h1>
//         <form onSubmit={handleSubmit} className="max-w-md">
//           <div className="mb-4">
//             <label htmlFor="firstName" className="block mb-1">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               className={`w-full rounded-md border-gray-300 px-4 py-2 ${
//                 errors.firstName ? "border-red-500" : ""
//               }`}
//               value={formData.firstName}
//               onChange={handleChange}
//             />
//             {errors.firstName && (
//               <p className="text-red-500 mt-1">{errors.firstName}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="lastName" className="block mb-1">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               className={`w-full rounded-md border-gray-300 px-4 py-2 ${
//                 errors.lastName ? "border-red-500" : ""
//               }`}
//               value={formData.lastName}
//               onChange={handleChange}
//             />
//             {errors.lastName && (
//               <p className="text-red-500 mt-1">{errors.lastName}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="username" className="block mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               className={`w-full rounded-md border-gray-300 px-4 py-2 ${
//                 errors.username ? "border-red-500" : ""
//               }`}
//               value={formData.username}
//               onChange={handleChange}
//             />
//             {errors.username && (
//               <p className="text-red-500 mt-1">{errors.username}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className={`w-full rounded-md border-gray-300 px-4 py-2 ${
//                 errors.email ? "border-red-500" : ""
//               }`}
//               value={formData.email}
//               onChange={handleChange}
//             />
//             {errors.email && (
//               <p className="text-red-500 mt-1">{errors.email}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className={`w-full rounded-md border-gray-300 px-4 py-2 ${
//                 errors.password ? "border-red-500" : ""
//               }`}
//               value={formData.password}
//               onChange={handleChange}
//             />
//             {errors.password && (
//               <p className="text-red-500 mt-1">{errors.password}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="dateOfBirth" className="block mb-1">
//               Date of Birth
//             </label>
//             <input
//               type="date"
//               id="dateOfBirth"
//               name="dateOfBirth"
//               className={`w-full rounded-md border-gray-300 px-4 py-2 ${
//                 errors.dateOfBirth ? "border-red-500" : ""
//               }`}
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//             />
//             {errors.dateOfBirth && (
//               <p className="text-red-500 mt-1">{errors.dateOfBirth}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             >
//               Signup
//             </button>
//           </div>
//         </form>
//       </div>
//     </Layout>
//   );
// }

// export default Signup;

//
// 
import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/layout/Layout';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7400/api/v1/auth/signup', formData);
      setSuccessMessage(response.data.message);
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        dateOfBirth: ''
      });
      setErrors({});

      // Store tokens as cookies
      document.cookie = `accessToken=${response.data.accessToken}; path=/; HttpOnly`;
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/; HttpOnly`;
      
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error('Signup error:', error.message);
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
          </div>
          {successMessage && <div className="text-green-600">{successMessage}</div>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="firstName" className="sr-only">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="text-red-500 mt-1">{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="sr-only">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                {errors.dateOfBirth && <p className="text-red-500 mt-1">{errors.dateOfBirth}</p>}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

