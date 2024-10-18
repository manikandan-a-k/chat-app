import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConvesation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState();
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("")
    }else toast.error("No such user found")
  };
  return (
    <form onSubmit={handleSubmit} className="flex p-3 lg:p-4 gap-2 w-full items-center">
      <input
        type="text"
        placeholder="Search"
        className=" w-full rounded-full py-2 lg:py-3  pl-4 text-black focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="p-2 lg:p-3 rounded-full bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
