import React from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router';
import { setEmail } from '@/app/slice/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios';

function signup() {
  let [name,setName] =useState('')
  let [userEmail,setUserEmail] =useState('')
  let [pass,setPass] =useState('')

  let {push} = useRouter()
  let dispatch = useDispatch()

  const loggedIn = useSelector((state) => state.auth.loggedIn)

  useEffect(()=>{
    if(loggedIn){
      push('/')
    }
  },[loggedIn])

  const submit =async()=>{
    let res = await axios.post(`/api/signup`,{
        "name":name,
        "email":userEmail,
        "pass":pass
      })
    //let data = await res.json()
    dispatch(setEmail(email))

    if(res.status == 400){
      toast.error("User with this email allrady exist")
    }
    else if(res.status == 202){
      push(`/auth/otp`)
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/candyhub.png"
            alt="Candyhub"
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-color-font">
            Create a account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-color-font">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={(e)=>{setName(e.target.value)}}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-color-font bg-color-back shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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
                  onChange={(e)=>{setUserEmail(e.target.value)}}
                  className="block w-full rounded-md border-0 py-1.5 text-color-font bg-color-back shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-color-font">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={pass}
                  onChange={(e)=>{setPass(e.target.value)}}
                  className="block w-full rounded-md border-0 py-1.5 text-color-font shadow-sm bg-color-back ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={submit}
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Sign up
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-color-primary">
            Allrady have a account?{' '}
            <Link href="/login" className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500">
              login to your account
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default signup