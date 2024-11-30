import React, { useState } from "react";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import { MdDeleteOutline } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";

function Sidebar({
  conversations,
  onSelectConversation,
  onNewChat,
  isOpen,
  onClose,
  handleDeleteConversation,
  currentUserId,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const maxTitleLength = 20;

  const openDeleteModal = (id) => {
    setSelectedConversationId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedConversationId(null);
  };

  const handleDeleteChat = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/conversations/${selectedConversationId}`
      );

      handleDeleteConversation(selectedConversationId);

      onClose();
      closeDeleteModal();
    } catch (error) {
      console.log("Error deleting conversation", error);
    }
  };

  const userConversations = conversations.filter(
    (conversation) => conversation.userId === currentUserId
  );

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0 z-20`}>
      <div className="relative h-full flex flex-col">
        <h2 className="text-xl mb-4 p-2">Recent Conversations</h2>

        <ul className="flex-grow overflow-y-auto">
          {userConversations.map((conversation) => (
            <li
              key={conversation._id}
              className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-700 rounded">
              <span
                onClick={() => {
                  onSelectConversation(conversation.history, conversation._id);
                  onClose();
                }}>
                {conversation.history[0]?.content.length > maxTitleLength
                  ? conversation.history[0].content.slice(0, maxTitleLength) +
                    "..."
                  : conversation.history[0].content}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal(conversation._id);
                }}
                className="ml-4 text-red-500">
                <MdDeleteOutline size={25} />
              </button>
            </li>
          ))}
        </ul>

        {/* New chat button */}
        <div className="mt-4">
          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="flex items-center gap-2 p-2 bg-blue-800 text-white rounded hover:bg-blue-600">
            <CiCirclePlus size={20} />
            <span>New chat</span>
          </button>
        </div>

        {/* Delete Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteChat}
        />
      </div>
    </div>
  );
}

export default Sidebar;
