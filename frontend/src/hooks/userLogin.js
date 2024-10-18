import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const userLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", userData);
      if (response.data.success) {
        toast.success(response.data.message);
      

        // Store user in localStorage and set auth context
        localStorage.setItem("chat-app", JSON.stringify(response.data.user));
        setAuthUser(response.data.user);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default userLogin;
