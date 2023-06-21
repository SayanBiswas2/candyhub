import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Order from '@/components/Order'
import { useEffect } from 'react'

const order = () => {
  const [product, setProduct] = useState('')
  const [productExpand, setProductExpand] = useState()
  useEffect(()=>{
    axios.get("/api/getUserOrder").then(res=>{
      setProduct(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <div className='w-[90vw] sm:w-[60vw] ml-[5vw] sm:ml-[20vw] flex flex-col justify-center text-color-font'>
      <h1 className='text-3xl ml-4 mb-4'>Your Orders</h1>
      <div>
        {
          [...product].map((val,ind)=>{
            return(
              <div className='flex justify-between flex-col items-center p-2 border rounded m-4 bg-color-second px-4 cursor-pointer' onClick={()=>{setProductExpand(productExpand == ind ? -1 : ind)}} key={val[0]}>
                
                {productExpand == ind ? <Order id={val[0]}/> : <div className='flex justify-between items-center w-full'>
                  <div>
                    <h2>{val[1]} {val[3] == 1? '' : `+${val[3]-1} items`}</h2>
                    <h4 className='font-light text-sm'>Id: {val[0]}</h4>
                  </div>
                  <div>
                    <img src={val[2]} width={80} alt="product image" />
                  </div>
                </div>}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default order