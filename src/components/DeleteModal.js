import React from "react";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-blue-400 text-black p-10 rounded-lg">
        <h2 className="text-lg text-white">Are you sure?</h2>
        <p className="text-white">This action cannot be undone.</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-white rounded text-blue-400">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
