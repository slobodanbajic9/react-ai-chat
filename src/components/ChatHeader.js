import React from "react";

const ChatHeader = () => {
  return (
    <div className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 text-gray-800 flex items-center gap-4">
      <h1>Dedalus AI Chat</h1>
      <a href="https://dedalus-dev.vercel.app/">
        <img src="/logo-black.svg" alt="DedalusDev" className="w-10 h-10" />
      </a>
    </div>
  );
};

export default ChatHeader;
