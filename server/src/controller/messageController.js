import chatDb from '../models/chatSchema.js';
import messageDb from '../models/messageSchema.js';
import userDb from '../models/userSchema.js';



export const allMessages = async (req, res) => {
    try {
        const messages = await messageDb.find({ chat: req.params.chatId })
            .populate("sender", "name email")
            .populate("receiver","name email")
            .populate("chat");
        res.status(200).json(messages)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
};

  export const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;
    const senderId = req.user.id;

    if (!content || !chatId) {
      return res.status(400).json("Content and Chat ID are required");
    }

    try {
      // Find the chat to get the receiver
      const chat = await chatDb.findById(chatId);
      if (!chat) {
        return res.status(400).json("Chat not found");
      }

      // The receiver is the user in the chat who is not the sender
      const receiverIds = chat.users.filter(userId => userId.toString() !== senderId);
      console.log(receiverIds);
        if (!receiverIds.length) {
       return res.status(400).json("Receivers not found");
     }

      let newMessage = {
        sender: senderId,
        receiver:receiverIds,
        content: content,
        chat: chatId
      };

      let message = await messageDb.create(newMessage);
      message = await messageDb.populate(message, "sender receiver chat", "name");
      console.log(message,"ooooooooo");
      await chatDb.findByIdAndUpdate(chatId, { lastMessage: message });
        res.status(200).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
