import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {TbDiscountCheckFilled} from 'react-icons/tb'

const success = () => {
  let product = useSelector((state) => state.checkout.product)
  let subTotal = 0
  Object.keys(product).map((v)=>{
    subTotal += product[v][1] * product[v][3]
  })

  useEffect(()=>{
    if(JSON.stringify(product) === JSON.stringify({})){
      console.log('empty')
      window.location.href = "/"
    }
  },[product])
  return (
    <div className='flex p-4'>
      <div className="hidden md:block w-[50vw]">
        <img src="/success.webp" alt="" />
      </div>
      <div>
        <div className='flex '>
          <TbDiscountCheckFilled className='text-green-500 text-4xl pt-2'/>
          <span>
            <h1 className='text-green-500 text-4xl'>Success</h1>
            Order successfully placed!
          </span>
        </div>
        <h2 className='text-3xl font-semibold'>Total:{subTotal}</h2>
        {
          product.map((val)=>{
            return(
              <div className='w-[50vw] flex pt-6 py-2 border-b-2 border-solid border-gray-300'>
                <div className='w-1/4'>
                  <img src={val[2]} alt="img" className='px-2' />
                </div>
                <div className='w-2/4'>
                  <span className='font-bold text-md'>{val[0]}</span>
                  <p className='text-sm text-color-primary'>₨{val[1]}</p>
                </div>
                <div className='w-1/4 flex justify-center items-center'>
                  <span className='m-auto my-auto text-color-font'>quantity: {val[3]}</span>
                </div>
              </div>
            )
          })
          
        }
      </div>
    </div>
  )
}

export default success