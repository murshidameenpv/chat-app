import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import {motion,AnimatePresence} from 'framer-motion'
function ChatArea() {
    return (
      <AnimatePresence>
         <motion.div initial={{ opacity: 0, scale: 0 }}
             animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} transition={{ease:"anticipate",duration:"0.3"}} className='border flex flex-col flex-7'>
          <div className='p-1 m-3 rounded-2xl bg-slate-50 flex justify-between items-center shadow-lg'>
              <div className='flex items-center mx-2'>
                  <div className='bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center'>
                      <p>T</p>
                  </div>
                  <div className='flex-1'>
                      <p className='font-bold mx-4'>Tim Cook</p>
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
              <MessageOthers />
              <MessageSelf/>
              <MessageOthers />
              <MessageSelf/>
              <MessageOthers />
              <MessageSelf/>
              <MessageOthers />
              <MessageSelf/>
          </div>
          <div className='p-1 m-3 rounded-xl bg-white flex justify-between shadow-lg'>
              <div className='flex items-center mx-2 w-full'>
                 <input type="text" placeholder='Type here...' className='border-none outline-none text-lg flex-grow m-3'/>
                 <IconButton>
                  <SendIcon/>
                  </IconButton>
              </div>
          </div>
    </motion.div> 
      </AnimatePresence>

  )
}

export default ChatArea;
