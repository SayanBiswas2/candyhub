import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch} from 'react-redux';
import { useRouter } from 'next/router'
import { setLoginStatus } from '@/app/slice/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function loginin() {
  let [email,setEmail] =useState('')
  let [pass,setPass] =useState('')
  let [wronwPass,setWronwPass] =useState(false)
  let [userNotFound,setUserNotFound] =useState(false)
  let {push} = useRouter()
  let dispatch =useDispatch()
  let router = useRouter()
  const loggedIn = useSelector((state) => state.auth.loggedIn)

  useEffect(()=>{
    if(loggedIn){
      router.push('/')
    }
  },[loggedIn])

  const login = async()=>{
    let res = await fetch(`/api/login`,{
      method:'post',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email:email,
        pass:pass
      })
    })
    let data = await  res.json()

    if(res.status == 200){
      dispatch(setLoginStatus(true))
      window.history.back()
    }else if(res.status ==404){
      setUserNotFound(true)
      setWronwPass(false)
    }else if(res.status ==401){
      setUserNotFound(false)
      setWronwPass(true)
    }
  }

  const forgetPassword = () => {
    if(email == '' || email.indexOf('@') == -1){
      toast.error("Please enter a valid email in email field")
    }else{
      axios.post('/api/changepass',{
        action:"token",
        email:email
      }).then(res=>{
        if(res.status == 200){
          toast.success("We have sent you a mail for changing password")
        }
      }).catch(err=>{
          toast.error('No user found with this email')
      })
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 text-color-font">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/candyhub.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-color-font">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-color-font">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={e=>{setEmail(e.target.value)}}
                  className="block w-full rounded-md border-0 py-1.5 text-color-font shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-color-back focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
                <p className='text-sm text-red-600'>{userNotFound?'User not found':''}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-color-font">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-cyan-600 hover:text-cyan-500" onClick={forgetPassword}>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={e=>{setPass(e.target.value)}}
                  className="block w-full rounded-md border-0 py-1.5 text-color-font shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 bg-color-back sm:text-sm sm:leading-6"
                />
                <p className='text-sm text-red-600'>{wronwPass?'Incorrect Password':''}</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                onClick={login}
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-color-primary">
            Don't have a account?{' '}
            <Link href="/auth/signup" className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500">
              Create one
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default loginin