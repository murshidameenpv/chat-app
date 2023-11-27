import React, { useContext, useEffect, useState } from 'react';
import { RefreshContext } from "../contexts/refreshContext.js";
import logo from '../images/live-chat.png'
import { IconButton,Backdrop, CircularProgress} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector,useDispatch} from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { refreshSidebarFun } from '../redux/refreshSideBarSlice.js';

function UsersAndGroups() {
  const currentTheme = useSelector((state) => state.themeKey);
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/fetchusers');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  fetchUsers();
}, [refresh]);
  
  const handleAccessChat = async (userId) => {
  try {
    setLoading(true);
    await axios.post('/api/chat/getChats', { userId });
    dispatch(refreshSidebarFun());
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
};

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, scale: 0 }}
        animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} transition={{ease:"anticipate",duration:"0.3"}} className={`border flex flex-col flex-7 ${currentTheme ? 'dark' : ''} rounded-tr-3xl rounded-br-3xl`}>
        <div className='p-2 mt-3 mx-3 rounded-2xl bg-slate-50  dark:bg-slate-500 flex items-center shadow-lg  text-center justify-between'>
          <img src={logo} alt="Logo" className='w-10 h-10'/>
            <p className='text-lg font-bold ml-2 pl-2'>All Users</p>
             <IconButton className='flex' onClick={() => {setRefresh(!refresh);}}>
            <RefreshIcon />
          </IconButton>
        </div>
        <div className='p-3 m-3 rounded-2xl bg-white  dark:bg-slate-500 flex justify-between items-center shadow-xl'>
          <IconButton>
            <SearchIcon/>
          </IconButton>
          <input type="text" placeholder='Search' className='border-none outline-none  dark:bg-slate-500 text-lg flex-grow ml-3'/>
        </div>
        <div className='p-3 m-4 rounded-2xl flex flex-col space-y-4 overflow-y-auto no-scrollbar'>
          {users.map((user, index) => (
            <motion.div key={index} whileHover={{scale:1.02}} className='flex items-center bg-white space-x-4 p-2 rounded-xl shadow-xl hover:bg-gray-200  dark:hover:bg-gray-700 select-none' onClick={() => handleAccessChat(user._id)}>
              <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center'>
                <p>{user.name[0].toUpperCase()}</p>
              </div>
              <p>{user.name}</p>
            </motion.div>
          ))}
              </div>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>   
         <CircularProgress color="inherit" />
        </Backdrop>
      </motion.div>
    </AnimatePresence>
  );
}
export default UsersAndGroups;
