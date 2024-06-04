import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/user/actions/userActions";
import { validateSignupForm } from "../../utility/formValidation";
import Layout from "../../components/layout/Layout";
import Spinner from "../../components/spinner/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            toast.success("Signup successful");
            setTimeout(() => {
              navigate("/login");
            }, 5000);
          },
          (error) => {
            setErrorMessage(error);
            toast.error("Error in signup");
          }
        )
      );
    }
  };

  return (
    <Layout>
      <div className="bg-white ">
        <div className="flex justify-center min-h-screen py-6">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20  bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Trend Bazaar
                </h2>
                <p className="max-w-xl mt-3 text-gray-300">
                  Join Trend Bazaar to experience the best online shopping
                  experience. Sign up and enjoy exclusive benefits and features.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                {/* <div className="flex justify-center mx-auto">
                  <img
                    className="w-auto h-7 sm:h-8"
                    src="https://merakiui.com/images/logo.svg"
                    alt="Trend Bazaar Logo"
                  />
                </div> */}
                <p className="mt-3 text-2xl font-semibold font-[Fahkwang] text-gray-900 ">
                  Sign up to access your account
                </p>
              </div>

              <div className="mt-8">
                {(successMessage && (
                  <div className="text-green-600">{successMessage}</div>
                )) ||
                  (errorMessage && (
                    <div className="text-red-600">{errorMessage}</div>
                  ))}

                <form
                  className="mt-8 space-y-6 font-[Montserrat]"
                  onSubmit={handleSubmit}
                >
                  <div className="rounded-md shadow-sm space-y-4">
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block mb-2 text-sm text-gray-800"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          autoComplete="given-name"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block mb-2 text-sm text-gray-800"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          autoComplete="family-name"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm text-gray-800"
                      >
                        Username
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {errors.username && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                          {errors.username}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm text-gray-800"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm text-gray-800"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="block mb-2 text-sm text-gray-800"
                      >
                        Date of Birth
                      </label>
                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        placeholder="Date of Birth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 flex items-center justify-center tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      {loading ? <Spinner /> : "Sign Up"}
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-base text-center text-gray-800 font-[Montserrat]">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign in
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
