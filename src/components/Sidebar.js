import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import { MdDeleteOutline } from "react-icons/md";

function Sidebar({ onSelectConversation }) {
  const [conversations, setConversations] = useState([]);
  const [isDeleteModalOpen, setIsDeletedModalOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState(null);

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

  const openDeleteModal = (id) => {
    setSelectedConversationId(id);
    setIsDeletedModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeletedModalOpen(false);
    setSelectedConversationId(null);
  };

  const handleDeleteConversation = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/conversations/${selectedConversationId}`
      );
      setConversations((prevConversations) =>
        prevConversations.filter((conv) => conv._id !== selectedConversationId)
      );

      closeDeleteModal();
    } catch (error) {
      console.log("Error deleting conversation", error);
    }
  };

  return (
    <div className="sidebar bg-gray-800 text-white w-64 p-4">
      <h2 className="text-xl mb-4">Recent Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation._id}
            className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-700 rounded pb-4">
            <span
              onClick={() =>
                onSelectConversation(conversation.history, conversation._id)
              }>
              {conversation.history[0]?.content}
            </span>
            <button
              onClick={() => openDeleteModal(conversation._id)}
              className="ml-4 text-red-500">
              <MdDeleteOutline size={25} />
            </button>
          </li>
        ))}
      </ul>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConversation}
      />
    </div>
  );
}

export default Sidebar;
