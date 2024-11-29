import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchConversations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/conversations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

export const saveOrUpdateConversation = async (
  conversationId,
  messages,
  userId
) => {
  if (conversationId) {
    await axios.put(`${BASE_URL}/api/conversations/${conversationId}`, {
      messages,
    });
  } else {
    const response = await axios.post(`${BASE_URL}/api/conversations`, {
      userId, // include user id
      history: messages,
    });
    return response.data;
  }
};

export const deleteConversation = async (conversationId) => {
  try {
    await axios.delete(`${BASE_URL}/api/conversations/${conversationId}`);
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw error;
  }
};
