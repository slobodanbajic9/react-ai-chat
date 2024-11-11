import { useState, useEffect } from "react";
import { fetchConversations } from "../services/api";

const useChat = () => {
  const [history, setHistory] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const loadConversations = async () => {
      const data = await fetchConversations();
      setConversations(data);
    };

    loadConversations();
  }, []);

  return {
    history,
    setHistory,
    conversationId,
    setConversationId,
    conversations,
    setConversations,
  };
};

export default useChat;
