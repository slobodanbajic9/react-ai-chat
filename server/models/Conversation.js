const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  history: [
    {
      role: String,
      content: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversation", conversationSchema);
