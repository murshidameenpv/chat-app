import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
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
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

// Create an HTTP server instance from your Express app
const httpServer = http.createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT"],
    credentials: true
    },
    pingTimeout:60000,
});


io.on('connection', (socket) => {
  console.log('Socket connection established');
    
    socket.on("setup", (user) => {
        socket.join(user._id);
        console.log(`${user._id} joined`);
        socket.emit("connected")
    }),
        
        socket.on('join chat', (room) => {
            socket.join(room)
        }),
        socket.on('new message', (newMessage) => {
            var chat = newMessage.chat;
            if (!chat.users) {
                return console.log("chat.users not defined");
            }
            chat.users.forEach((user) => {
                if (user._id == newMessage.sender._id) return;
                socket.in(user._id).emit("message received", newMessage);
            });
        });
});

httpServer.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
     