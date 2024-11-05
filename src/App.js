import React, { useState } from "react";
import axios from "axios";
import ChatInput from "./components/ChatInput";
import ChatHistory from "./components/ChatHistory";

function App() {
  const [input, setInput] = useState("");
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
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 text-blue-400">
          Dedalus AI Chat
        </h1>
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
        <ChatHistory history={history} />
      </div>
    </div>
  );
}

export default App;
