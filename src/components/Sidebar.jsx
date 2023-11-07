import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import ConversationItem from './ConversationItem';



export default function Sidebar() {
    const [consversations, setConsversations] = useState([{ name: "jack", lastMessage: "hello", timeStamp: "yesterday", },
        { name: "james", lastMessage: "where?", timeStamp: "today", },
    { name: "Amon", lastMessage: "ok", timeStamp: "today", },])
console.log(setConsversations);

  return (
      <div className='border flex flex-col flex-3'>
          <div className='p-1 m-4 rounded-2xl bg-slate-50 flex justify-between'>
              <div>
              <IconButton>
              <AccountCircleIcon/>
              </IconButton>   
              </div>
              <div>
              <IconButton>
              <PersonAddIcon/>
              </IconButton>
              <IconButton>
              <GroupAddIcon/>
              </IconButton>
              <IconButton>
              <AddCircleIcon/>
              </IconButton>
              <IconButton>
              <DarkModeIcon/>
              </IconButton>   
              </div>
              
          </div>
         
          <div className='p-3 mx-4 rounded-2xl bg-white flex items-center'>
              <IconButton>
                <SearchIcon/>
              </IconButton>
             <input type="text" placeholder='Search' className='outline-none border-none text-lg ml-3'/>
         
          </div>
          <div className='p-3 m-4 rounded-2xl bg-white flex-1 '>
              {consversations.map((Conversation) => {
                  return <ConversationItem props={Conversation} key={Conversation.name}/>
              })}
          </div>
      </div>
  )
}
