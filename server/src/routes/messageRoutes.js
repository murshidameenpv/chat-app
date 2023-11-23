import express from 'express';
const router = express.Router();
import { sendMessage, allMessages } from '../controller/messageController.js';
import { verifyUser } from '../utils/verifyUser.js';


router.get('/:chatId', verifyUser, allMessages);
router.post('/send', verifyUser, sendMessage);
export default router;