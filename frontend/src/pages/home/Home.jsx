import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MessageContainer from "../../components/Messages/MessageContainer";
import useConversation from "../../zustand/useConvesation";

const Home = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex w-full h-screen    bg-gray-100 rounded-lg">
      {/* Sidebar: Only show on larger screens or if no conversation is selected */}
      <div className={` ${selectedConversation ? "hidden sm:flex" : "flex"} w-full sm:w-1/3 bg-gray-900`}>
        <Sidebar />
      </div>
      
      {/* MessageContainer: Show full screen on mobile when a chat is selected */}
      <div className={`w-full ${selectedConversation ? "block" : "hidden sm:flex"} sm:w-2/3 bg-white`}>
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
