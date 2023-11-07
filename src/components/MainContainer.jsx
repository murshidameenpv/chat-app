import React from 'react'
import Sidebar from './Sidebar'
import Welcome from './Welcome'
// import ChatArea from './ChatArea'

export default function MainContainer() {
  return (
      <div className='bg-blue-200 h-90vh w-90vw flex rounded-3xl shadow-xl'>
      <Sidebar />
      <Welcome/>
      {/* <ChatArea /> */}
      </div>
  )
}
