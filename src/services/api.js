import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchConversations = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

export const saveOrUpdateConversation = async (conversationId, messages) => {
  if (conversationId) {
    await axios.put(`${BASE_URL}/${conversationId}`, { messages });
  } else {
    const response = await axios.post(BASE_URL, { history: messages });
    return response.data;
  }
};

export const deleteConversation = async (conversationId) => {
  try {
    await axios.delete(`${BASE_URL}/${conversationId}`);
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw error;
  }
};
