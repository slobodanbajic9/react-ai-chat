import { useState, useEffect } from "react";
import axios from "axios";

import {
  fetchConversations,
  saveOrUpdateConversation,
  deleteConversation,
} from "../services/api";

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";

import SidebarToggle from "./SidebarToggle";
import SidebarOverlay from "./SidebarOverlay";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import User from "./User";
import ChatSection from "./ChatSection";

const Home = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  console.log("🚀 ~ Home ~ conversations:", conversations);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const loadConversations = async () => {
      const data = await fetchConversations();
      setConversations(data);
    };

    loadConversations();
  }, []);

  const handleSaveOrUpdateConversation = async (messages) => {
    const result = await saveOrUpdateConversation(
      conversationId,
      messages,
      userId
    );
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
    <>
      <SignedIn>
        <div
          style={{
            backgroundImage: `url(${
              window.innerWidth < 768 ? "/bg-mobile.jpg" : "/bg-image.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex flex-col min-h-screen text-white font-sans relative">
          <User />

          <div className="flex flex-1">
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
              currentUserId={userId}
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
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Home;
