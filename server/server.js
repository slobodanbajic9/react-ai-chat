require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Conversation = require("./models/Conversation");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Save a new conversation
app.post("/api/conversations", async (req, res) => {
  try {
    const newConversation = new Conversation({ history: req.body.history });
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing conversation by adding a new message
app.put("/api/conversations/:id", async (req, res) => {
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { $push: { history: { $each: req.body.messages } } }, // Use `$each` to add multiple messages
      { new: true } // Return the updated document
    );
    res.json(updatedConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all conversations
app.get("/api/conversations", async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ createdAt: -1 });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a conversation by ID
app.delete("/api/conversations/:id", async (req, res) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
