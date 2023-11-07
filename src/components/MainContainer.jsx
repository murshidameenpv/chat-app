import React from 'react'
import Sidebar from './Sidebar'
import CreateGroups from './CreateGroups'
import Welcome from './Welcome'
import ChatArea from './ChatArea'
import UsersAndGroups from './UsersAndGroups'

export default function MainContainer() {
  return (
      <div className='bg-blue-200 h-90vh w-90vw flex rounded-3xl shadow-xl'>
      <Sidebar />
      {/* <Welcome/> */}
      {/* <CreateGroups/> */}
      {/* <ChatArea /> */}
      <UsersAndGroups/>
      </div>
  )
}
