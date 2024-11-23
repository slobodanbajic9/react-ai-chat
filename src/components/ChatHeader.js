import React from "react";
import { VscRobot } from "react-icons/vsc";

const ChatHeader = () => {
  return (
    <div className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 text-gray-800 flex items-center gap-4">
      <h1>Dedalus AI Chat</h1>
      <VscRobot color="#1f2937" />
    </div>
  );
};

export default ChatHeader;
