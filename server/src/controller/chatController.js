import userDb from "../models/userSchema.js";
import chatDb from "../models/chatSchema.js";
// CREATE ONE TO ONE CHAT
export const accessChat = async (req, res) => {
  const { userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    console.error("User id param is not send with request");
    return res.status(400).json({ error: "User id param is not send with request" });
  }

  try {
    // Use findOne instead of find to get a single document
    let chat = await chatDb.findOne({
      isGroupChat: false,
      users: { $all: [req.user.id, userId] },  // Use $all to match all elements in the array
    })
    .populate([
      { path: "users", select: "-password" },  // Use an array to populate multiple paths
      { path: "lastMessage", populate: { path: "sender", select: "name email" } },  // Nested population
    ]);

    // If chat doesn't exist, create a new one
    if (!chat) {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user.id, userId],
      };

      chat = await chatDb.create(chatData);
      await chat.populate("users", "-password")
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const fetchChat = async (req, res) => {
  try {
    let results = await chatDb.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    results = await userDb.populate(results, { path: "lastMessage.sender", select: "name email" });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
    return res.status(400).json({ message: "Data is insufficient" });
  }
  var users = req.body.users;
  users.push(req.user.id);
  
  try {
    const groupChat = await chatDb.create({
      chatName: req.body.name,
      isGroupChat: true,
      users,
      groupAdmin: req.user.id,
    });

    const fullGroupChat = await chatDb.findOne({ _id: groupChat._id })
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
export const addSelfToGroup = async (req, res) => {
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