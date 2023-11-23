import express from 'express';
const router = express.Router();
import { sendMessage, allMessages } from '../controller/messageController';
import { verifyUser } from '../utils/verifyUser';


router.get('/:chatId', verifyUser, allMessages);
router.post('/send', verifyUser, sendMessage);
export default router;