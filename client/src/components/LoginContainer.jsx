import React from 'react'
import logo from '../images/live-chat.png'
import { Button, TextField } from '@mui/material'

export default function LoginContainer() {
  return (
      <div className='bg-blue-200 h-90vh w-90vw flex rounded-3xl shadow-xl'>
          <div className='flex flex-col flex-3 items-center justify-center'>
             <img src={logo} alt="Logo" className='w-10/12'/>
          </div>
          <div className='flex-7 flex flex-col items-center justify-center gap-6'>   
              <p className='text-2xl py-2 my-2 text-blue-600 font-extrabold'>LOGIN TO YOUR ACCOUNT</p>
              <TextField id="outlined" label="Enter User Name" variant="outlined"/>
             <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password"/>
              <Button variant="outlined">Login</Button>
              </div>
      </div>
  )
}
