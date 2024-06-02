import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/user/actions/userActions";
import { validateSignupForm } from "../../utility/formValidation";
import Layout from "../../components/layout/Layout";
import Input from "../../components/input/Input";
import Spinner from "../../components/spinner/Spinner";
import { FaUser, FaUserCheck, FaLock, FaCalendar } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignupForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(
        signup(
          formData,
          (message) => {
            setSuccessMessage(message);
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
          },
          (error) => {
            setErrorMessage(error);
          }
        )
      );
    }
  };

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
                {loading ? <Spinner /> : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
