import express from 'express';
import { signUpController,loginController } from '../controller/userController.js';
const router = express.Router();

router.post('/login',loginController)
router.post('/signup', signUpController)



export default router;