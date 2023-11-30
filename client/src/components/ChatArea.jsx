import React, { useEffect, useState,useContext, useRef } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import Skeleton from "@mui/material/Skeleton";
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {RefreshContext} from '../contexts/refreshContext.js'
import { io } from "socket.io-client";
var socket 
function ChatArea() {
  const { currentUser } = useSelector((state) => state.userKey);
  const [messageContent, setMessageContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  const [chat_id,chat_user] = id.split("&");
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [socketConnectionStatus,setSocketConnectionStatus] = useState(false)
  const END_POINT = 'http://localhost:8080';
  const chatEndRef = useRef(null);  
//connection
  useEffect(() => {
  socket = io(END_POINT);
  socket.emit('setup', currentUser);
  socket.on('connection', () => {
    setSocketConnectionStatus(!socketConnectionStatus);
  });
  }, []);

useEffect(() => {
  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/message/' + chat_id);
      setAllMessages(response.data);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };
  fetchMessages();
  setAllMessagesCopy(allMessages)
}, [allMessagesCopy,refresh,chat_id]);

// Socket.IO event listener
// New message received
useEffect(() => {
  socket.on("message received", (newMessage) => {
    console.log(newMessage,'THIS IS NEW MESSAGE');
    if (!allMessagesCopy || allMessagesCopy._id !== newMessage._id) {
      
    } else {
      setAllMessages([...allMessages],newMessage)
    }
  });
}, [allMessages]);

  useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [allMessages,allMessagesCopy]);
  //new message received
  useEffect(() => {
    socket.on("message received", (newMessage) => {
      console.log(newMessage,"THIS IS NEWS MESSAGE");
      if (!allMessagesCopy || allMessagesCopy._id !== newMessage._id) {
        // setAllMessages([...allMessages], newMessage)
      } else {
        setAllMessages([...allMessages], newMessage)
      }
    });
  }); 
  
  const sendMessage = async () => {
  try {
    const response = await axios.post('/api/message/send', {
      content: messageContent,
      chatId: chat_id,
    });
    socket.emit("new message",response.data)
  } catch (error) {
    console.log(error);
  }
}
    if (!loaded) {
        return (
          <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );  
    } else {
        return (
      <AnimatePresence>
         <motion.div initial={{ opacity: 0, scale: 0 }}
             animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} transition={{ease:"anticipate",duration:"0.3"}} className='border flex flex-col flex-7'>
          <div className='p-1 m-3 rounded-2xl bg-slate-50 flex justify-between items-center shadow-lg'>
              <div className='flex items-center mx-2'>
                  <div className='bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center'>
                    <p>{chat_user[0].toLocaleUpperCase()}</p>
                  </div>
                  <div className='flex-1'>
                    <p className='font-bold mx-4'>{chat_user}</p>
                      <p className='text-sm text-green-500 mx-4'>online</p>
                  </div>
              </div>
              <div>
                  <IconButton>
                  <DeleteIcon />
                  </IconButton>
              </div>
         </div>
  <div className='flex-1 overflow-y-auto no-scrollbar'>
  {allMessages
  // eslint-disable-next-line array-callback-return
  .slice(0).map((message, index) => {
    const sender = message.sender;   
    const self_id = currentUser._id;
    if (sender._id === self_id) {
      // Message sent by the current user
      return <MessageSelf message={message} key={index} />;
    } else {
      // Message sent by someone else
      if (allMessages && allMessages.isGroupChat) {
        // In a group chat, show all messages from other users
        return <MessageOthers message={message} key={index} senderName={sender.name} />;
      } else if (sender._id !== self_id) {
        // In a one-to-one chat, only show messages from the other user
        return <MessageOthers message={message} key={index} senderName={sender.name} />;
      }
    }
  })}
           <div ref={chatEndRef} />
          </div>
          <div className='p-1 m-3 rounded-xl bg-white flex justify-between shadow-lg'>
              <div className='flex items-center mx-2 w-full'>
                  <input type="text" placeholder='Type here...' className='border-none outline-none text-lg flex-grow m-3'
                    value={messageContent} onChange={(e) => { setMessageContent(e.target.value); }}
                    onKeyDown={(event) => {
                      if (event.code === "Enter")
                      {
                        sendMessage();
                       setMessageContent("");
                       setRefresh(!refresh);
                       }}}/>
                 <IconButton>
                  <SendIcon onClick={() => {
                      sendMessage();
                      setMessageContent("");
                     setRefresh(!refresh);
            }}/>
                  </IconButton>
              </div>
          </div>
    </motion.div> 
      </AnimatePresence>
  ) 
}


}

export default ChatArea;
