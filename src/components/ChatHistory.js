import React from "react";
import Message from "./Message";

function ChatHistory({ history }) {
  return (
    <div className="mt-6 w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl overflow-auto">
      {history.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

export default ChatHistory;
