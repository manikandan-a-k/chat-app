import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/users");

        if (response.data.success) {
          setConversations(response.data.filteredUsers);
        } else {
          
        }
      } catch (error) {
       
      } finally {
        setLoading(false);
      }
    };
    getConversations();

  }, []);
  return { loading, conversations };
};

export default useGetConversations;
