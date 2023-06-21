import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import {Chart,MobileChart} from '@/dashboardComponents/chart'
import {FaShoppingCart} from 'react-icons/fa'
import {HiCurrencyRupee} from 'react-icons/hi'
import {AiFillMessage} from 'react-icons/ai'
import {IoIosArrowForward} from 'react-icons/io'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAdmin, setDetails, setPermission } from '@/app/slice/adminSlice'

const index = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [width, setWidth] = useState(0)
  const [orders, setOrders] = useState([])
  const [totalAmount, setTotalAmount] = useState('')

  let admin = useSelector(state=>state.admin.admin)
  const id = useSelector(state=>state.admin.details.id)

  useEffect(()=>{
    const id = router.query.id
    const func = async() => {
      axios.post("/api/admin/login",{
        id:router.query.id
      }).then(res=>{
        console.log(res)
        // router.push(`/dashboard/login?id=${router.query.id}`)
        let pass = prompt("Enter your password")
        axios.patch("/api/admin/login",{
          id:id,
          pass:pass
        }).then(res=>{
          if(res.status == 200){
            dispatch(setAdmin(true))
            dispatch(setDetails(res.data.details))
            dispatch(setPermission(res.data.permission))
            router.push("/dashboard")
          }
        }).catch(err=>{
          router.push("/")
        })
      }).catch(err=>{
        console.log(undefined)
      })

      

      if(id == undefined && admin==false){
        router.push("/")
      }
    }
    if(!admin){
    func()
    }
  },[router])

  useEffect(()=>{
    axios.post("/api/admin/totalSell",{
      id:id
    }).then(res=>{
      console.log(res.data)
      if(res.status ==200){
        setTotalAmount(res.data)
      }
    }).catch(err=>{
      console.log(err)
    })
  },[id])

  const getOrder = () => {
    axios.post("/api/admin/order",{
      'from':0
    }).then(res=>{
      setOrders(res.data)
    }).catch(err=>{
      setOrders(err.response.data)
      console.log(err)
    })
  }
  useEffect(()=>{
    setWidth(window.innerWidth)
  },[])
  useEffect(()=>getOrder,[])
  return (
    <>
    <div className={`w-full ${admin ? 'flex' : 'hidden'} flex-wrap justify-between p-4 `}>
      <div className='w-full h-[35vh] md:w-[80%] md:h-[80vh] rounded bg-color-second text-color-font'>
        {width >= 468 ? <Chart/> : <MobileChart/>}
      </div>
        <div className='w-[100%] h-[10vh] md:h-[80vh] md:w-[18%] mt-2 md:mt-0 flex justify-between md:flex-col rounded'>
          <Link href={'/dashboard/orders'} className='h-[100%] md:h-[30%] w-[32%] md:w-full bg-color-second rounded p-2 md:mr-0 flex flex-col items-center justify-center text-color-primary text-2xl cursor-pointer'>
            <FaShoppingCart/>
            <h3 className='mt-1 text-sm'>Orders</h3>
          </Link>
          <div className='h-[100%] md:h-[30%] w-[32%] md:w-full bg-color-second rounded p-2 md:m-0 flex flex-col items-center justify-center text-color-primary text-2xl cursor-pointer'>
            <HiCurrencyRupee/>
            <h3 className='mt-1 text-sm'>Sells</h3>
            <span>{totalAmount}</span>
          </div>
          <Link href={'/dashboard/feedback'} className='h-[100%] md:h-[30%] w-[32%] md:w-full bg-color-second rounded p-2 md:ml-0 flex flex-col items-center justify-center text-color-primary text-2xl cursor-pointer'>
            <AiFillMessage/>
            <h3 className='mt-1 text-sm'>Comments</h3>
          </Link>
        </div>
        <div className='w-full mt-2'>
          {
            orders.map((elm,ind)=>{
              return(
                <div className='flex justify-between p-2 rounded bg-color-second my-2'>
                  <div className='flex flex-col'>
                    <span className='font-bold'>Name:<p className='font-light inline-block '>{elm.name}</p></span>
                    <span className='font-bold'>Id:<p className='font-light inline-block'>{elm._id}</p></span>
                  </div>
                  <div className='flex flex-col'>
                    <strong className='text-end'>{elm.amount}</strong>
                    <span>{elm.status}</span>
                  </div>
                </div>
              )
            })
          }
          <div className='flex w-full justify-end'>
            <Link href={'/dashboard/orders'} className='flex items-center bg-color-primary text-color-font py-1 px-3 rounded cursor-pointer'>All Orders <IoIosArrowForward/></Link>
          </div>
        </div>
    </div>
    </>
  )
}

export default index