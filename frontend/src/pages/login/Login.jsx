import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/user/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Input from "../../components/input/Input";
import { FaUserCheck, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white py-8 px-3 shadow-2xl rounded-lg">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl text-center font-[Fahkwang] font-bold text-teal-600 px-2 py-2 underline underline-offset-4 mb-4">
              Trend Bazaar
            </h1>
            <h2 className="mt-1 py-2 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
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
              />
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  icon={FaLock}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Please wait..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
