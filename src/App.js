import React, { useState, useEffect } from "react";
import SignInPage from "./components/SignIn";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  fetchConversations,
  saveOrUpdateConversation,
  deleteConversation,
} from "./services/api";

import axios from "axios";
import Sidebar from "./components/Sidebar";
import SidebarToggle from "./components/SidebarToggle";
import SidebarOverlay from "./components/SidebarOverlay";
import ChatHeader from "./components/ChatHeader";
import ChatSection from "./components/ChatSection";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadConversations = async () => {
      const data = await fetchConversations();
      setConversations(data);
    };

    loadConversations();
  }, []);

  const handleSaveOrUpdateConversation = async (messages) => {
    const result = await saveOrUpdateConversation(conversationId, messages);
    if (!conversationId) {
      setConversationId(result._id);
      setConversations((prev) => [result, ...prev]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setIsLoading(true);

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

      handleSaveOrUpdateConversation([userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
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

  const handleDeleteConversation = async (deletedId) => {
    await deleteConversation(deletedId);
    setConversations((prevConversations) =>
      prevConversations.filter((conv) => conv._id !== deletedId)
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <div className="flex min-h-screen bg-black text-white font-sans relative">
                  <SidebarToggle
                    isOpen={sidebarOpen}
                    onClick={() => setSidebarOpen((prev) => !prev)}
                  />

                  {sidebarOpen && (
                    <SidebarOverlay onClick={() => setSidebarOpen(false)} />
                  )}

                  <Sidebar
                    conversations={conversations}
                    onSelectConversation={handleSelectConversation}
                    onNewChat={handleNewChat}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    handleDeleteConversation={handleDeleteConversation}
                  />

                  <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 mt-20 mb-10">
                    <ChatHeader />
                    <ChatSection
                      history={history}
                      isLoading={isLoading}
                      input={input}
                      setInput={setInput}
                      handleSubmit={handleSubmit}
                    />
                  </div>
                </div>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
