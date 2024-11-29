require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Conversation = require("./models/Conversation");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Save user to database
app.post("/api/users", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        first_name,
        last_name,
        email,
      });
      await user.save();
    }

    res.status(201).json({ message: "User saved!", user });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Update user in database
app.put("/api/users", async (req, res) => {
  const { email, first_name, last_name } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.first_name !== first_name) {
      user.first_name = first_name;
    }
    if (user.last_name !== last_name) {
      user.last_name = last_name;
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
