import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import './db/db.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('api/chat',chatRoutes)
app.use('api/message',messageRoutes)

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
})