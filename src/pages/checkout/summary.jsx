import React from 'react'
import { useSelector } from 'react-redux'

const Summary = ({setPage}) => {
  
  let subTotal = 0;
  let product = useSelector((state) => state.checkout.product)
  console.log(product)
  
  return (
    <div className='flex flex-col mx-auto justify-center items-center md:w-[40vw] w-[80vw]'>
      <h2 className='font-bold text-3xl mb-4'>Order Summary</h2>
      <div className='flex flex-col  mb-4'>
        {
          product.map((val,ind)=>{
            subTotal += val[1] * val[3]
            return(
              <div className='w-full flex border-b-2 border-solid border-gray-300'>
                <div className='w-1/4'>
                  <img src={val[2]} alt="img" />
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
      <div className='w-full shadow-inner flex p-3'>
        <div className='w-2/4'><span>Totle: Rs{subTotal}</span></div>
        <div className='flex justify-end items-end w-1/2'>
          <button className="flex text-white bg-cyan-500 border-0 py-1 px-4 focus:outline-none hover:bg-cyan-600 rounded text-sm" onClick={()=>{setPage('payment')}}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Summary