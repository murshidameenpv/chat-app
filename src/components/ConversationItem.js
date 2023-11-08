import React from 'react'
import { useNavigate } from 'react-router-dom';

function ConversationItem({ props }) {
  const navigate = useNavigate()
  return (
    <div className='flex items-center space-x-4 p-3 bg-slate-50 my-2 rounded-xl cursor-pointer hover:bg-gray-200 select-none' onClick={()=>{navigate('chat')}} >
      <div className='bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center'>
        <p>{props.name[0].toUpperCase()}</p>
      </div>
      <div className='flex-1'>
        <p className='font-bold'>{props.name}</p>
        <p className='text-gray-500'>{props.lastMessage}</p>
      </div>
      <div className='text-right text-sm mt-2 pt-3 text-gray-500'>
        <p>{props.timeStamp}</p>
      </div>
    </div>
  )
}

export default ConversationItem;
