import { useEffect, useRef, useState } from "react";
import {IoIosArrowDropleft} from 'react-icons/io'
import Link from "next/link";

export default function CarouselComponent() {
  const image = [
    "/poster1.png",
    "/poster2.jpg",
    "/poster3.png"
  ]
  const [current, setCurrent] = useState(0)
  let current2 = useRef(-1)
  let imageConOne = useRef(-1)
  let imageConTwo = useRef(0)
  let imageConThree = useRef(1)

  useEffect(()=>{
    let imageInterval = setInterval(()=>{
      setCurrent(prev=>prev+1)
      imageConOne.current = --imageConOne.current == -2 ? 1 : imageConOne.current--
      imageConTwo.current = --imageConTwo.current == -2 ? 1 : imageConTwo.current--
      imageConThree.current = --imageConThree.current == -2 ? 1 : imageConThree.current--
      // console.log(imageConOne,imageConTwo,imageConThree)
    },3500)
    return ()=> window.clearInterval(imageInterval)
  },[])

  // console.log(current2.current *100)

  // const next = () => {
  //   console.log("next")
    
  //   imageConOne.current = ++imageConOne.current == 2 ? -1 : imageConOne.current++
  //   imageConTwo.current = ++imageConTwo.current == 2 ? -1 : imageConTwo.current++
  //   imageConThree.current = ++imageConThree.current == 2 ? -1 : imageConThree.current++
  //   console.log(imageConOne,imageConTwo,imageConThree)
  // }

  // const prev = () => {
  //   console.log("prev")
  //   setTimeout(()=>{
  //     imageConOne.current = --imageConOne.current == -2 ? 1 : imageConOne.current--
  //     imageConTwo.current = --imageConTwo.current == -2 ? 1 : imageConTwo.current--
  //     imageConThree.current = --imageConThree.current == -2 ? 1 : imageConThree.current--
  //     console.log(imageConOne,imageConTwo,imageConThree)

  //   },10)
  // }
  return (
    <div className="w-full absolute items-center overflow-hidden">
      {/* <div className="m-auto text-xl text-color-primary absolute z-50 left-3 top-[100px]"><IoIosArrowDropleft className="text-xl text-color-promary " onClick={prev}/></div> */}
      <div className="flex w-full h-[220px] overflow-hidden">
        {/* <img src={image[2]} alt="" className={`w-full h-[220px] object-cover absolute duration-500 ${imageConOne.current == 1 ? 'z-0' : 'z-40'}` } style={{transform:`translateX(${imageConOne.current * 100}vw)`}} data-current={imageConOne.current}/> */}
        <Link href={'/products/chupachups'} className={`w-[100vw] h-[220px] bg-color-[#d01037] absolute durtion-500 ${imageConOne.current == 1 ? 'z-0 duration-0' : 'z-40 duration-500'}`} style={{transform:`translateX(${imageConOne.current * 100}vw)`,backgroundColor:'#d01037'}}>
          <img src={image[2]} alt="" className={`h-full sm:w-[80%] md:w-[60%] m-auto object-cover durtion-500`} data-current={imageConOne.current}/>
        </Link>

        <Link href={'/products/candy'} className={`w-[100vw] h-[220px] bg-color-[#81d1d2] absolute duraion-500 ${imageConTwo.current == 1 ? 'z-0 duration-0' : 'z-40 duration-500'}`} style={{transform:`translateX(${imageConTwo.current * 100}vw)`,backgroundColor:'#81d1d2'}}>
          <img src={image[0]} alt="" className={`w-full sm:w-[70%] md:w-[40%] m-auto object-cover duration-500`} data-current={imageConTwo.current}/>
        </Link>

        <Link href={'/products/choklet'} className={`w-[100vw] h-[220px] bg-color-[#81d1d2] absolute duration-500 ${imageConThree.current == 1 ? 'z-0' : 'z-40'}`} style={{transform:`translateX(${imageConThree.current * 100}vw)`,backgroundColor:'#cdac82'}}>
          <img src={image[1]} alt="" className={`w-full sm:w-[60%] md:w-[30%] m-auto object-cover duration-500`} data-current={imageConThree.current}/>
        </Link>
      </div>
      {/* <div className="m-auto text-xl text-color-primary z-50 absolute right-3 top-[100px]" onClick={next}><IoIosArrowDropleft className="rotate-180 text-xl  "/></div> */}
    </div>
  );
}