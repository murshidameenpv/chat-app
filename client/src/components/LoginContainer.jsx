import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../images/live-chat.png'
import { Button, TextField, Backdrop,CircularProgress,} from '@mui/material'
import { signInFailure, signInStart, signInSuccess,signUpStart,signUpSuccess,signUpFailure,clearError} from '../redux/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function AuthContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [data,setData] = useState({name:"",password:"",email:""})
  const { loading, error } = useSelector((state) => state.userKey)
  const handleSignInInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const handleSignUpInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSignUp = async () => {
    dispatch(signUpStart());
    try {
      console.log(data);
      const response = await axios.post('/api/signup', data);
      dispatch(signUpSuccess(response.data));
      navigate('/app/welcome')
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network error. Please check your internet connection and try again.';
      dispatch(signUpFailure(errorMessage))
    }
  }

  const handleSignIn = async () => {
    dispatch(signInStart());
    try {
      const response = await axios.post('/api/signin', data);
      console.log(data);
      dispatch(signInSuccess(response.data));
      navigate('/app/welcome')
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Network error. Please check your internet connection and try again.';
      dispatch(signInFailure(errorMessage))
    }
  }

  return (
    <div className='bg-blue-200 h-90vh w-90vw flex rounded-3xl shadow-xl'>
      <div className='flex flex-col flex-3 items-center justify-center'>
        <img src={logo} alt="Logo" className='w-10/12'/>
      </div>
      <div className='flex-7 flex flex-col items-center justify-center gap-6'> 
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>   
         <CircularProgress color="inherit" />
        </Backdrop>
        {isLogin ? (
          <>
            <p className='text-2xl py-2 my-2 text-blue-600 font-extrabold'>LOGIN TO YOUR ACCOUNT</p>
            <TextField id="outlined" label="Enter Email" variant="outlined" name="email" value={data.email}
              onChange={handleSignInInput} />
            <TextField id="outlined-password-input" label="Password" type="password" name="password" value={data.password}
              onChange={handleSignInInput} autoComplete="current-password" />
            <Button variant="outlined" onClick={handleSignIn}>Login</Button>
            <p className='text-sm'>Don't have an account? <span className='text-blue-700 cursor-pointer' onClick={() => { setIsLogin(false); dispatch(clearError()); }}>Sign Up</span></p>
            <div className='text-center'>
              {error && <p className='text-red-500 animate-blink'>{error}</p>}
            </div>
          </>
        )
          


          :
          
          
          (
          <>
            <p className='text-2xl py-2 my-2 text-blue-600 font-extrabold'>SIGN UP TO YOUR ACCOUNT</p>
            <TextField id="outlined" label="Enter User Name" variant="outlined" name="name" value={data.name} onChange={handleSignUpInput}/>
            <TextField id="outlined" label="Enter Email Address" variant="outlined" name="email" value={data.email} onChange={handleSignUpInput}/>
            <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" name="password" value={data.password} onChange={handleSignInInput}/>
            <Button variant="outlined" onClick={handleSignUp}>Sign Up</Button>
              <p className='text-sm'>Already have an account? <span className='text-blue-700 cursor-pointer' onClick={() => { setIsLogin(false); dispatch(clearError()); }}>Login</span></p>
                        <div className='text-center'>
                {error && <p className='text-red-500 animate-blink'>{error}</p>}
            </div>
              
          </>
        )}
      </div>
    </div>
  )
}
