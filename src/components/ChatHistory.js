import React, { useEffect, useRef } from "react";
import Message from "./Message";
import Loader from "./Loader";

function ChatHistory({ history, isLoading }) {
  const endOfView = useRef(null);

  useEffect(() => {
    if (endOfView.current) {
      endOfView.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isLoading]);

  return (
    <div className="mt-6 w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl overflow-auto">
      {history.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {isLoading && <Loader />}
      <div ref={endOfView} />
    </div>
  );
}

export default ChatHistory;
