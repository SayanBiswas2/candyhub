import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { setTheme } from '@/app/slice/themeSlice'
import { setEmail } from '@/app/slice/authSlice'
import { setLoginStatus } from '@/app/slice/authSlice'
import chengeTheme from '@/app/JS/chengeTheme'
import {MdOutlineAccountCircle} from 'react-icons/md'
import {BsFillBox2Fill} from 'react-icons/bs'
import {BiLogOutCircle} from 'react-icons/bi'
import {RxDotFilled} from 'react-icons/rx'

const ProfileBar = ({profile,setProfile}) => {
    const dispatch = useDispatch()
    const theme = useSelector(state=>{state.theme.theme})
    const {push}= useRouter()
    let loggedIn = useSelector((state) => state.auth.loggedIn)
    const logout = () => {
    axios.post('/api/logout',{
        action:true
    }).then(res=>{
        if(res.status == 200){
            dispatch(setEmail(''))
            dispatch(setLoginStatus(false))
            push('/')
        }
    })
    }

    // useEffect(()=>{
    //     chengeTheme(document,theme)
    //   },[theme])
    return (
        <div className={`w-[50vw] md:w-[20vw] border p-6 pb-2 absolute top-10 right-4 bg-color-second text-color-font mt-6 duration-1000 rounded-lg ${profile? 'block' : 'hidden'}`} onMouseEnter={()=>{loggedIn ? setProfile(true) : ''}} onMouseLeave={()=>{loggedIn ? setProfile(false) : ''}}>
            <div className={`rotate-45 border-l border-t w-4 h-4 absolute right-12 top-[-0.50rem] bg-color-second duration-500 `}></div>
            <div className='w-[50vw] md:w-[20vw] absolute top-[-1rem] h-4'></div>

            <h2 className='text-xl flex items-center justify-start text-cyan-500 my-2 cursor-pointer' onClick={()=>{setProfile(false);push('/account')}}><MdOutlineAccountCircle/><span className='ml-2 text-lg'>My Account</span></h2>

            <h2 className='text-lg flex items-center justify-start text-cyan-500 my-2 cursor-pointer' onClick={()=>push('/account/orders')}><BsFillBox2Fill/><span className='ml-2 text-lg'>My Order</span></h2>

            <div className='text-lg flex items-center justify-between text-color-primary cursor-pointer'>
                <span className='ml-2 text-lg'>Theme</span>
                <select name="Theme" id="theme" className={`bg-color-second outline-none rounded-sm py-2 duration-500`} onChange={(e)=>{dispatch(setTheme(e.target.value));localStorage.setItem('theme',e.target.value)}} value={theme}>
                    <option value="dark">dark</option>
                    <option value="light">light</option>
                    <option value="system">System</option>
                </select>
            </div>

            <h2 className='text-lg flex items-center justify-start text-red-500 my-2 cursor-pointer'><BiLogOutCircle/><span className='ml-2 text-lg' onClick={()=>{setProfile(false);logout()}}>Sign Out</span></h2>
            <hr />
            <span className='text-sm text-gray-400'><Link href={'/terms'}>Terms&nbsp;&&nbsp;conditions</Link>&nbsp;&#x2022;&nbsp;<Link href={'/contact'}>feedback</Link></span>
        </div>
    )
}

export default ProfileBar