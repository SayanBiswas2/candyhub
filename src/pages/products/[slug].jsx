import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'


function slug() {
    const router = useRouter()
    const {slug} = router.query
    let [product,setProduct]= useState([])
    const [hasMore, setHasMore] = useState(true)

    const fetchProducts = async() => {
      axios.post(`/api/getproducts`,{
        from:product.length,
        slug:slug
      }).then(res=>{
        setProduct([...product,...res.data])
        console.log(res.data)
      }).catch(err=>{
        if(err.response.status == 500){
          setHasMore(false)
          setProduct([...product,...err.response.data])
        }
      })
    }
    useEffect(()=>{fetchProducts()},[])
  return (
    <section className="text-color-primary body-font">
  <div className="container px-4 pb-12 mx-auto">
    {/* <div className="flex flex-wrap m-4 justify-center items-center"> */}
    <InfiniteScroll
        dataLength={product.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        // endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>
        // }
        className='flex flex-wrap m-4 justify-center items-center'
      >
      {
        product.length !== 0 && product.map((val)=>{
          return (
            <Link href={`/product/${val.id}`} className="lg:w-1/5 md:w-1/2 p-4 w-full hover:shadow-xl bg-color-second transition-all rounded m-4 min-h-[320px]">
                <div className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-cover object-center w-full m-auto block" src={val.img}/>
                </div>
                <div className="mt-4">
                  <h3 className="text-color-primary text-lg tracking-widest title-font mb-1">{(val.name).slice(0,20)}</h3>
                  <p className="mt-1">₨{val.price}</p>
                </div>
            </Link>
          )
        })
      }
      </InfiniteScroll>
    {/* </div> */}
  </div>
</section>
  )
}

export default slug