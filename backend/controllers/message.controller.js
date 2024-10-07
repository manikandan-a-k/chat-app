import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    // Validate input
    if (!message || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Message and Receiver ID are required.",
      });
    }

    // Find or create conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Add message to the conversation
    conversation.messages.push(newMessage._id);

    // Save conversation and message atomically
    await Promise.all([conversation.save(), newMessage.save()]);

    // Send successful response
    res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.error(`Error in sendMessage Controller: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const userToChatId = req.params.id;

    // Find the conversation between sender and receiver
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(201).json({
        success: true,
        messages: conversation.messages,
      });
    }

    res.status(200).json({
      success: true,
      messages: conversation.messages,
    });
  } catch (error) {
    console.error(`Error in Get Message Controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
