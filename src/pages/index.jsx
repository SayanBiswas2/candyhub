import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import { useSelector , useDispatch } from 'react-redux'
import CarouselComponent from '@/components/Carousel'

export default function Home() {
  const count = useSelector((state) => state.cart.value)
  const dispatch = useDispatch()
  return (
    <>
      <Head>
        <title>Candyhub</title>
        <meta name="description" content="candyhub.com eat the candy" />
        <link rel="icon" href="/candyhub.png" />
      </Head>
      <CarouselComponent/>
      <h1 className='h-[220px] text-black'></h1>
      <div className='w-full flex justify-evenly items-center px-12 py-2 flex-wrap'>
        <Link href={'/product/6492d29fcc111beca8ab9813'} className='bg-color-second p-2 rounded w-[150px] m-2'>
          <img src="https://m.media-amazon.com/images/I/51WW7nIuMGL._SX300_SY300_QL70_FMwebp_.jpg" width={140} alt="" />
          <h2>Alpenliebe Juzt Jelly</h2>
          <span>Rs42</span>
        </Link>

        <Link href={'/product/6492d01dcc111beca8ab973e'} className='bg-color-second p-2 rounded w-[150px] m-2'>
          <img src="https://m.media-amazon.com/images/I/61wI8eWNGWL._SX679_.jpg" width={140} alt="" />
          <h2>Pulse Kachcha Aam Candy</h2>
          <span>Rs54</span>
        </Link>

        <Link href={'/product/6492d408cc111beca8ab9871'} className='bg-color-second p-2 rounded w-[150px] m-2'>
          <img src="https://m.media-amazon.com/images/I/61jUpL6fm4L._SX679_.jpg" width={140} alt="" />
          <h2>Cadbury Choclairs Gold Candy</h2>
          <span>Rs100</span>
        </Link>

        <Link href={'/product/6492d463cc111beca8ab987c'} className='bg-color-second p-2 rounded w-[150px] m-2'>
          <img src="https://m.media-amazon.com/images/I/61+fuTe0eWL._SX679_.jpg" width={140} alt="" />
          <h2>Mentos, Rainbow Assorted</h2>
          <span>Rs40</span>
        </Link>

        <Link href={'/product/6492d539cc111beca8ab98c6'} className='bg-color-second p-2 rounded w-[150px] m-2'>
          <img src="https://m.media-amazon.com/images/I/51wQg3GGwwL._SX679_.jpg" width={140} alt="" />
          <h2>Cadbury Dairy Milk Silk Chocolate</h2>
          <span>Rs70</span>
        </Link>

        <Link href={'/product/6492d5c6cc111beca8ab98d5'} className='bg-color-second p-2 rounded w-[150px] m-2'>
          <img src="https://m.media-amazon.com/images/I/61IW8cv1ZPS._SX679_PIbundle-48,TopRight,0,0_AA679SH20_.jpg" width={140} alt="" />
          <h2>Chupa Chups, Sour Belt</h2>
          <span>Rs215</span>
        </Link>
      </div>
    </>
  )
}