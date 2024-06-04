import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/user/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Spinner from "../../components/spinner/Spinner";
import { FaUserCheck, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
      .then(({ success }) => {
        if (success) {
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          toast.error("Login failed. Please try again.");
        }
      })
      .catch((error) => {
        toast.error("Login failed. Please try again.");
        console.error("Login error:", error);
      });
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="flex justify-center min-h-screen py-6">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Trend Bazaar
                </h2>
                <p className="max-w-xl mt-3 text-gray-300">
                  Welcome back to Trend Bazaar. Sign in to continue your
                  shopping experience and enjoy exclusive benefits.
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
                <p className="mt-3 text-2xl font-semibold font-[Fahkwang] text-gray-900">
                  Sign in to your account
                </p>
              </div>

              <div className="mt-8">
                {error && <div className="text-red-600">{error}</div>}

                <p className="my-2 flex flex-col items-center justify-center">
                  <span className="text-sm text-teal-700 block">
                    Use email: johndoe@example.com
                  </span>
                  <span className="text-sm text-teal-700 block">
                    password: 12345678
                  </span>
                </p>

                <form
                  className="mt-8 space-y-6 font-[Montserrat]"
                  onSubmit={handleSubmit}
                >
                  <div className="rounded-md shadow-sm space-y-4">
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
                        autoComplete="current-password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-10 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 flex justify-center items-center"
                    >
                      {loading ? <Spinner className="h-full" /> : "Sign in"}
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-base text-center text-gray-800 font-[Montserrat]">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
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

export default Login;
