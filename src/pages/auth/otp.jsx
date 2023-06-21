import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { setLoginStatus } from '@/app/slice/authSlice';
import axios from 'axios';


const otp = () => {
    const [otp, setOtp] = useState('');
    let email = useSelector((state)=>state.auth.email)
    let dispatch = useDispatch()
    let {push} = useRouter()

    useEffect(()=>{
        if(email==''){
            push('/auth/signup')
        }
    },[])


    useEffect(()=>{
        if(otp.toString().length == 6){
            let func= async()=> {
                let res = await axios.post(`/api/otpVarification`,{
                      "type":"signup",
                      "otp":otp,
                      "email":email.value
                    })
                //let data = await res.json()
                if(res.status == 200){
                    dispatch(setLoginStatus(true))
                    window.history.go(-3)
                }
            }
            func()
        }
    },[otp])

    const resand =async()=>{
        let res = await fetch(`/api/otpVarification`,{
            'method':'post',
            'headers':{
              'Content-Type': 'application/json'
            },
            'body':JSON.stringify({
              "type":"signupResand",
              "email":email.value
            })
        })
        let data = await res.json()
        if(res.status ==202){
            toast.success('we sent a email to your account')
        }
    }
    
    return (
        <>
        {/* <style jsx>{`
            input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {
                display: none;
            }
            input{
                color: transparent;
                text-shadow: 0 0 0 black;
            }
            input:focus{
                outline: none;
            }
        `}</style> */}
        <div className='max-w-sm mx-auto md:max-w-lg text-colo-font'>
            <div className="w-full">
                <div className="bg-color-back h-64 py-3 rounded text-center">
                    <h1 className="text-2xl font-bold text-cyan-500">OTP Verification</h1>
                    <div className="flex flex-col mt-4 text-color-font">
                        <span>Enter the OTP you received at</span>
                        <span className="font-bold">{email.value}</span>
                    </div>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>&nbsp;</span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={'w-full flex justify-center items-center bg-color-back text-color-font'}
                        inputStyle={'m-2 w-10 h-10 text-4xl border rounded text-center form-control bg-color-back'}
                        inputType='text'
                    />
                    <div className="flex justify-center text-center mt-5">
                          <a className="flex items-center text-cyan-700 hover:text-cyan-900 cursor-pointer"><span className="font-bold" onClick={resand}>Resend OTP</span><i className='bx bx-caret-right ml-1'></i></a>
                      </div>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default otp