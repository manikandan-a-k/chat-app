import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
const userSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/auth/signup`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("chat-app", JSON.stringify(response.data.user));
        setAuthUser(response.data.user);
      } else {
        toast.error(response.data.message||"Sign Up Failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message||"Something Went Wrong , Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};

export default userSignUp;
