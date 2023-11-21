import React, { useState } from 'react'
import logo from '../images/live-chat.png'
import { Button, TextField } from '@mui/material'

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='bg-blue-200 h-90vh w-90vw flex rounded-3xl shadow-xl'>
      <div className='flex flex-col flex-3 items-center justify-center'>
        <img src={logo} alt="Logo" className='w-10/12'/>
      </div>
      <div className='flex-7 flex flex-col items-center justify-center gap-6'>   
        {isLogin ? (
          <>
            <p className='text-2xl py-2 my-2 text-blue-600 font-extrabold'>LOGIN TO YOUR ACCOUNT</p>
            <TextField id="outlined" label="Enter User Name" variant="outlined"/>
            <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password"/>
            <Button variant="outlined">Login</Button>
            <p className='text-sm'>Don't have an account? <span className='text-blue-700 cursor-pointer' onClick={() => setIsLogin(false)}>Sign Up</span></p>
          </>
        ) : (
          <>
            <p className='text-2xl py-2 my-2 text-blue-600 font-extrabold'>SIGN UP TO YOUR ACCOUNT</p>
            <TextField id="outlined" label="Enter User Name" variant="outlined"/>
            <TextField id="outlined" label="Enter Email Address" variant="outlined"/>
            <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password"/>
            <Button variant="outlined">Sign Up</Button>
            <p className='text-sm'>Already have an account? <span className='text-blue-700 cursor-pointer' onClick={() => setIsLogin(true)}>Login</span></p>
          </>
        )}
      </div>
    </div>
  )
}
