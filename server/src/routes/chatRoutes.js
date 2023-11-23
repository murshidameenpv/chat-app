import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { accessChat,fetchChat,fetchGroupChat,createGroupChat, groupExit,addSelfToGroup } from '../controller/chatController.js';
const router = express.Router();

router.post("/getChats",verifyUser, accessChat);
router.get("/getChats",verifyUser, fetchChat);

router.post("/createGroup", verifyUser, createGroupChat);
router.post("/fetchGroups", verifyUser, fetchGroupChat);
router.put("/groupExit", verifyUser, groupExit);
router.put("/addSelfToGroup   ", verifyUser, addSelfToGroup);

export default router;


