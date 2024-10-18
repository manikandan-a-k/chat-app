import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
const userLogout = () => {
  const [loading, setLoading] = useState();
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/logout");
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.removeItem("chat-app");
        setAuthUser(null);
      } else {
        toast.error(response?.data?.message || "Logout Failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went Wrong , Please try again !"
      );
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default userLogout;
