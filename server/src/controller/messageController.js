import chatDb from '../models/chatSchema.js';
import messageDb from '../models/messageSchema.js';
import userDb from '../models/userSchema.js';



export const allMessages = async (req, res) => {
    try {
        const messages = await messageDb.find({ chat: req.params.chatId })
            .populate("sender", "name email")
            .populate("reciever")
            .populate("chat");
        res.status(200).json(messages)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
};


export const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;
    try {
        if (!content || !chatId) {
            return res.status(400)
        }
        let newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId
        };
        const message = await messageDb.create(newMessage);
        message = await message.populate("sender","name")
        message = await message.populate("chat");
        message = await message.populate("reciever");
        message = await userDb.populate(message, {
            path: "chat.users",
            select: "name email"
        });
        await chatDb.findByIdAndUpdate(req.body.chatId, { lastMessage: message });
        res.status(200).json(message)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
};
