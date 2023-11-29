import React from 'react'

function MessageOthers({ message, senderName }) {
  
const timestamp = message.createdAt; // replace with your timestamp
const date = new Date(timestamp);
const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });  // returns time in the format HH:mm

  return (
      <div className='flex items-start space-x-2 mb-2 ml-5'>
          <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center'>
              <p>{ senderName[0].toUpperCase()}</p>
          </div>
          <div className='flex flex-col'>
              <p className='font-bold'>{ senderName }</p>
              <div className='bg-gray-200 rounded-tr-none rounded-2xl px-2 py-1 max-w-xs'>
                  <p className='text-xl'>{ message.content}</p>
              </div>
              <p className='text-right text-xs text-gray-500'>{time}</p>
          </div>
      </div>
  )
}

export default MessageOthers;

