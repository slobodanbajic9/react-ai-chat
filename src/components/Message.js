import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const renderMessageContent = (content) => {
  const codeBlockPattern = /```(.*?)```/gs;
  const parts = content.split(codeBlockPattern);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <SyntaxHighlighter
          key={index}
          language="javascript"
          style={oneDark}
          className="rounded-lg my-2">
          {part.trim()}
        </SyntaxHighlighter>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });
};

function Message({ message }) {
  return (
    <div className="mb-4">
      <p
        className={`${
          message.role === "user" ? "text-blue-400" : "text-gray-200"
        } p-3 sm:p-4 bg-gray-800 rounded-lg shadow-lg text-sm sm:text-base`}>
        {renderMessageContent(message.content)}
      </p>
    </div>
  );
}

export default Message;
