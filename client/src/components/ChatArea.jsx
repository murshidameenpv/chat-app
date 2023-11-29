import React, { useEffect, useState,useContext } from 'react'
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

function ChatArea() {
  const { currentUser } = useSelector((state) => state.userKey);
    const [messageContent, setMessageContent] = useState("");
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const [chat_id, chat_user] = id.split("&");
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
    const { refresh, setRefresh } = useContext(RefreshContext);
    
  const sendMessage = async () => {
    try {
      await axios.post('/api/message/send', {
        content: messageContent,
        chatId: chat_id,
      });
    setMessageContent("");
    setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
        const fetchMessages = async () => {
            try {
              const response = await axios.get('/api/message/' + chat_id)
              setLoaded(true)
              setAllMessages(response.data)
              setAllMessagesCopy(response.data)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
      }
      fetchMessages();
    },[ chat_id, refresh])
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
  .slice(0)
  .map((message, index) => {
    const sender = message.sender;   
    const self_id =currentUser._id ;
    if (sender._id === self_id) {
      // Message sent by the current user
      return <MessageSelf message={message} key={index} />;
    } else {
      // Message sent by someone else
      if (allMessagesCopy && allMessagesCopy.isGroupChat) {
        // In a group chat, show all messages from other users
        return <MessageOthers message={message} key={index} senderName={sender.name} />;
      } else if (sender._id !== self_id) {
        // In a one-to-one chat, only show messages from the other user
        return <MessageOthers message={message} key={index} senderName={sender.name} />;
      }
    }
    // Return null if none of the above conditions are met
    //The ESLint warning you’re seeing is because the map function expects a return value for every iteration. In your current code, there might be cases where nothing is returned. To fix this, you can return null when you don’t want to render anything
    return null;
  })}
          </div>
          <div className='p-1 m-3 rounded-xl bg-white flex justify-between shadow-lg'>
              <div className='flex items-center mx-2 w-full'>
                  <input type="text" placeholder='Type here...' className='border-none outline-none text-lg flex-grow m-3'
                    value={messageContent} onChange={(e) => { setMessageContent(e.target.value); }}
                     onKeyDown={(event) => {if (event.code === "Enter") {
                         sendMessage();
                       setMessageContent("");
                       setRefresh(!refresh);}}}/>
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
