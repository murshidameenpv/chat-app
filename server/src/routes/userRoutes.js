import express from 'express';
import { signUpController, signInController } from '../controller/userController.js';
import { validateUser } from '../utils/validateUser.js';
const router = express.Router();

router.post('/signin',signInController)
router.post('/signup', validateUser,signUpController)



export default router;