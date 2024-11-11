import { useState, useEffect } from "react";
import api from "../services/api";

export function useConversations() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await api.getConversations();
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, []);

  const saveOrUpdateConversation = async (messages, conversationId) => {
    try {
      if (conversationId) {
        await api.updateConversation(conversationId, messages);
      } else {
        const newConversation = await api.createConversation(messages);
        setConversations((prev) => [newConversation, ...prev]);
      }
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  return { conversations, saveOrUpdateConversation, setConversations };
}
