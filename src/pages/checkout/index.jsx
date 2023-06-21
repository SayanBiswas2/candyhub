import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DeliveryAddres from './deliveryAddres'
import Summary from './summary'
import Payment from './payment'

function checkout() {
  let [page,setPage] = useState('dellevery')
  const count = useSelector((state) => state.checkout.address)
  const product = useSelector((state) => state.checkout.product)
  return (
    <>
    <section className="text-color-primary body-font ">
  <div className="container px-2 mx-auto flex flex-col">
    <div className="flex mx-auto w-full flex-wrap mb-10 justify-center">
      <div className={`sm:px-2 py-1 mx-2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none tracking-wider rounded-t cursor-pointer transition-all ${ page == 'dellevery' ? 'border-cyan-500 text-cyan-500 bg-gray-100' : 'border-gray-200 hover:text-color-font'}`} onClick={()=>{setPage('dellevery')}}>
        Dellevery
      </div>
      <div className={`sm:px-2 py-1 mx-2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none  tracking-wider cursor-pointer transition-all ${ page == 'summary' ? 'border-cyan-500 text-cyan-500 bg-gray-100' : 'border-gray-200 hover:text-color-font'}`} onClick={()=>{count.name ? setPage('summary') : ''}}>
        summary
      </div>
      <div className={`sm:px-2 py-1 mx-2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none tracking-wider cursor-pointer transition-all ${ page == 'payment' ? 'border-cyan-500 text-cyan-500 bg-gray-100' : 'border-gray-200 hover:text-color-font'}`} >
        payment
      </div>
    </div>
    {
      page == 'dellevery' && <DeliveryAddres setPage={(v)=>{setPage(v)}}/>
      
    }
    {
      page == 'summary' && <Summary setPage={(v)=>{setPage(v)}}/>
    }
    {
      page == 'payment' && <Payment address={count} product={product}/>
    }
  </div>
</section>
</>
  )
}

export default checkout