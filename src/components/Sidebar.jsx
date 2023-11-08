import React, { useState,useContext} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import ConversationItem from './ConversationItem';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from './DarkModeContext';



export default function Sidebar() {
    const [consversations, setConsversations] = useState([{ name: "jack", lastMessage: "hello", timeStamp: "yesterday", },
        { name: "james", lastMessage: "where?", timeStamp: "today", },
    { name: "Amon", lastMessage: "ok", timeStamp: "today", },])
    const navigate = useNavigate()
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
      <div className={`border flex flex-col flex-3 ${darkMode ? 'dark' : ''}`}>
          <div className='p-1 m-4 rounded-2xl bg-slate-50 dark:bg-slate-500 flex justify-between shadow-lg'>
              <div>
              <IconButton>
              <AccountCircleIcon/>
              </IconButton>   
              </div>
              
              <div>
              <IconButton onClick={()=>{navigate('users')}}>
              <PersonAddIcon/>
              </IconButton>
              <IconButton>
              <GroupAddIcon onClick={()=>{navigate('groups')}}/>
              </IconButton>
              <IconButton>
              <AddCircleIcon onClick={()=>{navigate('create-group')}}/>
              </IconButton>
                  <IconButton>
{/* when called, will call setDarkMode with the opposite of the current darkMode value */}
                      {darkMode ? <WbSunnyIcon onClick={() => { setDarkMode(!darkMode) }} /> :
                      <DarkModeIcon onClick={() => { setDarkMode(!darkMode) }} />}
              </IconButton>   
              </div>
              
          </div>
         
          <div className='p-3 mx-4 rounded-2xl bg-white dark:bg-slate-500 flex items-center shadow-lg'>
              <IconButton>
                 <SearchIcon/>
              </IconButton>
             <input type="text" placeholder='Search' className='outline-none border-none text-lg ml-3 dark:bg-slate-500'/>
         
          </div>
          <div className='p-3 m-4 rounded-2xl bg-white dark:bg-slate-500 flex-1 shadow-lg'>
              {consversations.map((Conversation) => {
                  return <ConversationItem props={Conversation} key={Conversation.name}/>
              })}
          </div>
      </div>
  )
}
