import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion,AnimatePresence } from 'framer-motion';
function CreateGroups() {
    const currentTheme = useSelector((state)=>state.themeKey)
    return (
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, scale: 0 }}
             animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} transition={{ease:"anticipate",duration:"0.3"}} className={`flex flex-7 flex-col border justify-center ${currentTheme ? 'dark':""}`}>
          <div className='p-1 m-3 rounded-xl bg-white flex dark:bg-slate-500 justify-between shadow-lg'>
              <div className='flex items-center mx-2 w-full'>
                 <input type="text" placeholder='Enter Group Name' className='border-none outline-none text-lg flex-grow m-3 dark:bg-slate-500'/>
                 <IconButton>
                  <DoneIcon/>
                  </IconButton>
              </div>
          </div>
      </motion.div>     
      </AnimatePresence>

  )
}

export default CreateGroups