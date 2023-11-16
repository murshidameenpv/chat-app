import React from 'react'

function MessageOthers() {
    var props = {name:"Ajay",message:"lorLorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.e",timeStamp:"11.30 PM"}
  return (
      <div className='flex items-start space-x-2 mb-2 ml-5'>
          <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center'>
              <p>{props.name[0].toUpperCase()}</p>
          </div>
          <div className='flex flex-col'>
              <p className='font-bold'>{props.name}</p>
              <div className='bg-gray-200 rounded-tr-none rounded-2xl px-2 py-1 max-w-xs'>
                  <p>{props.message}</p>
              </div>
              <p className='text-right text-xs text-gray-500'>{props.timeStamp}</p>
          </div>
      </div>
  )
}

export default MessageOthers;
