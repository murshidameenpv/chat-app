import React, { useContext } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { DarkModeContext } from './DarkModeContext'
export default function MainContainer() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext)
  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className=' bg-blue-200 dark:bg-slate-300 h-90vh w-90vw flex rounded-3xl shadow-xl'>
         <Sidebar />
      <Outlet />
      </div>
     
    </div>
  )
}