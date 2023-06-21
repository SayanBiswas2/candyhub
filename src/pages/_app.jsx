import '@/styles/globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DashNav from '../dashboardComponents/Nav'
import Sidebar from '../dashboardComponents/sideBar'
import { store } from '@/app/store'
import { Provider } from 'react-redux'
import { useEffect,useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  let [sideBarOppend,setSideBarOppend] = useState(false)
  let [dash, setDash] = useState(true)
  
  let router = useRouter()

  useEffect(()=>{
    router.pathname.indexOf("/dashboard") !== -1 ? setDash(true) : setDash(false)
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    })
    router.events.on('routeChangeStart',()=>{
      setProgress(40)
    })
    console.log(router)
  },[router])
  return (
    <>
      <LoadingBar
        color='cyan'
        progress={progress}
        height={3}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
      <Provider store={store}>
      {dash ? <DashNav/> : <Nav/>}
      {/* <Sidebar sideBarOppend={sideBarOppend} setSideBarOppend={setSideBarOppend}/> */}
      {router.pathname.indexOf("/dashboard") !== -1 ? <Sidebar sideBarOppend={sideBarOppend} setSideBarOppend={setSideBarOppend} /> : <div className='w-full h-[110px] md:h-[70px]'></div>}
      {
        dash ? 
          <div className={`${sideBarOppend?'ml-[50px] md:ml-[250px]':'ml-[50px] md:ml-[60px]'} bg-color-back duration-500 md:p-2 md:pt-0 pt-0 min-h-[90vh] rounded-tl-lg z-40`}><Component {...pageProps} /></div> : <Component {...pageProps} />
      }
      {dash ? '' : <Footer/>}
      
      </Provider>
    </>
  )
}
