import logo from '../images/live-chat.png'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

function Groups() {
  return (
      <div className={`border flex flex-col flex-7`}>
          <div className='p-2 mt-3 mx-3 rounded-2xl bg-slate-50 dark:bg-slate-500 flex items-center shadow-lg  text-center'>
              <img src={logo} alt="Logo" className='w-10 h-10'/>
              <p className='text-lg font-bold ml-2 pl-2'>All Groups</p>
          </div>
          <div className='p-3 m-3 rounded-2xl bg-white dark:bg-slate-500 flex justify-between items-center shadow-xl'>
              <IconButton>
                  <SearchIcon/>
              </IconButton>
              <input type="text" placeholder='Search' className='border-none outline-none text-lg flex-grow ml-3 dark:bg-slate-500'/>
          </div>
          <div className='p-3 m-4 rounded-2xl flex flex-col space-y-4 overflow-y-auto no-scrollbar'>
              <div className='flex items-center bg-white space-x-4 p-2 rounded-xl shadow-xl hover:bg-gray-200  dark:hover:bg-gray-700 select-none'>
                  <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center'>
                      <p>T</p>
                  </div>
                  <p>Tim Cook</p>
              </div>
              <div className='flex items-center bg-white space-x-4 p-2 rounded-xl shadow-xl hover:bg-gray-200  dark:hover:bg-gray-700 select-none'>
                  <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center'>
                      <p>B</p>
                  </div>
                  <p>Bjong</p>
              </div>
          </div>
      </div>
  )
}

export default Groups
