import React from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';

const Payment = ({address,product}) => {
  let {push} = useRouter()
  const order = async() => {
    let amount =0;
    for(let i = 0;i< product.length;i++){
      amount += product[i][1] * product[i][3];
      console.log(amount)
    }
    axios.post("/api/order",{
      "product":product,
      "address":address,
      "amount":amount,
    }).then(res=> {
      if(res.status == 200){
        push('/order/success')
      }
    })
  }
  return (
    <div className='w-full flex justify-center m-6'>
      <h1 className='cursor-pointer text-white bg-color-primary py-3 px-1 rounded' onClick={order}>Pay</h1>
    </div>
  )
}

export default Payment