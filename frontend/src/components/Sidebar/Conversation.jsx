import React from "react";
import useConversation from "../../zustand/useConvesation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation?._id;
  const { onlineUsers, socket } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation?._id);
 
  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`flex gap-2 items-center ${
          isSelected ? "bg-sky-500" : ""
        } rounded p-2 py-1 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 lg:w-12 rounded-full">
            <img src={conversation?.profilePic} alt={conversation?._id} />
          </div>
        </div>
        <div className="flex-1 pl-2">
          <div className="flex gap-3 justify-between text-sm sm:text-base">
            <p>{conversation?.fullName}</p>
            
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
