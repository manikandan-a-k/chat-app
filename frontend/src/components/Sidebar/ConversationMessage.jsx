import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import ConversationSkeleton from "../skelotons/CoversationSkeloton";


const ConversationMessage = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="flex flex-col px-4 overflow-auto">
      {loading &&
        [...Array(5)].map((_, index) => (
          <ConversationSkeleton key={index} />
        ))}
      {!loading &&
        conversations.map((conversation, index) => (
          <Conversation
            conversation={conversation}
            lastIndex={index === conversations.length - 1}
            key={conversation?._id}
          
          />
        ))}
    </div>
  );
};

export default ConversationMessage;
