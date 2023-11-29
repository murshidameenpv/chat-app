import React from 'react'

function MessageSelf({ message }) {
    
const timestamp = message.createdAt; // replace with your timestamp
const date = new Date(timestamp);
const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });  // returns time in the format HH:mm

  return (
      <div className='flex flex-col items-end mb-2 mr-5'>
          <div className='bg-green-500 text-white rounded-bl-none rounded-lg px-2 py-1 max-w-xs'>
              <p className='text-xl'>{message.content}</p>
          </div>
          <p className='text-right text-xs text-gray-500'>{time}</p>
         
      </div>
  )
}

export default MessageSelf;
    