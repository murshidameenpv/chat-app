  import DoneIcon from '@mui/icons-material/Done';
  import { IconButton, Button,Dialog, DialogActions, DialogContent,
          DialogContentText,DialogTitle,} from '@mui/material';
  import { useDispatch, useSelector } from 'react-redux';
  import { motion,AnimatePresence } from 'framer-motion';
  import { useState } from 'react';
  import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshSidebarFun } from '../redux/refreshSideBarSlice.js';
  

  function CreateGroups() {
    const currentTheme = useSelector((state) => state.themeKey);
    const refreshSideBar = useSelector((state)=>state.sideBarKey)
    const [groupName, setGroupName] = useState("");
    const [open, setOpen] =useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const CreateGroups = async () => {
      try {
        await axios.post('/api/chat/createGroup', {
          name: groupName,
          users: ["647d94aea97e40a17278c7e5","647d999e4c3dd7ca9a2e6543"],
        });
        navigate('/app/groups')
        dispatch(refreshSidebarFun())
      } catch (error) {
        
      console.error(error);
    }
    }
      return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, scale: 0 }}
          animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} transition={{ease:"anticipate",duration:"0.3"}} className={`flex flex-7 flex-col border justify-center ${currentTheme ? 'dark':""}`}>
        <h1 className='text-center text-2xl font-bold text-slate-700 p-4'>Create New Group</h1>
        <div className='p-1 m-3 rounded-xl bg-white flex dark:bg-slate-500 justify-between shadow-lg'>
            <Dialog open={open} onClose={handleClose}
          aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Do you want to create a Group Named " +groupName +" ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will create a create group in which you will be the admin and
            other will be able to join this group.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={() => { CreateGroups(); handleClose();}} autoFocus>Agree</Button>
        </DialogActions>
      </Dialog>
        <div className='flex items-center mx-2 w-full'>
          <input type="text" placeholder='Enter Group Name' className='border-none outline-none text-lg flex-grow m-3 dark:bg-slate-500' onChange={(e)=> setGroupName(e.target.value)}/>
        <IconButton  disabled={!groupName} onClick={() => {handleClickOpen()}}>
              <DoneIcon/>
          </IconButton>
            </div>
        </div>
    </motion.div>     
    </AnimatePresence>
  ) 
  }

  export default CreateGroups