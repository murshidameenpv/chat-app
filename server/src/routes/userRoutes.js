import express from 'express';
import { signUpController, signInController ,fetchAllUsers} from '../controller/userController.js';
import { validateUser } from '../utils/validateUser.js';
import {verifyUser} from '../utils/verifyUser.js'
const router = express.Router();

router.post('/signin',signInController)
router.post('/signup', validateUser,signUpController)
router.get('/fetchusers',verifyUser,fetchAllUsers)



export default router;