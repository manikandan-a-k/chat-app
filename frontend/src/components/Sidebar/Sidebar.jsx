import React from "react";
import SearchInput from "./SearchInput";
import ConversationMessage from "./ConversationMessage";
import Logout from "./Logout";

const Sidebar = () => {
  return (
    <div className="text-white flex flex-col h-full w-full lg:p-4 bg-gray-800">
      {/* Search Input */}
      <SearchInput />
      
      {/* Divider */}
      <div className="divider px-3 my-2"></div>
      
      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        <ConversationMessage />
      </div>
      
      {/* Logout */}
      <Logout />
    </div>
  );
};

export default Sidebar;
