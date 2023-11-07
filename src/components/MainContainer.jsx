import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'

export default function MainContainer() {
  return (
      <div className='bg-blue-200 h-90vh w-90vw flex rounded-3xl'>
      <Sidebar />
      <ChatArea />
      </div>
  )
}
