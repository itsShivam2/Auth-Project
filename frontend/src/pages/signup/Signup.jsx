import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { signup } from "../../redux/user/actions/userActions";
import Layout from "../../components/layout/Layout";
import Input from "../../components/input/Input";
import { FaUser, FaUserCheck, FaLock, FaCalendar } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Signup = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const errors = {};

    // Validate first name
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    // Validate username
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      errors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    // Validate date of birth
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:7400/api/v1/auth/signup",
          formData,
          { withCredentials: true }
        );
        if (response.status === 201) {
          // Signup successful
          setSuccessMessage(response.data.message);

          setFormData({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            dateOfBirth: "",
          });
          setErrors({});
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          // Signup failed
          if (response.status === 400) {
            // Bad request (e.g., user already exists or missing fields)
            setErrors({ message: response.data.message || "Invalid request" });
            setErrorMessage(response.data.message);
          } else {
            // Other error status codes
            setErrors({ message: "An unexpected error occurred" });
            setErrorMessage(response.data.message);
          }
        }
      } catch (error) {
        console.error("Signup error:", error.message);
        setErrors({ message: "An unexpected error occurred" });
      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(signup(formData));
  // };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white py-8 px-3 shadow-2xl rounded-lg">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl text-center font-[Fahkwang] font-bold text-teal-600 px-2 py-2 underline underline-offset-4 mb-4">
              Trend Bazaar
            </h1>
            <h2 className="mt-1 py-2 text-center text-3xl font-extrabold text-gray-900">
              Sign up for an account
            </h2>
          </div>
          {(successMessage && (
            <div className="text-green-600">{successMessage}</div>
          )) ||
            (errorMessage && (
              <div className="text-red-600">{errorMessage}</div>
            ))}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="grid sm:grid-cols-2 gap-2">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  icon={FaUser}
                  error={errors.firstName}
                />
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  icon={FaUser}
                  error={errors.lastName}
                />
              </div>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                icon={FaUserCheck}
                error={errors.username}
              />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                icon={MdEmail}
                error={errors.email}
              />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                icon={FaLock}
                error={errors.password}
              />
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                icon={FaCalendar}
                error={errors.dateOfBirth}
              />
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
