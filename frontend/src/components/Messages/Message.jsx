import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConvesation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = authUser?._id === message?.senderId;
  const fromOther = selectedConversation?._id === message?.receiverId;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;
  const bubleBgColor = fromMe ? "bg-sky-500" : "";
  const formatedTime = extractTime(message?.createdAt);
  return (
    <div className={`chat ${chatClassName} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white pb-2 ${bubleBgColor}`}>
        {message.message}
      </div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
