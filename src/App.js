import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatInput from "./components/ChatInput";
import ChatHistory from "./components/ChatHistory";
import Sidebar from "./components/Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/conversations"
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  const saveOrUpdateConversation = async (messages) => {
    if (conversationId) {
      await axios.put(
        `http://localhost:8000/api/conversations/${conversationId}`,
        { messages }
      );
    } else {
      const response = await axios.post(
        "http://localhost:8000/api/conversations",
        { history: messages }
      );
      setConversationId(response.data._id);
      setConversations((prevConversations) => [
        response.data,
        ...prevConversations,
      ]);
    }
  };

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

      const botMessage = {
        role: "assistant",
        content: result.data.choices[0].message.content,
      };
      const updatedHistory = [...history, userMessage, botMessage];
      setHistory(updatedHistory);
      setInput("");

      saveOrUpdateConversation([userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  const handleNewChat = () => {
    setHistory([]);
    setConversationId(null);
  };

  const handleSelectConversation = (conversation, id) => {
    setHistory(conversation);
    setConversationId(id);
  };

  const handleDeleteConversation = (deletedId) => {
    setConversations((prevConversations) =>
      prevConversations.filter((conv) => conv._id !== deletedId)
    );
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans relative">
      <button
        className="p-2 text-2xl rounded focus:outline-none absolute top-4 left-4 z-20 sm:hidden"
        onClick={() => setSidebarOpen((prev) => !prev)}>
        <HiOutlineMenuAlt1 />
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden"
          onClick={() => setSidebarOpen(false)}></div>
      )}

      <Sidebar
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        handleDeleteConversation={handleDeleteConversation}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 mt-20">
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
