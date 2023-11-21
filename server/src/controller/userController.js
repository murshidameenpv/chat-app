import userDb from '../models/userSchema.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler'
import dotenv from 'dotenv';
dotenv.config()

 

export const signInController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
       const validUser = await userDb.findOne({ email })
        if (!validUser) {
            return res.status(404).json({"message":"User not found!"})
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return res.status(401).json({"message":"Invalid Credentials!"})
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
         // Exclude password when sending user data
        const userToSend = validUser.toObject();
        delete userToSend.password;
        const expiryDate = new Date(Date.now()+3600000)
        res.cookie('access_token', token, { httpOnly: true, expires:expiryDate})
            .status(200)
            .json(userToSend)
    } catch (error) {
        console.error(error);
    }

});
    


export const signUpController = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try {
        const newUser = new userDb({ name, password: hashedPassword, email });
        await newUser.save()
        // Exclude password when sending user data
        const userToSend = newUser.toObject();
        delete userToSend.password;
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        const expiryDate = new Date(Date.now() + 3600000)

        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(userToSend)

    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "An error occurred during registration" });
    }
});
