import React from "react";

const SidebarOverlay = ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden"
      onClick={onClick}></div>
  );
};

export default SidebarOverlay;
