import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;

const api = {
  getConversations: async () => {
    const response = await axios.get(`${URL}/conversations`);
    return response.data;
  },
  createConversation: async (messages) => {
    const response = await axios.post(`${URL}/conversations`, {
      history: messages,
    });
    return response.data;
  },
  updateConversation: async (id, messages) => {
    await axios.put(`${URL}/conversations/${id}`, { messages });
  },
};

export default api;
