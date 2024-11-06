const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  history: [
    {
      role: String,
      content: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversation", conversationSchema);
