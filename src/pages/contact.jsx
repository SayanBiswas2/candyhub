import React, { useState } from 'react'
// import {HiOutlineMail} from 'react-icons/hi'
// import {RiMessengerLine} from 'react-icons/ri'
// import {FaTelegramPlane} from 'react-icons/fa'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const postMessage = () => {
    axios.post("/api/saveFeedback",{
      "name":name,
      "email":email,
      "message":message,
    }).then(res=>{
      toast.success('Message sent succesfully!')
    }).catch(err=>{
      toast.error("Sorry some error occaerd!try again letter")
    })
  }
  return (
    <>
      {/* <h5>Get In Touch</h5> */}
      
      <div className="w-[90vw] sm:w-[60vw] m-auto flex flex-col">
        <h2 className='text-4xl text-color-primary'>Contact Me</h2>
        {/* <div className="w-full sm:w-[25%] flex-wrap">
          <article className="w-[95%] bg-color-second rounded my-2 p-4 flex flex-col items-center justify-center text-color-primary">
            <HiOutlineMail className="text-2xl sm:text-3xl"/>
            <h4 className='text-xl sm:text-2xl'>Email</h4>
            <h5 className='text-sm'>sayanbiswas6073@gmail.com</h5>
            <a href="mailto:sayanbiswas6073@gmail.com" target="_blank" rel="noreferrer">Send a message</a>
          </article>
          <article className="w-[95%] bg-color-second rounded my-2 p-4 flex flex-col items-center justify-center text-color-primary">
            <RiMessengerLine className="text-2xl sm:text-3xl"/>
            <h4 className='text-xl sm:text-2xl'>Messenger</h4>
            <h5 className='text-sm'>Sayan Biswas</h5>
            <a href="https://m.me/100056755894484/" target="_blank" rel="noreferrer">Send a message</a>
          </article>
          <article className="w-[95%] bg-color-second rounded my-2 p-4 flex flex-col items-center justify-center text-color-primary">
            <FaTelegramPlane className="text-2xl sm:text-3xl"/>
            <h4 className='text-xl sm:text-2xl'>Telegram</h4>
            <h5 className='text-sm'>Sayan Biswas</h5>
            <a href="https://t.me/sayan192000" target="_blank" rel="noreferrer">Send a message</a>
          </article>
        </div> */}
        <div className='w-full flex flex-col p-4 justify-start items-center'>
          <input type="text" name="name" placeholder="Your Full Name" required className='w-full my-2 p-2 bg-color-second text-color-font outline-none' value={name} onChange={e=>{setName(e.target.value)}}/>
          <input type="email" name="email" placeholder="Your Email" required className='w-full my-2 p-2 bg-color-second text-color-font outline-none' value={email} onChange={e=>{setEmail(e.target.value)}}/>
          <textarea name="message" rows="4" placeholder="Your Message" required className='w-full my-2 p-2 bg-color-second text-color-font resize-none outline-none' value={message} onChange={e=>{setMessage(e.target.value)}}></textarea>
          <button type="submit" className="px-3 py-1 bg-color-primary text-white rounded" onClick={postMessage}>Send Message</button>
        </div>
      <ToastContainer />
      </div>
    </>
  )
}

export default contact