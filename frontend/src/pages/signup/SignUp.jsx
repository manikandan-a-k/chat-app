import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import userSignUp from "../../hooks/userSignUp.js";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
    image: null,
  });
  const [error, setError] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { signup, loading } = userSignUp();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleFormValidation = () => {
    let isValid = true;
    const newError = {};

    if (!formData.fullName) {
      newError.fullName = "Full name field is required";
      isValid = false;
    }

    if (!formData.userName) {
      newError.userName = "User name field is required";
      isValid = false;
    }

    if (!formData.password) {
      newError.password = "Password field is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newError.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newError.confirmPassword = "Confirm password field is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.gender) {
      newError.gender = "Please select your gender";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleFormData = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const FormSubmit = async (e) => {
    e.preventDefault();

    const isValid = handleFormValidation();
    if (isValid) {
      //User SignUp Hook
      const formDataSend = new FormData();
      formDataSend.append("fullName", formData.fullName);
      formDataSend.append("userName", formData.userName);
      formDataSend.append("password", formData.password);
      formDataSend.append("confirmPassword", formData.confirmPassword);
      formDataSend.append("gender", formData.gender);
      if (formData.image) {
        formDataSend.append("profile", formData.image);
      }

      await signup(formDataSend);
    }
  };

  return (
    <div className="w-full mx-auto flex justify-center items-center">
      <div className="bg-white w-full max-w-[320px] sm:max-w-md py-4 px-6 md:py-10 md:px-8 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <form onSubmit={FormSubmit} className="grid gap-4">
          {/* Image Upload Section */}
          <div className="flex justify-center items-center">
            <label
              className={`${
                formData.image ? "" : "border"
              } border-dashed border-purple-600 rounded-full flex items-center justify-center w-16 h-16 md:w-24 md:h-24 cursor-pointer transition-all duration-300 hover:border-purple-700`}
            >
              <input
                type="file"
                name="profile"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Uploaded Profile"
                  className=" h-16 w-16 md:w-24 md:h-24 rounded-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <div className="w-full">
                    <FaRegCircleUser className="mx-auto " />
                  </div>
                  <span className=" text-[6px] md:text-[10px]">
                    Upload Profile
                  </span>
                </div>
              )}
            </label>
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormData}
                className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="fullName"
                className="absolute cursor-text text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Full Name
              </label>
            </div>
            {error.fullName && (
              <p className="text-xs text-red-500 mt-1">{error.fullName}</p>
            )}
          </div>

          <div>
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

          <div className="">
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormData}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="confirmPassword"
                className="absolute text-sm cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Confirm Password
              </label>
              <div
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2"
              >
                {confirmPasswordVisible ? <IoIosEyeOff /> : <IoIosEye />}
              </div>
            </div>
            {error.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {error.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Select Gender</p>
            <div className="flex gap-4">
              {["male", "female"].map((genderOption) => (
                <label
                  key={genderOption}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    checked={formData.gender === genderOption}
                    onChange={handleFormData}
                    className="hidden"
                  />
                  <div
                    className={`w-4 h-4 rounded border border-gray-300 ${
                      formData.gender === genderOption
                        ? "bg-purple-600 flex justify-center items-center"
                        : "bg-white"
                    }`}
                  >
                    {formData.gender === genderOption && (
                      <FaCheck className="text-white text-xs" />
                    )}
                  </div>
                  <span className="text-sm capitalize">{genderOption}</span>
                </label>
              ))}
            </div>
            {error.gender && (
              <p className="text-xs text-red-500 mt-1">{error.gender}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-purple-600 ${loading?"opacity-50 cursor-not-allowed":""} text-white h-10 text-center rounded-lg transition-colors hover:bg-purple-700`}
          >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin mx-auto"/> : "SignUp"}
          </button>
        </form>
        <div className="text-sm mt-3">
          <span>Already have an account ?</span>{" "}
          <Link
            to="/login"
            className="text-purple-600 text-sm hover:underline hover:text-purple-700 transition-all duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
