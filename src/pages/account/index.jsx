import React from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import axios from 'axios'
import { useRouter } from 'next/router'
import { redirect } from 'next/navigation'
import chengeTheme from '@/app/JS/chengeTheme'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setLoginStatus } from '@/app/slice/authSlice'
import { setTheme } from '@/app/slice/themeSlice'
import { RiAccountCircleFill,RiArrowDropDownLine } from 'react-icons/ri'
import { MdModeEditOutline } from 'react-icons/md'
import { HiSave } from 'react-icons/hi'
import { useState,useEffect } from 'react'

function acount() {
  let [userName,setUserName] = useState('')
  let [userEmail,setUserEmail] = useState('')
  let [name,setName] = useState('')
  let [mobile,setMobile] = useState('')
  let [pin,setPin] = useState('')
  let [locality,setLocality] = useState('')
  let [address,setAddress] = useState('')
  let [district,setDistrict] = useState('')
  let [states,setStates] = useState('')
  let [phone,setPhone] = useState([0,false])
  let [deliveryExpand,setDeliveryExpand] = useState(false)
  const dispatch = useDispatch()
  const { push } = useRouter()
  const theme = useSelector(state=>state.theme.theme)

  useEffect(()=>{
    axios.get("/api/getAddress?acction=account").then((res)=>{
      console.log(res)
      if(res.status == 200){
        setUserName(res.data.name)
        setPhone([res.data.mobile,false])
        setUserEmail(res.data.email)
      }
    })
  },[])

  const logout = () => {
    axios.post('/api/logout', {
      action: true
    }).then(res => {
      if (res.status == 200) {
        dispatch(setEmail(''))
        dispatch(setLoginStatus(false))
        window.location.href = '/'
      }
    })
  }

  const deliverDetailSave = () => {
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
      axios.post("/api/getAddress",{
        "acction":"address",
        "address":fullAddress
      }).then(res=>{
        console.log(res);
        setDeliveryExpand(false)
      })
    }
  }

  const mobileSave = () => {
    if(phone.toString().length >= 9){
      axios.post("/api/getAddress",{
        "acction":"mobile",
        "number":phone[0]
      }).then(res=>{
        setPhone([phone[0],false])
        console.log(res);
      })
    }
  }

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

  // useEffect(()=>{
  //   chengeTheme(document,theme)
  // },[theme])
  return (
    <>
      <div className='w-[90vw] sm:w-[60vw] ml-[5vw] sm:ml-[20vw] flex flex-col justify-center text-color-font bg-color-back'>
        <h1 className='text-2xl font-bold mb-4'>My Account</h1>
        <div className='flex flex-col sm:flex-row'>
          <div className='w-[90vw] sm:w-[15vw] flex justify-center'>
            <RiAccountCircleFill className='text-[7rem] text-cyan-400 mt-4' />
          </div>
          <div className='w-[60%] pt-6'>
            <h2 className='flex justify-start sm:w-[40vw] w-[90vw] p-2 font-bold'>Name: <span className='font-light'>{userName}</span></h2>
            <h2 className='flex justify-start sm:w-[40vw] w-[90vw] p-2 font-bold'>Email: <span className='font-light'>{userEmail}</span></h2>
            <h2 className='flex justify-start items-center sm:w-[40vw] w-[90vw] p-2 font-bold'>Mobile: 
            <input type="number" name="" id="" className={`font-light outline-none appearance-none bg-color-back text-color-font`}  value={phone[0]} onChange={(e)=>{phone[1] ? setPhone([e.target.value,true]) : console.log('')}} />
            {phone[1]?<HiSave className='ml-2 cursor-pointer' onClick={mobileSave}/>:<MdModeEditOutline className='ml-2 cursor-pointer' onClick={()=>setPhone([phone[0],true])}/>}
            </h2>

            <div className={`sm:w-[40vw] w-[90vw] overflow-hidden h-12 p-2 border rounded my-2 duration-500 ${deliveryExpand? 'h-[450px]' : 'h-12'}`}>
              <div className='flex justify-between'>
                <h1 className='font-bold cursor-pointer' onClick={()=>{setDeliveryExpand(!deliveryExpand)}}>Dellevery details</h1>
                <RiArrowDropDownLine className={`text-3xl duration-500 cursor-pointer ${deliveryExpand? '' : 'rotate-[-90deg]'}`} onClick={()=>{setDeliveryExpand(!deliveryExpand)}}/>
              </div>
              <div className='h-1/5 flex '>
                <input type="text" value={name} className='outline-none border-2 border-solid border-cyan-500 bg-color-back p-3 my-4 mx-2 w-full' placeholder='Your full name' onChange={(e) => { setName(e.target.value) }} required />
                <input type="number" className='outline-none border-2 border-solid border-cyan-500 p-3 my-4 bg-color-back mx-2 w-full' placeholder='Mobile Number' onChange={(e) => { setMobile(e.target.value) }} value={mobile} required />
              </div>
              <div className='w-full h-1/5 flex'>
                <input type="number" className='outline-none border-2 border-solid bg-color-back border-cyan-500 p-3 my-4 mx-2 w-full' placeholder='Your PIN' onChange={(e) => { setPin(e.target.value) }} value={pin} required />
                <input type="text" className='outline-none border-2 border-solid border-cyan-500 bg-color-back p-3 my-4 mx-2 w-full' placeholder='Your Locality' onChange={(e) => { setLocality(e.target.value) }} value={locality} required />
              </div>
              <div className='w-full h-1/5 flex'>
                <textarea name="address" id="" cols="50" rows="3" placeholder='Your Address' className='w-full outline-none border-2 border-solid border-cyan-500 bg-color-back p-3 my-4 mx-2 resize-none' onChange={(e) => { setAddress(e.target.value) }} value={address} required></textarea>
              </div>
              <div className='w-full h-1/5 flex'>
                <input type="text" className='outline-none border-2 border-solid border-cyan-500 bg-color-back p-3 my-4 mx-2 w-full' placeholder='District' onChange={(e) => { setDistrict(e.target.value) }} value={district} required />
                <select name="state" value={states} className='outline-none border-2 border-solid border-cyan-500 bg-color-back p-3 my-4 mx-2 w-full' id="state" onChange={(e) => { setStates(e.target.value) }} required>
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
              <div className='w-full flex justify-center'>
                <input type="button" value="Save" onClick={deliverDetailSave} className='bg-cyan-500 p-1 text-white px-2 rounded' />
              </div>
            </div>
            <div className='flex justify-between rounded border sm:w-[40vw] w-[90vw] p-2 font-bold my-2 cursor-pointer' onClick={()=>{push('/account/orders')}}>
              <h1>Your Orders</h1>
              <RiArrowDropDownLine className='text-3xl rotate-[-90deg]'/>
            </div>
            <div className='flex justify-between rounded border sm:w-[40vw] w-[90vw] p-2 font-bold my-2'>
              <h1 className='cursor-default'>Theme</h1>
              <select name="Theme" id="theme" className={`bg-color-second outline-none rounded-sm p-2 duration-500`} onChange={(e)=>{dispatch(setTheme(e.target.value));localStorage.setItem('theme',e.target.value)}} value={theme}>
                <option value="dark">dark</option>
                <option value="light">light</option>
                <option value="system">System Default</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <br />
      <a className='flex text-red-500 font-bold cursor-pointer text-xl items-center justify-center' onClick={logout}>Log Out! <BiLogOutCircle /></a>
    </>
  )
}

export default acount