
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import {FaCartArrowDown} from 'react-icons/fa'
import { useSelector , useDispatch } from 'react-redux'
import { add } from '@/app/slice/cartReducer'
import { setProduct } from '@/app/slice/checkoutReducer'
import axios from 'axios';

function candys() {
  let router = useRouter()
  let {push} = useRouter()
  let [pageproduct,setPageProduct] = useState([])
  let [slug,setSlug] = useState('')
  let [pin, setPin] = useState(0)
  let [service, setService] = useState(0)
  let loggdin =useSelector((state) => state.auth.loggedIn)


  const dispatch = useDispatch()
  useEffect(()=>{
    const func = async() =>{
      let slug = router.query.slug
      setSlug(slug)
      let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getProduct?slug=${slug}`)
      let res = await data.json()
      if(data.status == 200){
        setPageProduct(res)
        console.log(res)
      }
    }
    if(pageproduct.length == 0){
      func()
    }
  },[router,pageproduct])
  
  useEffect(()=>{
    console.log('page',pageproduct)
  },[pageproduct])

  const checkPin = async() => {
    let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pincode`)
    let pins = await data.json()
    pins.includes(parseInt(pin)) ? setService(true) : setService(false);
    pins.includes(parseInt(pin)) ? toast.success("Your PIN code is serviceable") : toast.error("Sorry!Your PIN code is not serviceable");
  }

  const onChenge = (e) => {
    setPin(e.target.value)
  }

  const addAction = async (data) => {
    if(loggdin){
      axios.post("/api/getcart",{
        "action":"add",
        "name":data[0],
        "detail":[data[1],data[2],1]
      }).then(res=>{
        if(res.status == 200){
          dispatch(add(data))
        }
      })
    }else{
      dispatch(add(data))
    }
  }

  const buyNow = (data) => {
    switch(loggdin){
      case true:
        console.log(data)
        dispatch(setProduct(data))
        push('/checkout')
        break;
      case false:
        push('/auth/login')
        break;
    }
  }
  return (
    <section className="text-color-primary body-font overflow-hidden">
  <div className="container px-5 mt-12 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:hauto h64 items-center object-center rounded" src={pageproduct.img}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-2 lg:mt-0">
        {/* <h2 className="text-sm title-font text-color-primary tracking-widest">BRAND NAME</h2> */}
            <h1 className="text-color-font text-3xl title-font font-medium mb-1">{pageproduct.name}</h1> 
        {/* */}
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-color-primary ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a className="text-color-primary">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="text-color-primary">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="text-color-primary">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
            <p className="leading-relaxed text-sm">{pageproduct.desc}</p>
        {/*  */}
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="pin flex ">
            <div className='block transition-all'>
              <input type="text" placeholder='Enter your PIN code' onChange={onChenge} className="text border-0 outline-none border-b-2 border-solid border-black bg-color-second text-color-font" />
              <p className={`text-sm ${service!==0 ? '' : "hidden"} ${service== true ? 'text-green-600' : "text-red-600"} transition-all`}>{service==true ? 'avalable' : "sorry not avalable"}</p>
            </div>
            <button className='mx-2 transition-all text-cyan-600' onClick={checkPin}>Check</button>
          </div>
          {/* <div className="flex">
            <span className="mr-3">Color</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-cyan-500 rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 text-base pl-3 pr-10">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-color-primary pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div> */}
        </div>
        <div className="flex">
            <span className="title-font font-medium text-2xl text-color-font">₨{pageproduct.price}</span>
            <div className="flex ml-auto text-white bg-cyan-500 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-600 rounded" onClick={()=>buyNow({[pageproduct.name]:[pageproduct.price,pageproduct.img,1]})}>Buy Now</div>
            <button className="rounded-full w-10 h-10 hover:text-color-primary p-0 border-0 bg-color-second inline-flex items-center justify-center text-color-primary ml-4" onClick={()=>{addAction([pageproduct.name,pageproduct.price,pageproduct.img]),toast.success("Product added to your cart")}}>
            <FaCartArrowDown/>
            </button>
          {/*  */}
          
        </div>
      </div>
    </div>
  </div>
  <ToastContainer />
</section>
  )
}

export default candys