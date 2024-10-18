import React from "react";
import { BiLogOut } from "react-icons/bi";
import userLogout from "../../hooks/userLogout";

const Logout = () => {
  const { loading, logout } = userLogout();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div onClick={handleLogout} className="mt-auto p-4">
      <BiLogOut className="cursor-pointer w-6 h-6 lg:w-8 lg:h-8" />
    </div>
  );
};

export default Logout;
