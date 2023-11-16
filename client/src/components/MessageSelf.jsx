import React from 'react'

function MessageSelf() {
    var props = {name:"You",message:"Hello guys",timeStamp:"12.30 AM"}
  return (
      <div className='flex flex-col items-end mb-2 mr-5'>
          <div className='bg-green-500 text-white rounded-bl-none rounded-lg px-2 py-1 max-w-xs'>
              <p>{props.message}</p>
          </div>
          <p className='text-right text-xs text-gray-500'>{props.timeStamp}</p>
         
      </div>
  )
}

export default MessageSelf;
