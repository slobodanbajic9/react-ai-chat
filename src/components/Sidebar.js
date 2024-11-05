import React, { useEffect, useState } from "react";
import axios from "axios";

function Sidebar({ onSelectConversation }) {
  const [conversations, setConversations] = useState([]);

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

  return (
    <div className="sidebar bg-gray-800 text-white w-64 p-4">
      <h2 className="text-xl mb-4">Recent Conversations</h2>
      <ul>
        {conversations.map((conversation, index) => (
          <li
            key={conversation._id}
            onClick={() =>
              onSelectConversation(conversation.history, conversation._id)
            }
            className="cursor-pointer p-2 hover:bg-gray-700">
            {conversation.history[0].content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
