import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
export default function MainContainer() {
  const currentTheme = useSelector((state) => state.themeKey);
  return (
    <div className={`${currentTheme ? 'dark' : ''}`}>
      <div className=' bg-blue-200 dark:bg-slate-300 h-90vh w-90vw flex rounded-3xl shadow-xl'>
         <Sidebar />
      <Outlet />
      </div>
     
    </div>
  )
}