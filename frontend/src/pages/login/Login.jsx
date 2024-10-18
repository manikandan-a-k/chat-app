import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import userLogin from "../../hooks/userLogin";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState({
    userName: "",
    password: "",
  });
  const { login, loading } = userLogin();
  const handleFormValidation = () => {
    let isValid = true;
    const newError = {};

    // User Name validation
    if (!formData.userName) {
      newError.userName = "User name field is required";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newError.password = "Password field is required";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    const isValid = handleFormValidation();
    if (isValid) {
      await login(formData);
    }
  };

  return (
    <div className="w-full mx-auto flex   justify-center items-center">
      <div className="bg-white w-full max-w-[320px] sm:max-w-sm py-10 px-8 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <form onSubmit={FormSubmit} className="grid gap-4">
          {/* Image Upload Section */}
          <h1 className="text-center text-2xl md:text-3xl font-medium text-purple-500 mb-3">
            Login
          </h1>
          <div className="">
            <div className="relative">
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleFormData}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="userName"
                className="absolute text-sm cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                User Name
              </label>
            </div>

            {error.userName && (
              <p className="text-xs text-red-500 mt-1">{error.userName}</p>
            )}
          </div>

          <div className="">
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFormData}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Password
              </label>
              <div
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2"
              >
                {passwordVisible ? <IoIosEyeOff /> : <IoIosEye />}
              </div>
            </div>

            {error.password && (
              <p className="text-xs text-red-500 mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`text-sm h-10 text-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } w-full text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-all`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin mx-auto " />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="flex text-sm   mt-4">
          <p>
            Don't have an account ?{" "}
            <Link to="/signup" className=" text-purple-600 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
