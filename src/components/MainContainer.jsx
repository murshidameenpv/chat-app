import React from 'react'
import Sidebar from './Sidebar'
import WorkArea from './WorkArea'

export default function MainContainer() {
  return (
      <div className='bg-slate-400 h-90vh w-90vw'>
          <Sidebar />
          <WorkArea/>
      </div>
  )
}
