import { useEffect, useState } from "react";
import useConversation from "../zustand/useConvesation";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/messages/get/${selectedConversation._id}`
        );
        if (response?.data?.success) {
          setMessages(response?.data?.messages);
        } else {
          
        }
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    } else {
      setMessages([]); // Clear messages if no conversation is selected
    }
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
