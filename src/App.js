import React, { useState } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };
    setHistory((prevHistory) => [...prevHistory, userMessage]);

    try {
      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [...history, userMessage],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const botMessage = result.data.choices[0].message.content;
      setHistory((prevHistory) => [
        ...prevHistory,
        { role: "assistant", content: botMessage },
      ]);
      setInput("");
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Sorry, something went wrong!");
    }
  };

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 text-blue-400">
        Dedalus AI Chat
      </h1>
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
          className="mt-4 px-4 py-2 text-lg font-medium text-white bg-blue-400 rounded-lg hover:text-white focus:outline-none focus:ring-2 focus:text-blue-400">
          Send
        </button>
      </form>
      <div className="mt-6 w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl overflow-auto">
        {history.map((message, index) => (
          <div key={index} className="mb-4">
            <p
              className={`${
                message.role === "user" ? "text-blue-400" : "text-gray-200"
              } p-3 sm:p-4 bg-gray-800 rounded-lg shadow-lg text-sm sm:text-base`}>
              {renderMessageContent(message.content)}
            </p>
          </div>
        ))}
        {response && (
          <div className="text-sm sm:text-base text-gray-200 p-3 sm:p-4 bg-gray-800 rounded-lg shadow-lg">
            {renderMessageContent(response)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
