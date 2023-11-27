    import mongoose from "mongoose";

    const chatSchema = new mongoose.Schema({
        chatName: {
            type: String,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    });

    const chatDb = mongoose.model('Chat', chatSchema);
    export default chatDb;