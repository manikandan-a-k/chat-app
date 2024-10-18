import React from "react";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="h-screen flex justify-center items-center bg-gray-800 ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authUser?<Home />:<Navigate to={"/login"}/>}></Route>
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"}/> : <Login />}
          ></Route>
          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <SignUp />}
          ></Route>
        </Routes>
        <Toaster duration="2000" position="top-center" />
      </BrowserRouter>
    </div>
  );
};

export default App;
