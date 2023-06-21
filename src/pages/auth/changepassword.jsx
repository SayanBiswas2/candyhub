import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '@/app/slice/authSlice';

const changepassword = () => {
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    let router = useRouter()
    let {push} = useRouter()
    const {token} = router.query
    const dispatch = useDispatch()

    useEffect(() => {
      if(token !== undefined){
      axios.get(`/api/changepass?token=${token}`).then(res=>{
        console.log('done')
      }).catch(err=>{
          push('/')
      })
    }
    }, [router])
    

    const submit = () => {
      if(pass == confirmPass){
        axios.post("/api/changepass",{
          action:"chenge",
          token: token,
          pass: pass
        }).then(res=>{
          if(res.status == 200){
            dispatch(setLoginStatus(true))
            push('/')
          }
        })
      }else{
        toast.error('not same')
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Change your Pasword
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex items-cnter justify-center flex-col">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6">
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="password"
                  value={pass}
                  required
                  onChange={e=>{setPass(e.target.value)}}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-color-back ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={confirmPass}
                  required
                  onChange={e=>{setConfirmPass(e.target.value)}}
                  className="block w-full rounded-md border-0 py-1.5 text-color-font shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 bg-color-back sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <input type="button" value="Submit" className='btn mx-auto p-1 px-3 cursor-pointer bg-cyan-400 m-2  rounded text-xl' onClick={submit}/>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default changepassword