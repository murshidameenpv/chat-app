import userDb from "../models/userSchema.js";
import chatDb from "../models/chatSchema.js";

// CREATE ONE TO ONE CHAT  1
export const accessChat = async (req, res) => {
    const { userId } = req.body;
    try {
        if (!userId) {
            console.error("User id param is not send with request");
            return res.status(400);
        }
        let isChat = await chatDb.find({
            isGroupChat: false, $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: req.userId } } },
            ],
        })
            .populate("users", "-password")
            .populate("lastMessage");
        isChat = await userDb.populate(isChat, { path: "lastMessage.sender", select: "name email", })
        if (isChat.length > 0) {
            res.status(200).json(isChat);
        } else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users:[req.user._id,userId]
            }
        }
        const createdChat = await chatDb.create(chatData);
        const fullChat = await chatDb.findOne({ _id: createdChat._id })
            .populate("users", "-password");
        res.status(200).json(fullChat)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Sever Error")
    }
};

export const fetchChat =  (req, res) => {
    try {
        chatDb.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("lastMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await userDb
                    .populate(results, { path: "lastMessage.sender", select: "name email", });
            });
        res.status(200).json(results)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Sever Error")
    }
};

export const fetchGroupChat = async (req, res) => {
    try {
        const allGroups = await chatDb.where("isGroupChat").equals(true);
        res.status(200).json(allGroups)
    } catch (error) {
        res.status(500).send("Internal Sever Error")
    }
};


export const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Data is insufficient" });
  }

  var users = JSON.parse(req.body.users);
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};



export const groupExit = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404).send("Chat Not FOund")
   
  } else {
    res.status(200).json(removed);
  }
};

//if you found a  group you can join yourself in that group 
const addSelfToGroup = async (req, res) => {
    const { chatId, userId } = req.body;
    try {
        const added = await chatDb.findByIdAndUpdate(chatId, {
            $push: { users: userId }
        }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
        
        if (!added) {
            res.status(400).send("Error Adding to group");    
        }else{
            res.status(200).json(added)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");

    }
}