import React from "react";

const ConversationSkeleton = () => {
  return (
    <div className="flex gap-2 items-center p-2 py-1">
      {/* Skeleton for avatar */}
      <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>

      {/* Skeleton for conversation details */}
      <div className="flex-1 pl-2">
        <div className="flex gap-3 justify-between">
          {/* Skeleton for the name */}
          <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
          {/* Skeleton for the emoji */}
          <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ConversationSkeleton;
