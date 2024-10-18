import { useState } from "react";
import useConversation from "../zustand/useConvesation";
import axios from "axios";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        { message }
      );
      if (response.data.success) {
       
        setMessages([...messages, response?.data?.newMessage]);
      } else {
        toast.error(response.data?.message || "Message Send Failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something Went Wrong , Please Try Again ! "
      );
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
