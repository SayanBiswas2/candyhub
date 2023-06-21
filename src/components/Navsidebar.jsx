import React, { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { setCart,increment, decrement, remove, saveLatter, moveToCart } from '@/app/slice/cartReducer'
import { setProduct } from '@/app/slice/checkoutReducer';
import {RxCross2} from 'react-icons/rx';
import {FiArrowDownRight, FiArrowUpLeft} from 'react-icons/fi';
import {AiFillMinusCircle, AiFillPlusCircle, AiOutlineDelete} from 'react-icons/ai';
import Link from 'next/link';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function Navsidebar({click,cart}) {
  let subTotal = 0;
  const count = useSelector((state) => state.cart.value)
  const dispatch = useDispatch()
  let loggdin =useSelector((state) => state.auth.loggedIn)
  let {push} = useRouter()

  useEffect(()=>{
    if(loggdin){
      axios.get("/api/getCart/route").then(res=>{
        console.log(res)
        if(res.status == 200){
          // dispatch(setCart(res.data))
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },[loggdin])

  const postCart = async(data) => {
    return await axios.post("/api/getcart",data).then(res=>{return res})
  }

  const incrementAction = async (data) => {
    if(loggdin){
      let res = await postCart({
        "action":"incriment",
        "name":data
      })
      if(res.status == 200){
        dispatch(increment(data))
      }
    }else{
      dispatch(increment(data))
    }
  }
  const decrementAction = async (data) => {
    if(loggdin){
      let res = await postCart({
        "action":"decriment",
        "name":data
      })
      if(res.status == 200){
        dispatch(decrement(data))
      }
    }else{
      dispatch(decrement(data))
    }
  }

  const removeAction = async (data) => {
    if(loggdin){
      let res = await postCart({
        "action":"remove",
        "name":data
      })
      if(res.status == 200){
        dispatch(remove(data))
      }
    }else{
      dispatch(remove(data))
    }
  }
  const letterCartAction = async (data) => {
    if(loggdin){
      let res = await postCart({
        "action":"letterCart",
        "name":data
      })
      if(res.status == 200){
        dispatch(saveLatter(data))
      }
    }else{
      dispatch(saveLatter(data))
    }
  }

  const moveToCartAction = async (data) => {
    if(loggdin){
      let res = await postCart({
        "action":"moveToCart",
        "name":data
      })
      if(res.status == 200){
        dispatch(moveToCart(data))
      }
    }else{
      dispatch(moveToCart(data))
    }
  }
  
  const buyNow = (data) => {
    switch(loggdin){
      case true:
        dispatch(setProduct(data))
        push('/checkout')
        break;
      case false:
        push('/auth/login')
        break;
    }
  }
  return (
    <div className={`sidebar p-2 pt-6 absolute top-0 shadow-xl bg-color-back text-color-font w-[100vw] sm:w-[35vw] h-[100vh] transition-all duration-300 z-40 overflow-y-scroll ${cart == true ? 'right-0' : "right-[-100vw] sm:right-[-35vw]" }`}>
        <div className={`flex h-4 sticky w-[100%] text-xl `} onClick={click}><RxCross2 className='absolute right-2'/></div>
        <div className=''>
          <h2 className='text-center text-xl font-bold'>Your Cart</h2>
          {
            Object.keys(count['currentCart']).length == 0 && <div className='flex flex-col justify-center items-center border-b-2 border-solid border-gray-500'>
              <img src="/shrugging.png" width={100} alt="shrugging" />
              <h3>there is no Item</h3>
            </div>
          }
          {
            Object.keys(count['currentCart']).map((key)=>{
              subTotal += count['currentCart'][key][0] * count['currentCart'][key][2]
              return(
                <div className='flex flex-col my-3 mx-2 p-2 bg-color-second rounded hover:shadow-md hover:my-4 transition-all' key={"count['currentcart'][key]"}>
                  <div className='flex'>
                  <div className="flex m-2 w-1/6 justify-center text-center">
                    <img src={count['currentCart'][key][1]} alt="" />
                  </div>
                  <div className="w-2/4 text-start">
                    <span>{key}</span>
                    <p className='text-sm text-gray-400'>Rs{count['currentCart'][key][0]}</p>
                  </div>
                  <div className="w-1/4 text-end flex items-center justify-center">
                    <AiFillMinusCircle className='text-cyan-500 hover:text-cyan-600' onClick={()=>{decrementAction(key)}}/><span className='mx-1'>{count['currentCart'][key][2]}</span><AiFillPlusCircle className='text-cyan-500 hover:text-cyan-600' onClick={()=>{incrementAction(key)}}/>
                  </div>
                  </div>
                  
                  <div className='flex justify-between'>
                    <button className="flex mx-auto text-white bg-cyan-500 border-0 py-1 px-4 focus:outline-none hover:bg-cyan-600 rounded text-sm justify-center items-center" onClick={()=>{letterCartAction(key)}}>Save latter<FiArrowDownRight/></button>
                    <button className="flex mx-auto text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-sm justify-center items-center" onClick={() => {removeAction(key)}}><AiOutlineDelete/>Remove</button>
                  </div>
                </div>
              )
            })
          }
          {
            Object.keys(count['letterCart']).length !== 0 && <h2 className='text-center text-xl font-bold'>Saved latter Cart</h2>
          }
          
          {
              Object.keys(count['letterCart']).map((key)=>{
              console.log("key",count['letterCart'][key])
              // subTotal += count['currentCart'][key][0] * count['currentCart'][key][2]
              return(
                <div className='flex flex-col my-3 p-2 hover:shadow-md hover:my-4 transition-all' key={"count['currentcart'][key]"}>
                  <div className='flex'>
                    <div className="flex m-2 w-1/4 justify-center text-center">
                      <img src={count['letterCart'][key][1]} alt="" />
                    </div>
                    <div className="w-2/4 text-start">
                      <span>{key}</span>
                      <p className='text-sm text-gray-400'>Rs{count['letterCart'][key][0]}</p>
                    </div>
                    <button className="flex mx-auto text-white bg-cyan-500 border-0 py-1 px-4 focus:outline-none hover:bg-cyan-600 rounded text-sm my-auto justify-center items-center" onClick={()=>{moveToCartAction(key)}}><FiArrowUpLeft/>move</button>
                  </div>
                </div>
              )
            })
          }
          <div className='flex w-full sm:w-[35%] shadow-inner p-3 fixed bg-color-second text-color-font bottom-0'>
            <div className='w-2/4'><span>Totle: Rs{subTotal}</span></div>
            <div className="flex mx-auto text-white bg-cyan-500 border-0 py-1 px-4 focus:outline-none hover:bg-cyan-600 rounded text-sm" onClick={()=>{buyNow(count['currentCart']);click()}}>Place Order</div>
          </div>
        </div>
      </div>
  )
}

export default Navsidebar