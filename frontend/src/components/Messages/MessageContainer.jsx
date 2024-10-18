import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiArrowBack, TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConvesation";
import { useAuthContext } from "../../context/AuthContext";


const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <>
      {selectedConversation ? (
        <div className="flex flex-col h-full bg-white text-black">
          {/* Header with Back button (for mobile screens) */}
          <div className="bg-gray-200 p-3 flex items-center space-x-4">
            <button
              className="sm:hidden"
              onClick={() => setSelectedConversation(null)}
            >
              <TiArrowBack className="text-xl" />
            </button>
            <div className="flex-1">
              <p className="font-bold">{selectedConversation.fullName}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>

          {/* Input */}
          <MessageInput />
        </div>
      ) : (
        <NoChatSelected />
      )}
    </>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext(); // Assuming you're using this for user info
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName}</p>
        <p>Select a chat to start Messaging</p>
        <TiMessages className="text-center text-3xl md:text-6xl" />
      </div>
    </div>
  );
};

export default MessageContainer;
