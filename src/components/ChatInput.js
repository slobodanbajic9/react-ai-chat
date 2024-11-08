import React from "react";

function ChatInput({ input, setInput, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full px-3 py-2 text-lg text-black placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg hover:text-white focus:outline-none focus:ring-2 focus:white">
        Send
      </button>
    </form>
  );
}

export default ChatInput;
