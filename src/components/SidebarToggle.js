import React from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const SidebarToggle = ({ isOpen, onClick }) => {
  return (
    <button
      className="p-2 text-2xl rounded focus:outline-none absolute top-4 left-4 z-20 sm:hidden"
      onClick={onClick}>
      <HiOutlineMenuAlt1 />
    </button>
  );
};

export default SidebarToggle;
