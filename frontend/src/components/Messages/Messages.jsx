import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkelaton from "../skelotons/MessageSkelaton";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastRef = useRef();
  useListenMessage();

  useEffect(() => {
    setTimeout(() => {
      lastRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && [...Array(3)].map((_, i) => <MessageSkelaton key={i} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a Message to Start the conversation</p>
      )}

      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message.id} ref={lastRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
