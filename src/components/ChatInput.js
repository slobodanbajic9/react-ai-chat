import React, { useRef } from "react";

function ChatInput({ input, setInput, handleSubmit }) {
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl relative">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        rows="1"
        className="w-full px-3 py-2 text-lg text-black placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none overflow-y-auto pr-16"
        style={{ maxHeight: "200px", minHeight: "40px" }}></textarea>
      <button
        type="submit"
        className="absolute right-2 bottom-[0.25rem] px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
        Send
      </button>
    </form>
  );
}

export default ChatInput;
