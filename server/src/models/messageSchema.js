import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref:"Chat"
    }
},{timestamps:true})

const messageDb = mongoose.model('Message', messageSchema);
export default messageDb;