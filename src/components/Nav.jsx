import React, { useEffect } from 'react'
import Link from 'next/link'
import Navsidebar from './Navsidebar';
import { setTheme } from '@/app/slice/themeSlice';
import changeTheme from '@/app/JS/chengeTheme';
import {CgProfile} from 'react-icons/cg';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {AiOutlineSearch} from 'react-icons/ai';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector,useDispatch } from 'react-redux';
import { setEmail,setLoginStatus } from '@/app/slice/authSlice';
import ProfileBar from './ProfileBar';

function Nav() {
  let [cart, setCart] = useState(false)
  let [profile, setProfile] = useState(false)
  let [searchQuery, setSearchQuery] = useState(false)
  const theme = useSelector(state=>state.theme.theme)
  let {push} = useRouter()
  let dispatch = useDispatch()


  useEffect(()=>{
    // console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)
    const getTheme = ({ matches }) => {
      if(localStorage.getItem('theme')== 'system'){
        if (matches) {
          dispatch(setTheme('dark'))
        } else {
          dispatch(setTheme('light'))
        }
      }
    }

    if(localStorage.getItem('theme') == null){
      localStorage.setItem('theme','system')
    }
    switch(localStorage.getItem('theme')){
      case 'system':
        dispatch(setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
        window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change',getTheme)
        break;
      case 'dark':
        dispatch(setTheme('dark'))
        break;
      case 'light':
        dispatch(setTheme('light'))
        break;
      default:
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change',getTheme)
        dispatch(setTheme('dark'))
    }
    
    setTimeout(()=>console.log('theme',theme),200)
    setTimeout(()=>changeTheme(document,theme),200)
    
  },[theme])

  let loggedIn = useSelector((state) => state.auth.loggedIn)
  useEffect(()=>{
    let func = async() =>{
      let res = await fetch(`/api/jwtverify`)
      let data = await res.json()
      if(res.status == 200){
      dispatch(setEmail(data))
      dispatch(setLoginStatus(true))
      }
    }
    func()
  },[])
  
  const click = () => {
    cart == false ? setCart(true) : setCart(false);
  }

  const search = () => {
    if(searchQuery){
      push(`/products/${searchQuery}`)
    }
  }
  return (
    <>
    <style jsx>
      {`
        .justify{
          justify-content: space-between;
        }
      `}
    </style>
    <div className='px-4 py-2 md:flex bg-color-second mt-0 shadow-md top-0 fixed w-[100vw] z-50' >
      <div className="logo">
        <Link href={'/'}><img src="/logo.png" width='150px' alt="" /></Link>
        
      </div>
      <div className="search flex  min-w-[300px] bg-color-back h-[30px] my-2 mx-auto rounded">
        <input type="text" name="search" className='m-0 w-[90%] rounded bg-color-back text-color-font outline-none' id="" onChange={(e)=>{setSearchQuery(e.target.value)}}/>
        <button className='p-0 m-0 bg-color-primary hover:bg-cyan-600 w-[10%] rounded-r-sm text-white' onClick={search}><AiOutlineSearch className='m-auto'/></button>
      </div>
      <div className="left absolute top-2 right-2">
        <ul className='flex'>
          <li onClick={()=>{loggedIn? '' : push('/auth/login')}} onMouseEnter={()=>{loggedIn ? setProfile(true) : ''}} onMouseLeave={()=>{loggedIn ? setProfile(false) : ''}} className='text-3xl m-2 overflow-hidden rounded-full cursor-pointer text-color-primary flex h-4 w-7 py-4 px-2 hover:text-black hover:bg-cyan-400 items-center hover:w-[8rem] duration-500'><CgProfile className='m-2 absolute translate-x-[-50%] font-bold'/><p className='ml-6 w-[8rem]'>Profile</p></li>
          <li onClick={click} className='text-3xl m-2 overflow-hidden rounded-full cursor-pointer text-color-primary flex h-4 w-7 py-4 px-2 hover:text-black hover:bg-cyan-400 items-center hover:w-[8rem] duration-500'><AiOutlineShoppingCart className='m-2  absolute translate-x-[-50%] font-bold'/><p className='ml-6 w-[8rem]'>Cart</p></li>
        </ul>
      </div>
      <ProfileBar profile={profile} setProfile={setProfile}/>
      <Navsidebar click={click} cart={cart}/>
    </div>
    </>
  )
}

export default Nav