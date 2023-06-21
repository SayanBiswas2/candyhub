import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setDetaildAddress } from '@/app/slice/checkoutReducer'
import { add } from '@/app/slice/cartReducer'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeliveryAddres = ({setPage}) => {
  let product = useSelector((state) => state.checkout.product)
  const loggedIn = useSelector((state) => state.auth.loggedIn)

  let router = useRouter()
  let {push} = useRouter()
  
  useEffect(()=>{
    if(product.length === 0){
      push('/')
    }
  },[router])
  let [name,setName] = useState('')
  let [mobile,setMobile] = useState('')
  let [pin,setPin] = useState('')
  let [locality,setLocality] = useState('')
  let [address,setAddress] = useState('')
  let [district,setDistrict] = useState('')
  let [states,setStates] = useState('')

  
  const dispatch = useDispatch()
  // console.log(setPage)
  // console.log(setDetaildAddress)

  const submit = () => {
    if(name !== '' && mobile!== '' && pin!== '' && locality!== '' && address!== '' && district!== '' && states!== ''){
      let fullAddress ={
        'name':name,
        'mobile':mobile,
        'pin':pin,
        'locality':locality,
        'address':address,
        'district':district,
        'state':states
      }
      if(document.getElementById('remember').checked){
        axios.post("/api/getAddress",{
          "acction":"address",
          "address":fullAddress
        }).then(res=>{
          console.log(res);
        })
      }
      dispatch(setDetaildAddress(fullAddress))
      setPage('summary')
    }else{
      toast.error("Please fill all fields!")
    }
  }

  useEffect(()=>{
    if(loggedIn){
      axios.get("/api/getAddress?acction=address").then(res=>{
        console.log(res)
        if(res.status == 200){
          setName(res.data.name)
          setMobile(res.data.mobile)
          setPin(parseInt(res.data.pin))
          setLocality(res.data.locality)
          setAddress(res.data.address)
          setDistrict(res.data.district)
          setStates(res.data.state)
          setTimeout(()=>{submit()},500)
        }
      })
    }
  },[loggedIn])

  useEffect(()=>{
    if(pin.toString().length == 6){
      let func = async() => {
        console.log(pin)
        axios.get(`https://api.postalpincode.in/pincode/${pin}`).then(res=>{
          console.log(res)
        if(res.data[0].Status == "Success"){
          setDistrict(res.data[0].PostOffice[0].District)
          setStates(res.data[0].PostOffice[0].State)
        }
      })
    }
      try{
        func()
      }catch{
        console.error("error")
      }
    }
  },[pin])
  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='font-bold text-3xl'>Dellivery Details</h2>
      <div className='sm:w-[40vw] w-[80vw]'>
        <div className='h-1/5 flex '>
          <input type="text" value={name} className='outline-none border-2 border-solid border-cyan-500 p-3 my-4 mx-2 w-full bg-color-second text-color-font' placeholder='Your full name' onChange={(e)=>{setName(e.target.value)}} required/>
          <input type="number" className='outline-none border-2 border-solid border-cyan-500 p-3 my-4 mx-2 w-full bg-color-second text-color-font' placeholder='Mobile Number' onChange={(e)=>{setMobile(e.target.value)}} value={mobile} required/>
        </div>
        <div className='w-full h-1/5 flex'>
          <input type="number" className='outline-none border-2 border-solid border-cyan-500 p-3 my-4 mx-2 w-full bg-color-second text-color-font' placeholder='Your PIN' onChange={(e)=>{setPin(e.target.value)}} value={pin}required/>
          <input type="text" className='outline-none border-2 border-solid border-cyan-500 p-3 my-4 mx-2 w-full bg-color-second text-color-font' placeholder='Your Locality' onChange={(e)=>{setLocality(e.target.value)}} value={locality} required/>
        </div>
        <div className='w-full h-1/5 flex'>
          <textarea name="address" id="" cols="50" rows="3" placeholder='Your Address' className='w-full outline-none border-2 border-solid border-cyan-500 p-3 my-4 mx-2 resize-none bg-color-second text-color-font' onChange={(e)=>{setAddress(e.target.value)}} value={address} required></textarea>
        </div>
        <div className='w-full h-1/5 flex'>
          <input type="text" className='outline-none border-2 border-solid border-cyan-500 p-3 my-4 mx-2 w-full bg-color-second text-color-font' placeholder='District' onChange={(e)=>{setDistrict(e.target.value)}} value={district} required/>
          <select name="state" value={states} className='outline-none border-2 border-solid border-cyan-500 p-3 my-4 mx-2 w-full bg-color-second text-color-font' id="state" onChange={(e)=>{setStates(e.target.value)}} required>
            <option value="setDetaildAddress">State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Delhi">Delhi</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>
      </div>
      <div className='flex items-center justify-between sm:w-[40vw] w-[80vw] px-6'>
        <div className='flex'>
          <input type="checkbox" name="remember" id="remember" />
          <p>Save as default</p>
        </div>
      <button type='submit' className="flex text-white bg-cyan-500 border-0 py-1 px-4 focus:outline-none hover:bg-cyan-600 rounded text-sm justify-center items-center" onClick={submit}>Continue</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default DeliveryAddres