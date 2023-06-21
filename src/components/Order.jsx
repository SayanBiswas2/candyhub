import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'

const order = ({id}) => {
    const [product, setProduct] = useState([])
    const [address, setaddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [status, setStatus] = useState('')
    const [amount, setAmount] = useState('')

    useEffect(()=>{
        axios.post('/api/getUserOrder',{
            "id":id
        }).then(res=>{
            console.log(res.data)
            setProduct(res.data.products)
            let addr = res.data.address
            setaddress(`${addr.locality}, ${addr.district}, ${addr.state} -${addr.pin}`)
            setMobile(addr.mobile)
            setStatus(res.data.status);
            setAmount(res.data.amount)
        }).catch(err=>{
            console.log(err)
        })
    },[id])

    useEffect(()=>{
        switch(status){
            case 'panding':
                setStatus(``)
        }
    },[status])
    
    const cancel = () => {
        let c= confirm("Arr you sure you want to cancle the order")
        if(c){
            axios.post('/api/cancelOrder',{
                "id":id
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
  return (
    <div className='w-full text-color-font'>
        <h2>order id: <span className='font-light'>{id}</span></h2>
        <div className='w-full'>
        {[...product].map(val=>{
            return(
                <div className='w-full flex justify-between my-1'>
                    <h2>{val[0]}</h2>
                    <img src={val[2]} width={80} alt="product img" />
                </div>
            )
        })}
        </div>
        <div className='w-full flex justify-between '>
            <div className='flex flex-col justify-between'>
                <h2>Status: <span className='font-light'>{status}</span></h2>
                <p className='font-light'>{address}</p>
            </div>
            <div>
                <h3>Amount: <span className='font-light'>{amount}</span></h3>
                <input type="button" value="Cancel" disabled={status == 'Canceled' ? true : false} className={`p-1 rounded px-4 ${status == 'Canceled' ? 'bg-red-200' : 'bg-red-500'} text-white`} onClick={cancel} />
            </div>
        </div>
        
    </div>
  )
}

export default React.memo(order)