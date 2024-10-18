import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          placeholder="Send a Message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border w-full p-2.5 bg-gray-700 border-gray-600 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className={`absolute ${
            loading ? "cursor-not-allowed" : ""
          } end-0 inset-y-0 flex items-center pe-3`}
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BiSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
